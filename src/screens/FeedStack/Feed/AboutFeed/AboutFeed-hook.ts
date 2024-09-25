import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { SheetManager } from 'react-native-actions-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import i18 from "i18next";
import transformFeedListDataOnLike from '../../../../utils/dataTransformHelpers/transformFeedListDataOnLike';
import transformSelectedFeedData from '../../../../utils/dataTransformHelpers/transformSelectedFeedData';
import {
  checkIsQuetstinsExistAction,
  deleteFeed,
  getFeedByIdAction,
  getReportCategoryList,
  hideFeed,
  postReport,
  setFeedListAction,
  setLikeOrDislikeFeedAction,
  setSelectedFeedAction,
} from '../../../../store/actions/feed-action';
import { setIsLogin } from '../../../../store/actions/registration-action';
import { currencyTypesSelector } from '../../../../store/selectors/finansical-selector';
import {
  feedListSelector,
  reportCategoryListSelector,
  selectedFeedSelector,
} from '../../../../store/selectors/feed-selector';
import {
  feedsSelector,
  profileSelector,
} from '../../../../store/selectors/profile-selector';
import { setError, setPaymentData } from '../../../../store/actions/administrative-action';
import {
  IFeedItem,
  IFeedJoinMember,
  IFeedListItem,
  IFeedPaymantInfo,
  IFeedPaymantSendInfo,
  IRequestStatusType,
  ISelectedFeedData,
} from '../../../../types/types';
import { getFeedPaymantURLAction } from '../../../../store/actions/finansical-action';
import AnalyticService from '../../../../utils/analytics/AnalyticService';
import useSendMessage from '../../../ChatStack/Chat/useSendMessage';
import {
  getPersonInfo,
  setFeeds,
} from '../../../../store/actions/profile-action';
import { MainNavigationParamList } from '../../../../navigation/MainNavigation';

type Props = NativeStackScreenProps<MainNavigationParamList, 'ABOUT_FEED'>;

