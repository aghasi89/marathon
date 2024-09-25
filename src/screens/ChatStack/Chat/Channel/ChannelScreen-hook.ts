import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {MessageResponse} from 'stream-chat';
import {useChatContext} from 'stream-chat-react-native';
import {SheetManager} from 'react-native-actions-sheet';
import {ChannelMemberResponse} from 'stream-chat';
import {IError, IFeedItem} from '../../../../types/types';
import {
  setActiveChannel,
  setError,
} from '../../../../store/actions/administrative-action';
import {NavigationParamList} from '../../../../navigation/ChatNavigation';
import {profileSelector} from '../../../../store/selectors/profile-selector';
import {
  getGeneratedMessage,
  getPersonInfoByUsername,
  getUserWithStream,
  setGeneratedMessage,
} from '../../../../store/actions/profile-action';
import {
  checkIsQuetstinsExistAction,
  getCoachFeedsByTypeAction,
  getFeedByIdAction,
  setSelectedFeedAction,
} from '../../../../store/actions/feed-action';
import {selectedFeedSelector} from '../../../../store/selectors/feed-selector';
import {setChatMessages} from '../../../../store/actions/chat-actions';
import {chatClient} from '../../../../services/chatConfig';
import {setupClient} from '../../../../utils/connectUser';
import {StreamChatGenerics, useAppContext} from '../../AppContext';
import {DefaultTFuncReturn} from 'i18next';
import moment from 'moment';
import {Keyboard} from 'react-native';

