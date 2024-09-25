import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {MainNavigationParamList} from '../../../../navigation/MainNavigation';
import {profileSelector} from '../../../../store/selectors/profile-selector';
import {Keyboard} from 'react-native';
import {
  createAssistantChannel,
  deleteAssistantById,
  deleteAssistantChannelItem,
  deleteAssistantMessage,
  getAssistantById,
  getAssistantChannels,
  postAssistantImageMessage,
  postAssistantMessage,
  setAssistantActive,
  setAssistantByIdCount,
  setAssistantChatId,
} from '../../../../store/actions/assistant-actions';
import {
  assistantIdSelector,
  assistantMessageCountSelector,
  assistantMessageListSelector,
  assistantTitleSelector,
} from '../../../../store/selectors/assistant-selector';
import moment from 'moment';
import {
  IAssistantChannelMessagesResultItem,
  IUploadImage,
} from '../../../../types/types';
import Clipboard from '@react-native-clipboard/clipboard';
import {uploadImageToBunnyAction} from '../../../../store/actions/administrative-action';
import {downloadMediaFromBunny} from '../../../../utils/bunny.net';

type Props = NativeStackScreenProps<MainNavigationParamList, 'ASSISTANT'>;
export default () => {
  const {t} = useTranslation();
  const route = useRoute<Props['route']>();
  const {assistantId} = route?.params!;
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const createdAssistantId = useSelector(assistantIdSelector);
  const getMe = useSelector(profileSelector);
  const [newMessage, setNewMessage] = useState<string>('');
  const [selectedMessage, setSelectedMessage] = useState<string>('');
  const [selectedMessageId, setSelectedMessageId] = useState<
    number | undefined
  >(undefined);
  const [selectedMessageIsMe, setSelectedMessageIsMe] = useState<
    boolean | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false);
  const [assistantLoading, setAssistantLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [newMessageList, setNewMessageList] = useState<
    IAssistantChannelMessagesResultItem[]
  >([]);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false);
  const [messageSettingsVisible, setmessageSettingsVisible] =
    useState<boolean>(false);
  const [bunnyImage, setBunnyImage] = useState<string>('');
  const messageList = useSelector(assistantMessageListSelector);
  const messageCount = useSelector(assistantMessageCountSelector);
  const assistantTitle = useSelector(assistantTitleSelector);

  useEffect(() => {
    if (assistantId) {
      if (page === 1) {
        setLoading(true);
        dispatch(deleteAssistantById());
        dispatch(
          getAssistantById(assistantId, page, () => {
            setLoading(false);
          }),
        );
      } else {
        setPaginationLoading(true);
        dispatch(
          getAssistantById(assistantId, page, () => {
            setPaginationLoading(false);
          }),
        );
      }
    }
  }, [assistantId, page]);

  const handleOnHandReach = useCallback(() => {
    if (page * 10 < messageCount) {
      setPage(page + 1);
    }
  }, [messageCount, page]);

  const onPressToDismiss = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const handlerGoBack = useCallback(() => {
    dispatch(setAssistantActive(false));
    dispatch(deleteAssistantById());
    dispatch(setAssistantByIdCount(0, ''));
    dispatch(setAssistantChatId(undefined));
    //@ts-ignore
    navigation.navigate('CHANNELLIST');
  }, [navigation]);

  const handleChangeInputValue = useCallback((text: string) => {
    setNewMessage(text);
  }, []);

  const handlerOpenChatMenu = useCallback(() => {
    setMenuVisible(true);
  }, [navigation, menuVisible]);

  const handlerCloseChatMenu = useCallback(() => {
    setMenuVisible(false);
  }, [navigation, menuVisible]);

  const handlerOpenDeleteModal = useCallback(() => {
    setMenuVisible(false);
    setTimeout(() => {
      setDeleteVisible(true);
    }, 500);
  }, [deleteVisible, menuVisible]);

  const handlerCloseDeleteModal = useCallback(() => {
    setDeleteVisible(false);
  }, [deleteVisible]);

  const handleOpenMessageSettings = useCallback(
    (message: string, messageId: number, isMyMessage: boolean) => {
      setmessageSettingsVisible(true);
      setSelectedMessage(message);
      setSelectedMessageId(messageId);
      setSelectedMessageIsMe(isMyMessage);
    },
    [setSelectedMessage],
  );

  const handleCloseMessageSettings = useCallback(() => {
    setmessageSettingsVisible(false);
  }, []);

  const handleToCopyText = useCallback(() => {
    if(selectedMessage.startsWith('https://marathon.b-cdn.net')) {
      Clipboard.setString(selectedMessage.split('zhenyaartyom')[1]);
    } else {
      Clipboard.setString(selectedMessage);
    }
    setmessageSettingsVisible(false);
  }, [Clipboard, selectedMessage]);

  const handleToDeleteMessage = useCallback(
    (cb?: () => void, isMe?: boolean) => {
      if (
        selectedMessageId &&
        (selectedMessageIsMe !== undefined || isMe !== undefined)
      ) {
        setmessageSettingsVisible(false);
        if (selectedMessageIsMe || isMe) {
          dispatch(
            deleteAssistantMessage([selectedMessageId, selectedMessageId + 1]),
          );
        } else {
          dispatch(
            deleteAssistantMessage(
              [selectedMessageId, selectedMessageId - 1],
              cb,
            ),
          );
        }
      }
    },
    [selectedMessageId, selectedMessageIsMe],
  );

  const handleToRegenerateMessage = useCallback(() => {
    if (selectedMessageId) {
      setmessageSettingsVisible(false);
      const regeneratedQuestion = messageList.find(
        el => el.id === selectedMessageId - 1,
      )?.message;
      {
        regeneratedQuestion &&
          handleToDeleteMessage(() => {
            handlePressSendMessage(regeneratedQuestion);
          }, false);
      }
    }
  }, [messageList, selectedMessageId]);

  const handleDeleteAssistant = useCallback(() => {
    if (assistantId || createdAssistantId) {
      handlerCloseChatMenu();
      setLoading(true);
      const deletedId = assistantId ? assistantId : createdAssistantId;
      deletedId &&
        dispatch(
          deleteAssistantChannelItem(deletedId, () => {
            handlerGoBack();
          }),
        );
    }
  }, [dispatch, assistantId, createdAssistantId]);

  const handlerOpenEditChat = useCallback(() => {
    if (assistantTitle && (assistantId || createdAssistantId)) {
      const id = assistantId ? assistantId : createdAssistantId;
      id &&
        navigation.navigate('EDIT_ASSISTANT', {
          assistantId: id,
          assistantTitle,
        });
      setMenuVisible(false);
    }
  }, [navigation, assistantId, createdAssistantId, assistantTitle]);

  const handlePressSendMessage = useCallback(
    (
      regeneratedQuestion?: string,
      setMessageImage?: Dispatch<SetStateAction<string>>,
    ) => {
      if (messageList.length || assistantId || createdAssistantId) {
        setAssistantLoading(true);
        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        // const regenerate = regeneratedQuestion &&  regeneratedQuestion.startsWith('https://marathon.b-cdn.net') && regeneratedQuestion.includes('zhenyaartyom')
        setNewMessageList([
          {
            created_at: now,
            id: 0,
            me: true,
            message: regeneratedQuestion
              ? regeneratedQuestion
              : bunnyImage && newMessage
              ? bunnyImage + 'zhenyaartyom' + newMessage
              : bunnyImage
              ? bunnyImage
              : newMessage,
          },
        ]);
        setNewMessage('');
        setBunnyImage('');
        setMessageImage && setMessageImage('');
        onPressToDismiss();
        const payload = {
          assistantId: assistantId ? assistantId : createdAssistantId,
          data: {
            message: regeneratedQuestion ? regeneratedQuestion : newMessage,
          },
          cb: () => {
            setAssistantLoading(false);
            setNewMessageList([]);
            {
              getMe && dispatch(getAssistantChannels(getMe.id));
            }
          },
        };
        if (
          bunnyImage ||
          (regeneratedQuestion &&
            regeneratedQuestion.startsWith('https://marathon.b-cdn.net'))
        ) {
          const regeneratedImage = regeneratedQuestion?.includes('zhenyaartyom')
            ? regeneratedQuestion?.split('zhenyaartyom')[0]
            : regeneratedQuestion;
          const regeneratedText = regeneratedQuestion?.includes('zhenyaartyom')
            ? regeneratedQuestion?.split('zhenyaartyom')[1]
            : undefined;
          const imagePayload = {
            assistantId: assistantId ? assistantId : createdAssistantId,
            data: {
              file_url: bunnyImage ? bunnyImage : regeneratedImage,
            },
            cb: () => {
              setAssistantLoading(false);
              setNewMessageList([]);
              {
                getMe && dispatch(getAssistantChannels(getMe.id));
              }
            },
          };
          if (newMessage) {
            //@ts-ignore
            imagePayload.data.text = newMessage;
          }
          if (regeneratedText) {
            //@ts-ignore
            imagePayload.data.text = regeneratedText;
          }
          if (assistantId || createdAssistantId) {
            //@ts-ignore
            dispatch(postAssistantImageMessage(imagePayload));
          }
        } else {
          if (assistantId || createdAssistantId) {
            dispatch(postAssistantMessage(payload));
          }
        }

        // {
        //   (assistantId || createdAssistantId) &&
        //     dispatch(postAssistantMessage(payload));
        // }
      } else {
        handleCreateAssistantChat(
          regeneratedQuestion ? regeneratedQuestion : newMessage,
        );
      }
    },
    [
      newMessage,
      messageList,
      assistantId,
      createdAssistantId,
      getMe,
      bunnyImage,
    ],
  );

  const handleCreateAssistantChat = useCallback(
    (text: string) => {
      if (getMe) {
        setAssistantLoading(true);
        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        setNewMessageList([
          {
            created_at: now,
            id: 0,
            me: true,
            message: text,
          },
        ]);
        setNewMessage('');
        onPressToDismiss();
        const payload = {
          data: {
            message: text,
            type: getMe.role_mode === 'coach' ? 'smm' : 'ng',
          },
          cb: () => {
            setAssistantLoading(false);
            setNewMessageList([]);
            dispatch(getAssistantChannels(getMe.id));
          },
        };
        dispatch(createAssistantChannel(payload));
      }
    },
    [getMe],
  );
  const handleSetImage = useCallback(
    (value: IUploadImage[]) => {
      dispatch(
        uploadImageToBunnyAction(value, 'profile', public_id => {
          // console.log(
          //   public_id,
          //   'BUNYYYYY IDDDDDDDDDDDDDDDDDDDDIDDDDDDDDDDDDDDDDDDDDIDDDDDDDDDDDDDDDDDDDD',
          // );
          setBunnyImage(
            downloadMediaFromBunny({
              public_key: public_id,
              mediaType: 'image',
              userDir: getMe?.id,
              imageDir: 'profile',
            })?.url ?? '',
          );
        }),
      );
    },
    [getMe],
  );

  const questionItems = useMemo(() => {
    if (getMe?.role_mode === 'coach') {
      return [
        t('assistantFirstQuestion'),
        t('assistantSecondQuestion'),
        t('assistantThirdQuestion'),
      ];
    } else {
      return [
        t('assistantUserFirstQuestion'),
        t('assistantUserSecondQuestion'),
        t('assistantUserThirdQuestion'),
      ];
    }
  }, [t, getMe]);

  return {
    t,
    loading,
    getMe,
    assistantTitle,
    messageList,
    newMessageList,
    onPressToDismiss,
    handleOnHandReach,
    handlerGoBack,
    newMessage,
    bunnyImage,
    setBunnyImage,
    handleChangeInputValue,
    handlePressSendMessage,
    questionItems,
    paginationLoading,
    assistantLoading,
    handleCreateAssistantChat,
    handlerOpenChatMenu,
    menuVisible,
    handlerCloseChatMenu,
    handleDeleteAssistant,
    handlerOpenDeleteModal,
    handlerCloseDeleteModal,
    deleteVisible,
    handlerOpenEditChat,
    handleOpenMessageSettings,
    handleCloseMessageSettings,
    messageSettingsVisible,
    selectedMessage,
    handleToCopyText,
    handleToDeleteMessage,
    selectedMessageIsMe,
    handleToRegenerateMessage,
    handleSetImage,
  };
};