export default () => {
  const navigation = useNavigation<Props['navigation']>();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const lang = i18.language;
  const selectedFeed = useSelector(selectedFeedSelector);
  const feedList = useSelector(feedListSelector);
  const myFeedsList = useSelector(feedsSelector);
  const user = useSelector(profileSelector);
  const currencyList = useSelector(currencyTypesSelector);
  const { onPressToChat } = useSendMessage();
  const route = useRoute<Props['route']>();
  const [images, setImages] = useState<{ url: string }[]>([]);
  const [imageViewModalVisibility, setImageViewModalVisibility] =
    useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [actionSheetVisibility, setActionSheetVisibility] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [joining, setJoining] = useState<boolean>(false);
  const [selectedFeedId, setSelectedFeedId] = useState<number | undefined>(
    undefined,
  );
  const [autoplay, setAutoplay] = useState<boolean>(false);
  const [bodyPartsModalVisibility, setBodyPartsModalVisibility] =
    useState<boolean>(false);
  const [equipmentsModalVisibility, setEquipmentsModalVisibility] =
    useState<boolean>(false);
  const [exerciseModalVisibility, setExerciseModalVisibility] =
    useState<boolean>(false);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<number>(0);
  const [reportModalVisible, setReportModalVisible] = useState<boolean>(false);
  const [questionsModalVisible, setQuestionsModalVisible] =
    useState<boolean>(false);
  const reportCategories = useSelector(reportCategoryListSelector);
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(1);
  const [reportValue, setReportValue] = useState('');
  const [reportCategory, setReportCategory] = useState(1);
  const [isQusetionsCheckedOnce, setIsQusetionsCheckedOnce] =
    useState<boolean>(false);

  const { id, type, action } = route.params;
  useEffect(() => {
    if (!reportCategories) {
      dispatch(getReportCategoryList());
    }
    if (selectedFeed?.feed && selectedFeed.feed?.type !== 'feed') {
      AnalyticService.viewFeed(selectedFeed.feed?.type, selectedFeed.feed?.id);
    }
  }, [selectedFeed]);
  useEffect(() => {
    setLoading(true);
    if (action) {
      setAutoplay(action === 'singleVideo');
    }
    id &&
      type &&
      dispatch(
        getFeedByIdAction({
          id: id,
          type: type,
          cb: (status: string) => {
            if (status == 'success') {
              setLoading(false);
            } else {
              navigation.goBack()
              navigation.navigate('COACH_INFO_PAGE')
            }
          },
        }),
      );
    return () => {
      dispatch(setSelectedFeedAction(undefined));
    };
  }, [id]);
  useEffect(() => {
    if (selectedFeed && user && !isQusetionsCheckedOnce) {
      checkQuestions(user?.id, selectedFeed);
    }
  }, [selectedFeed, isQusetionsCheckedOnce]);
  const openAuthStack = () => {
    dispatch(setIsLogin(true));
  };

  const feedData = useMemo(() => {
    return transformSelectedFeedData(
      t,
      selectedFeed,
      currencyList,
      user,
      value,
    );
  }, [selectedFeed]);

  const recipeChipPressHandle = useCallback((type?: string) => { }, []);
  const backIconPressHandler = useCallback(() => {
    navigation.goBack();
  }, []);

  const imagePressHandler = useCallback((url?: string) => {
    url && setImages([{ url }]);
    setImageViewModalVisibility(true);
  }, []);

  const imageViewModalCloseHandle = useCallback(() => {
    setImageViewModalVisibility(false);
  }, []);
  const bookmarkIconPressHandle = useCallback(() => {
    if (user) {
    } else {
      openAuthStack();
    }
  }, [user]);
  const commentIconPressHandle = useCallback(
    (feedId?: number) => {
      if (user) {
        SheetManager.show('commentSheet', {
          payload: {
            feedId,
          },
        });
      } else {
        openAuthStack();
      }
    },
    [user],
  );
  const energyIconPressHandle = useCallback(
    (action: 'press' | 'longPress') => {
      if (!user) {
        openAuthStack();
      } else {
        if (action === 'press') {
          selectedFeed?.feed?.id &&
            dispatch(
              setLikeOrDislikeFeedAction(selectedFeed?.feed?.id, status => {
                if (status === 'success') {
                  const newFeed: IFeedItem = {
                    ...selectedFeed,
                    liked: !selectedFeed?.liked,
                    //@ts-ignore
                    feed: {
                      ...selectedFeed?.feed,
                      id: selectedFeed?.feed?.id ?? 0,
                      media: selectedFeed.feed?.media ?? [],
                      like_count:
                        (selectedFeed?.feed?.like_count ?? 0) +
                        (selectedFeed.liked ? -1 : 1),
                    },
                  };
                  dispatch(setSelectedFeedAction(newFeed));
                  const existsInMyFeedList = myFeedsList?.findIndex(
                    el => el.id === selectedFeed.feed?.id,
                  );
                  const existsInFeedList = feedList?.findIndex(
                    el => el.id === selectedFeed.feed?.id,
                  );
                  if (existsInMyFeedList && existsInMyFeedList > -1) {
                    id &&
                      dispatch(
                        setFeeds(transformFeedListDataOnLike(id, myFeedsList)),
                      );
                  }
                  if (existsInFeedList > -1) {
                    dispatch(
                      setFeedListAction(
                        transformFeedListDataOnLike(
                          selectedFeed.feed?.id ?? 0,
                          feedList,
                        ),
                      ),
                    );
                  }
                  if (!selectedFeed.liked && selectedFeed?.feed)
                    AnalyticService.LikeFeed(selectedFeed?.feed?.id);
                } else {
                  dispatch(
                    setError({
                      title: t('error'),
                      text: t('somethingWentWrong'),
                      buttonTitle: t('ok'),
                    }),
                  );
                }
              }),
            );
        } else {
          //@ts-ignore
          navigation.navigate('JOINED_MEMBERS_LIST', {
            id: selectedFeed.feed?.id,
            action: 'likesList',
          });
        }
      }
    },
    [user, selectedFeed, myFeedsList, feedList],
  );
  const dotsIconPressHandle = useCallback(
    (id?: number) => {
      if (user) {
        setSelectedFeedId(id);
        setActionSheetVisibility(true);
      } else {
        openAuthStack();
      }
    },
    [user],
  );
  const shareIconPressHandle = useCallback((data: ISelectedFeedData) => {
    if (data.id) {
      SheetManager.show('feedShareSheet', {
        payload: {
          data,
        },
      });
    }
  }, []);
  const inputValueChangeHandle = useCallback((text: string) => {
    setValue(text);
  }, []);
  const sendIconPressHandle = useCallback(() => { }, []);
  const commentLikePressHandle = useCallback(() => {
    if (user) {
    } else {
      openAuthStack();
    }
  }, [user]);
  const commentReplyPressHandle = useCallback(
    (id?: number) => {
      if (user) {
      } else {
        openAuthStack();
      }
    },
    [user],
  );
  const commentViewRepliesPressHandle = useCallback(() => { }, []);
  const joinButtonPressHandle = useCallback(() => {
    if (user) {
      const data: IFeedPaymantSendInfo = {
        coach: selectedFeed.feed?.creator,
        user: user.id,
        comment: '',
        money: parseInt(selectedFeed?.price ?? '0'),
        feed: selectedFeed.feed?.id,
        user_wallet: selectedFeed.wallet_id,
        device: 'mobile'
      };
      if (selectedFeed?.feed && selectedFeed.feed.type === 'package')
        AnalyticService.clickJoinToPackage(selectedFeed.feed.id);
      else if (selectedFeed?.feed && selectedFeed.feed.type === 'live')
        AnalyticService.clickJoinToLive(selectedFeed.feed.id);
      setJoining(true);
      dispatch(
        getFeedPaymantURLAction(data, (paymantInfo: IFeedPaymantInfo) => {
          if (!paymantInfo.error) {
            if (selectedFeed.price && parseInt(selectedFeed.price) > 0) {
              //@ts-ignore
              setJoining(false);
              const data = {
                id: selectedFeed?.feed?.id ?? 0,
                ...paymantInfo
              }
              dispatch(setPaymentData(data))
            } else {
              addNewMember(() => {
                setJoining(false);
                if (
                  selectedFeed.type === 'package' &&
                  (!!selectedFeed.coach_question?.length ||
                    !!selectedFeed.measurement?.length)
                ) {
                  //@ts-ignore
                  navigation.navigate('ANSWER_COACH_QUESTIONS', {
                    id: selectedFeed.feed?.id,
                  });
                } else {
                  openChannelButtonPressHandle();
                }
                if (selectedFeed.feed && selectedFeed.feed.type === 'package')
                  AnalyticService.packageJoin(
                    selectedFeed.feed.id,
                    selectedFeed.price ?? '0',
                  );
                else if (selectedFeed.feed && selectedFeed.feed.type === 'live')
                  AnalyticService.liveJoin(
                    selectedFeed.feed.id,
                    selectedFeed.price ?? '0',
                  );
                dispatch(
                  setError({
                    title: `${t('congratulations')} !`,
                    buttonTitle: t('close'),
                    text: t('paymentComletedSuccessfully'),
                  }),
                );
              });
            }
          } else {
            dispatch(
              setError({
                buttonTitle: t('OK'),
                title: '',
                text: paymantInfo.errorMessage,
              }),
            );
            setJoining(false);
          }
        }),
      );
    } else {
      openAuthStack();
    }
  }, [user, selectedFeed]);

  const addNewMember = useCallback(
    (cb: () => void) => {
      const newList = [...feedList];
      const index = newList.findIndex(el => el.id === selectedFeed?.feed?.id);
      if (user) {
        const newMember: IFeedJoinMember = {
          id: selectedFeed.feed?.creator ?? -1,
          created_at: moment().toDate(),
          feed_id: selectedFeed.id ?? -1,
          status: '',
          user: user,
        };
        const newFeed = { ...selectedFeed };
        newFeed.members = newFeed?.members
          ? [...newFeed?.members, newMember]
          : [newMember];
        if (index >= 0)
          newList[index].members = newList[index].members
            ? [...newList[index].members, newMember]
            : [newMember];
        dispatch(setSelectedFeedAction(newFeed));
        dispatch(setFeedListAction(newList, cb));
      }
    },
    [selectedFeed, feedList, user],
  );

  const openChannelButtonPressHandle = useCallback(async () => {
    if (!user) {
      openAuthStack();
    } else {
      if (selectedFeed.chat_type && selectedFeed.channel_id) {
        //@ts-ignore
        navigation.navigate('CHANNEL', {
          channelId: selectedFeed.channel_id,
          type: selectedFeed.chat_type,
        });
      }
    }
  }, [selectedFeed]);
  const openChatButtonPressHandle = useCallback(() => {
    if (user) {
      onPressToChat(
        selectedFeed?.get_stream_id ? selectedFeed.get_stream_id : '',
      );
      selectedFeed.feed?.creator &&
        AnalyticService.clickMessageToCoach(selectedFeed.feed?.creator);
    } else {
      openAuthStack();
    }
  }, [user, selectedFeed]);

  const openGroupeButtonPressHandle = useCallback(() => {
    if (user) {
      navigation.navigate('JOINED_MEMBERS_LIST', {
        id: selectedFeed?.feed?.id,
        action: 'joinedMembers',
      });
    } else {
      openAuthStack();
    }
  }, [user]);
  const actionSheetCloseHandle = useCallback(() => {
    setSelectedFeedId(undefined);
    setActionSheetVisibility(false);
  }, []);

  const hidePressHandle = useCallback(() => {
    const newList: IFeedListItem[] = [...feedList];
    const index = newList.findIndex(el => el.id === selectedFeedId);
    const payload = {
      feed: selectedFeedId?.toString(),
      user: user?.id.toString(),
    };
    dispatch(
      hideFeed(payload, (status: IRequestStatusType) => {
        if (status === 'success') {
          newList.splice(index, 1);
          dispatch(setFeedListAction(newList));
        } else {
          dispatch(
            setError({
              title: t('error'),
              text: t('somethingWentWrong'),
              buttonTitle: t('ok'),
            }),
          );
        }
      }),
    );
    setActionSheetVisibility(false);
  }, [selectedFeedId]);
  const reportPressHandle = useCallback(() => {
    setActionSheetVisibility(false);
    setReportModalVisible(true);
  }, [selectedFeedId]);
  const canclePressHandle = useCallback(() => {
    setActionSheetVisibility(false);
  }, []);
  const editPressHandle = useCallback(() => {
    if (selectedFeed?.feed)
      dispatch(
        getFeedByIdAction({
          id: selectedFeed?.feed?.id,
          type: selectedFeed?.type == 'basic' ? 'basic' : 'feed',
        }),
      );
    setActionSheetVisibility(false);
    //@ts-ignore
    navigation.navigate('CREATE_FEED', {
      type: selectedFeed?.type,
      isEditing:true,
      workoutType:
        selectedFeed && !!selectedFeed?.trainings?.length
          ? 'manyVideos'
          : 'singleVideo',
    });
  }, [selectedFeed]);
  const sharePressHandle = useCallback(() => {
    console.log('share feed id:', selectedFeedId);
    setActionSheetVisibility(false);
  }, [selectedFeedId]);
  const blockPressHandle = useCallback(() => {
    console.log('block feed id:', selectedFeedId);
    setActionSheetVisibility(false);
  }, [selectedFeedId]);
  const deletePressHandle = useCallback(() => {
    if (selectedFeed?.feed)
      dispatch(
        deleteFeed(selectedFeed?.feed?.id, (status: IRequestStatusType) => {
          if (status === 'success') {
            navigation.goBack();
          } else {
            dispatch(
              setError({
                title: t('error'),
                text: t('somethingWentWrong'),
                buttonTitle: t('ok'),
              }),
            );
            setActionSheetVisibility(false);
          }
        }),
      );
  }, [selectedFeedId]);
  const bodyPartsModalCloseHandle = useCallback(() => {
    setBodyPartsModalVisibility(false);
  }, []);
  const equipentsModalCloseHandle = useCallback(() => {
    setEquipmentsModalVisibility(false);
  }, []);
  const equipentsButtonPress = useCallback(() => {
    setEquipmentsModalVisibility(true);
  }, []);
  const bodyPartsButtonPressHandle = useCallback(() => {
    setBodyPartsModalVisibility(true);
  }, []);

  const exerciseItemPressHandle = useCallback((index: number) => {
    setSelectedExerciseIndex(index);
    setExerciseModalVisibility(true);
  }, []);
  const exerciseModalCloseHandle = useCallback(() => {
    setExerciseModalVisibility(false);
  }, []);
  const selectedExerciseChangeHandle = useCallback(
    (action: 'next' | 'previous') => {
      setSelectedExerciseIndex(current => {
        if (action === 'next') {
          if (feedData.trainings && current < feedData.trainings?.length - 1)
            return current + 1;
        } else {
          if (feedData.trainings && current > 0) return current - 1;
        }
        return current;
      });
    },
    [selectedExerciseIndex, feedData],
  );
  const startButtonPressHandle = useCallback(() => {
    if (!!selectedFeed.trainings?.length) {
      navigation.navigate('WATCH_WORKOUT');
    } else {
      setAutoplay(true);
    }
  }, [selectedFeed]);
  const navigateUserPage = useCallback((id?: number) => {
    if (id) {
      dispatch(
        getPersonInfo(id, () => {
          //@ts-ignore
          navigation.navigate('USER_PROFILE');
        }),
      );
    }
  }, []);
  const selectReportType = useCallback(
    (item: any) => {
      setReportCategory(item.id);
      if (selectedFeedId) {
        if (item.name === 'Other') {
          setSelectedStepIndex(2);
        } else {
          const payload = {
            feed: selectedFeedId?.toString(),
            report_category: reportCategory,
            text: reportValue ? reportValue : '-',
            user: user?.id ?? 0,
          };
          //@ts-ignore
          dispatch(
            postReport(payload, () => {
              setSelectedStepIndex(3);
            }),
          );
        }
      }
    },
    [selectedStepIndex, reportValue, reportCategory, selectedFeedId],
  );
  const reportHandler = useCallback(() => {
    const payload = {
      feed: selectedFeedId?.toString() ?? '',
      report_category: reportCategory,
      text: reportValue ? reportValue : '',
      user: user?.id ?? 0,
    };
    //@ts-ignore
    dispatch(
      postReport(payload, () => {
        setSelectedStepIndex(3);
      }),
    );
  }, [reportCategory, reportValue, selectedFeedId]);
  const saveHandler = useCallback(() => {
    setReportModalVisible(false);
    setSelectedStepIndex(1);
    setReportValue('');
    setReportCategory(1);
  }, []);
  const backIconPressHandle = useCallback(() => {
    setSelectedStepIndex(1);
  }, [selectedStepIndex]);
  const repotModalCloseHandle = useCallback(() => {
    setReportModalVisible(false);
    setSelectedStepIndex(1);
    setReportValue('');
    setReportCategory(1);
  }, []);
  const checkQuestions = useCallback((user?: number, selected?: IFeedItem) => {
    if (user && selected) {
      if (!!selected.coach_question?.length) {
        const amIExistsInMembers = selected?.members?.find(
          el => el.user.id === user,
        );
        if (amIExistsInMembers)
          dispatch(
            checkIsQuetstinsExistAction(
              { user, feed: selected?.feed?.id ?? 0 },
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
    navigation.navigate('ANSWER_COACH_QUESTIONS', { id });
    questionsModalCloseHandle();
  }, []);
  return {
    backIconPressHandler,
    imagePressHandler,
    images,
    imageViewModalVisibility,
    imageViewModalCloseHandle,
    feedData,
    recipeChipPressHandle,
    bookmarkIconPressHandle,
    commentIconPressHandle,
    energyIconPressHandle,
    dotsIconPressHandle,
    shareIconPressHandle,
    inputValueChangeHandle,
    sendIconPressHandle,
    commentLikePressHandle,
    commentReplyPressHandle,
    commentViewRepliesPressHandle,
    joinButtonPressHandle,
    openChannelButtonPressHandle,
    openChatButtonPressHandle,
    openGroupeButtonPressHandle,
    actionSheetCloseHandle,
    actionSheetVisibility,
    t,
    hidePressHandle,
    reportPressHandle,
    canclePressHandle,
    deletePressHandle,
    editPressHandle,
    sharePressHandle,
    blockPressHandle,
    selectedFeed,
    user,
    bodyPartsModalVisibility,
    bodyPartsModalCloseHandle,
    equipmentsModalVisibility,
    equipentsModalCloseHandle,
    equipentsButtonPress,
    bodyPartsButtonPressHandle,
    exerciseItemPressHandle,
    exerciseModalVisibility,
    exerciseModalCloseHandle,
    selectedExerciseIndex,
    selectedExerciseChangeHandle,
    startButtonPressHandle,
    loading,
    joining,
    autoplay,
    navigateUserPage,
    reportModalVisible,
    repotModalCloseHandle,
    reportCategories,
    selectReportType,
    selectedStepIndex,
    reportValue,
    reportCategory,
    backIconPressHandle,
    setReportValue,
    reportHandler,
    saveHandler,
    questionsModalVisible,
    questionsModalCloseHandle,
    askQuestionsHandle,
    lang
  };
};