type Props = NativeStackScreenProps<NavigationParamList, 'CHANNELLIST'>;
export default () => {
  const {t} = useTranslation();
  const {params} = useRoute();
  const {channel, setThread, messageId, setChannel} = useAppContext();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const user = useSelector(profileSelector);
  const selectedFeed = useSelector(selectedFeedSelector);
  const {client} = useChatContext();
  const attemptCount = useRef(1);
  const [visible, setIsVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isCreator, setIsCreator] = useState<boolean>(false);
  const [isLeaving, setIsLeaving] = useState<boolean>(false);
  const [isStreamActive, setIsStreamActive] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [liveModalVisible, setLiveModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [questionsModalVisible, setQuestionsModalVisible] =
    useState<boolean>(false);
  const [isQusetionsCheckedOnce, setIsQusetionsCheckedOnce] =
    useState<boolean>(false);
  const [openLiveStream, setOpenLiveStrem] = useState<boolean>(false);
  const [lastVisit, setLastVisit] = useState<string | DefaultTFuncReturn>('');
  const [members, setMembers] = useState<
    ChannelMemberResponse<StreamChatGenerics>[]
  >([]);
  const {otherUser, mutedStatus, isDirectChat} = useMemo(() => {
    if (!channel?.disconnected) {
      return {
        otherUser: Object.values(channel?.state?.members || {}).find(
          member => member?.user?.id !== user?.get_stream_id,
        ),
        mutedStatus: channel?.muteStatus().muted,
        isDirectChat:
          channel?.type === 'messaging' && channel?.data?.member_count === 2,
      };
    } else {
      return {
        otherUser: {},
        mutedStatus: false,
        isDirectChat: true,
      };
    }
  }, [channel, visible]);

  useEffect(() => {
    if (channel) {
      channel.queryMembers({}).then(response => {
        setMembers(response?.members);
      });
    }
  }, [channel]);

  useEffect(() => {
    if (otherUser?.user?.last_active) {
      const timeAgo = moment(otherUser?.user?.last_active).fromNow();
      setLastVisit(timeAgo);
    }
  }, [otherUser, moment]);

  const getMessages = async () => {
    const messageList = await channel?.query({
      messages: {
        limit: 40,
        offset: 0,
      },
    });
    //@ts-ignore
    setMessages(messageList?.messages);
    dispatch(setChatMessages(messageList?.messages));
  };
  useEffect(() => {
    if (channel?.data?.isFeed && channel?.data?.feedid) {
      dispatch(getFeedByIdAction({id: channel?.data?.feedid, type: 'feed'}));
    }
    getMessages();
    const handleNewMessage = (event: any) => {
      const newMessage = event?.message;
      setMessages(prevMessages => [...prevMessages, newMessage]);
      dispatch(setChatMessages([newMessage]));
    };
    channel?.on('message.new', handleNewMessage);
    return () => {
      channel?.off('message.new', handleNewMessage);
    };
  }, [channel]);
  useEffect(() => {
    setLoading(true);
    setIsStreamActive(!!channel?.data?.isLive);
  }, []);
  const initializeAndNavigate = async () => {
    try {
      user && (await setupClient(user));
      if (params && params?.channelId && params.type) {
        const channel = chatClient.channel(params.type, params.channelId);
        channel.watch().then(() => {
          setChannel(channel);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        });
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error initializing and navigating:', error);
    }
  };
  useEffect(() => {
    initializeAndNavigate();
  }, [user, params]);
  useEffect(() => {
    navigation.addListener('focus', () => {
      if (user) {
        dispatch(getCoachFeedsByTypeAction(user?.id ?? 0, 'workout'));
        dispatch(getCoachFeedsByTypeAction(user?.id ?? 0, 'recipe'));
      }
    });
  }, [user]);

  useEffect(() => {
    const handleStreamEvent = (event: any) => {
      if (event.type === 'channel.updated') {
        setIsStreamActive(!!channel?.data?.isLive);
      }
    };
    channel && channel?.on(handleStreamEvent);
    return () => {
      channel && channel?.off(handleStreamEvent);
    };
  }, [channel, isStreamActive]);
  useEffect(() => {
    if (selectedFeed && user && !isQusetionsCheckedOnce) {
      checkQuestions(user?.id, selectedFeed);
    }
  }, [selectedFeed, isQusetionsCheckedOnce]);
  const handlerOpenEditChat = useCallback(() => {
    if (isCreator) {
      navigation.navigate('EDITGROUPCHAT');
      setIsVisible(false);
    } else {
      const data: IError = {
        title: 'Something went wrong ...',
        text: 'You are not the owner of this channel\n to update the chat settings',
        buttonTitle: 'OK',
      };
      dispatch(setError(data));
      return;
    }
  }, [channel, isCreator]);

  const onPressToDismiss = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const showMembersList = () => {
    setIsVisible(false);
    setTimeout(() => {
      SheetManager.show('showGroupMembers');
    }, 1000);
  };

  const handlerOpenChatMenu = useCallback(() => {
    setIsVisible(true);
  }, [navigation, visible]);

  const handlerMuteChannel = useCallback(async () => {
    if (mutedStatus === false) {
      await channel?.mute();
    } else {
      await channel?.unmute();
    }
    setIsVisible(false);
  }, [channel, mutedStatus]);

  const handlerNavigateToLiveStream = useCallback(
    async (isVideoCall: boolean) => {
      setLiveModalVisible(false);
      channel?.updatePartial({
        set: {
          isVideoCall: isVideoCall ? true : false,
        },
      });
      setOpenLiveStrem(true);
      //@ts-ignore
      // navigation.navigate('LIVESTREAM');
    },
    [navigation],
  );
  const hanlderLeaveChannel = useCallback(async () => {
    if (isCreator) {
      const data: IError = {
        title: 'Something went wrong ...',
        text: 'You are the owner of this\nchat and you  cannot leave it.',
        buttonTitle: 'OK',
      };
      dispatch(setError(data));
      return;
    } else {
      if (channel?._client.userID) {
        await channel?.removeMembers([channel?._client.userID]);
      }
    }
    navigation.navigate('CHANNELLIST');
  }, [channel, navigation, isCreator]);

  const handlerGoBack = useCallback(() => {
    // if (navigation.canGoBack()) {
    //   navigation.goBack()
    // } else {
    //@ts-ignore
    navigation.navigate('CHAT_NAVIGATION_STACK');
    // navigation.navigate('CHANNELLIST');
    // }
  }, [navigation]);

  const handlerOnClose = useCallback(() => {
    setIsVisible(false);
  }, [visible]);

  const handlerDeleteChannel = useCallback(async () => {
    try {
      if (isCreator) {
        await channel?.delete();
        navigation.navigate('CHANNELLIST');
      } else {
        const data: IError = {
          title: 'Something went wrong ...',
          text: 'You are not the owner of\n this channel to delete it.',
          buttonTitle: 'OK',
        };
        dispatch(setError(data));
      }
    } catch (error) {
      console.log(error);
    }
  }, [channel, navigation, isCreator]);

  const handlerOnThreadSelect = useCallback(
    (message: any) => {
      if (channel?.id) {
        setThread(message);
        //@ts-ignore
        navigation.navigate('THREADSCREEN');
      }
    },
    [navigation],
  );

  const handlerOnPressModal = useCallback(
    (isLeaving: boolean) => {
      setIsVisible(false);
      setTimeout(() => {
        setIsModalVisible(true);
      }, 500);
      //
      setIsLeaving(isLeaving);
    },
    [isLeaving],
  );

  const handlerOnPressYes = useCallback(() => {
    if (isLeaving) {
      hanlderLeaveChannel();
    } else {
      handlerDeleteChannel();
    }
    //@ts-ignore
    navigation.navigate('CHAT_NAVIGATION_STACK');
  }, [isLeaving, isCreator]);

  const handlerOnPressNo = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handlerOpenLiveStream = useCallback(
    (isCreated: boolean) => {
      //@ts-ignore
      // isCreator ? setLiveModalVisible(true) : navigation.navigate("LIVESTREAM")
      // setLiveModalVisible(true)
      if (isCreated) {
        setLiveModalVisible(true);
      } else {
        setOpenLiveStrem(true);
      }
    },
    [isCreator],
  );

  const handlerCloseLiveModal = useCallback(() => {
    setLiveModalVisible(false);
  }, []);

  const handlerOpenAiModal = useCallback(() => {
    dispatch(setGeneratedMessage(undefined));
    attemptCount.current = 1;
    SheetManager.show('chatGptSheet');
    dispatch(getGeneratedMessage(attemptCount.current));
  }, [messages, attemptCount]);

  useEffect(() => {
    //@ts-ignore
    if (channel?.data?.created_by?.id === user?.get_stream_id?.toString()) {
      setIsCreator(true);
    }
  }, [isCreator, channel?.data, user]);

  const handlerGoToProfile = useCallback(() => {
    if (channel?.data?.type === 'messaging') {
      otherUser &&
        dispatch(
          getPersonInfoByUsername(otherUser?.user?.userName, () => {
            navigation.navigate('USER_PROFILE');
          }),
        );
      dispatch(setActiveChannel(channel?.id ?? ''));
    } else if (channel?.data?.isFeed) {
      navigation.navigate('ABOUT_FEED', {
        id: channel?.data?.feedid as number,
        type: 'feed',
      });
    } else {
      return null;
    }
  }, [channel?.data]);
  const onPressToOpenWorkouts = useCallback(() => {
    SheetManager.show('sendWorkoutSheet', {
      payload: {
        channel,
        client,
      },
    });
  }, [channel, client]);

  const handlerOpenRecipeModal = useCallback(() => {
    SheetManager.show('sendRecipeSheet', {
      payload: {
        channel,
        client,
      },
    });
  }, [channel, client]);
  const checkQuestions = useCallback((user?: number, selected?: IFeedItem) => {
    if (user && selected) {
      if (!!selected.coach_question?.length) {
        const amIExistsInMembers = selected?.members?.find(
          el => el.user.id === user,
        );
        if (amIExistsInMembers)
          dispatch(
            checkIsQuetstinsExistAction(
              {user, feed: selected?.feed?.id ?? 0},
              status => {
                if (status === 'questions exist') {
                  setQuestionsModalVisible(true);
                }
              },
            ),
          );
      }
    }
    setIsQusetionsCheckedOnce(true);
  }, []);
  const questionsModalCloseHandle = useCallback(() => {
    setQuestionsModalVisible(false);
  }, []);
  const askQuestionsHandle = useCallback(() => {
    //@ts-ignore
    navigation.navigate('ANSWER_COACH_QUESTIONS', {id: selectedFeed?.feed?.id});
    questionsModalCloseHandle();
  }, [selectedFeed]);

  return {
    t,
    dispatch,
    openLiveStream,
    onPressToDismiss,
    setOpenLiveStrem,
    members,
    navigation,
    isDirectChat,
    visible,
    mutedStatus,
    channel,
    messageId,
    isCreator,
    isModalVisible,
    isLeaving,
    isStreamActive,
    user,
    otherUser,
    lastVisit,
    handlerOpenEditChat,
    hanlderLeaveChannel,
    handlerGoBack,
    handlerOpenChatMenu,
    handlerOnClose,
    handlerDeleteChannel,
    handlerMuteChannel,
    handlerOnThreadSelect,
    handlerOnPressNo,
    handlerOnPressYes,
    handlerOnPressModal,
    handlerOpenLiveStream,
    handlerOpenAiModal,
    handlerGoToProfile,
    messages,
    onPressToOpenWorkouts,
    handlerOpenRecipeModal,
    liveModalVisible,
    handlerCloseLiveModal,
    handlerNavigateToLiveStream,
    loading,
    questionsModalVisible,
    askQuestionsHandle,
    questionsModalCloseHandle,
    showMembersList,
  };
};
