import { useCallback, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { YoutubeIframeRef } from 'react-native-youtube-iframe';
import { SheetManager } from 'react-native-actions-sheet';
import { useTranslation } from 'react-i18next';
import transformFeedListDataOnLike from '../../../../utils/dataTransformHelpers/transformFeedListDataOnLike';
import { getFeedPaymantURLAction } from '../../../../store/actions/finansical-action';
import {
  coachesListSelector,
  feedListSelector,
} from '../../../../store/selectors/feed-selector';
import {
  setCoachesList,
  setFeedListAction,
  setLikeOrDislikeFeedAction,
} from '../../../../store/actions/feed-action';
import { setIsLogin } from '../../../../store/actions/registration-action';
import {
  followUser,
  getPersonInfo,
  setFeeds,
} from '../../../../store/actions/profile-action';
import { setError, setPaymentData } from '../../../../store/actions/administrative-action';
import AnalyticService from '../../../../utils/analytics/AnalyticService';
import { IUserRoleType } from '../../../../utils/analytics/analyticTypes';
import {
  feedsSelector,
  profileSelector,
} from '../../../../store/selectors/profile-selector';
import { NavigationParamList } from '../../../../navigation/FeedNavigation';
import {
  IFeedCardData,
  IFeedPaymantInfo,
  IFeedPaymantSendInfo,
  IFeedTypes,
  IFeedJoinMember,
  IError,
  IUser,
} from '../../../../types/types';
import useSendMessage from '../../../ChatStack/Chat/useSendMessage';
import { useAppContext } from '../../../ChatStack/AppContext';

type Props = NativeStackScreenProps<NavigationParamList, 'DRAWER_FEED'>;

export default (props: any) => {
  const navigation = useNavigation<Props['navigation']>();
  const { t } = useTranslation();
  const {
    handleThreeDots,
    autoplay,
    numColumns = 1,
    cardType = 'default',
  } = props;
  const youtubePlayerRef = useRef<YoutubeIframeRef>(null);
  const feedList = useSelector(feedListSelector);
  const coachesList = useSelector(coachesListSelector);
  const myFeedsList = useSelector(feedsSelector);
  const dispatch = useDispatch();
  const user = useSelector(profileSelector);
  const [loading, setLoading] = useState<boolean>(false);
  const { setChannel } = useAppContext();
  const { onPressToChat } = useSendMessage();
  const { channel } = useAppContext();
  const window = Dimensions.get('window');
  const cardWidth =
    numColumns > 1
      ? (window.width - (numColumns + 1) * 16) / numColumns
      : window.width;

  const openAuthStack = () => {
    dispatch(setIsLogin(true));
  };

  const commentIconPressHandle = useCallback((feedId: number) => {
    if (!user) {
      openAuthStack();
    } else {
      SheetManager.show('commentSheet', {
        payload: {
          feedId,
        },
      });
    }
  }, [user]);

  const energyIconPressHandle = useCallback(
    (
      item?: IFeedCardData,
      action?: 'press' | 'longPress',
      type?: 'profilePage' | 'feedList',
    ) => {
      if (!user) {
        openAuthStack();
      } else {
        if (action === 'press') {
          item?.id &&
            dispatch(
              setLikeOrDislikeFeedAction(item?.id, status => {
                if (status === 'success') {
                  if (type === 'feedList') {
                    dispatch(
                      setFeedListAction(
                        transformFeedListDataOnLike(item.id ?? 0, feedList),
                      ),
                    );
                    const existsInMyFeedList = myFeedsList?.findIndex(
                      el => el.id === item.id,
                    );
                    if (existsInMyFeedList && existsInMyFeedList > -1) {
                      dispatch(
                        setFeeds(
                          transformFeedListDataOnLike(
                            item.id ?? 0,
                            myFeedsList,
                          ),
                        ),
                      );
                    }
                  } else {
                    dispatch(
                      setFeeds(
                        transformFeedListDataOnLike(item.id ?? 0, myFeedsList),
                      ),
                    );
                    const existsInFeedList = feedList?.findIndex(
                      el => el.id === item.id,
                    );
                    if (existsInFeedList > -1) {
                      dispatch(
                        setFeedListAction(
                          transformFeedListDataOnLike(item.id ?? 0, feedList),
                        ),
                      );
                    }
                  }
                  if (!item.isLiked && item.id)
                    AnalyticService.LikeFeed(item.id)
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
            id: item?.id,
            action: 'likesList',
          });
        }
      }
    },
    [feedList, user],
  );

  const joinButtonPressHandle = useCallback(
    (item: IFeedCardData) => {
      if (!user) {
        openAuthStack();
      } else {
        const data: IFeedPaymantSendInfo = {
          coach: item.creatorId,
          user: user.id,
          comment: '',
          money: parseInt(item.price ?? '0'),
          feed: item.id,
          user_wallet: item.wallet_id,
          device: 'mobile'
        };
        if (item.id && item.type === 'package')
          AnalyticService.clickJoinToPackage(item.id);
        else if (item.id && item.type === 'live')
          AnalyticService.clickJoinToLive(item.id);
        setLoading(true);
        !!item.price &&
          dispatch(
            getFeedPaymantURLAction(data, (paymantInfo: IFeedPaymantInfo) => {
              if (!paymantInfo.error) {
                if (item.price && parseInt(item.price) > 0) {
                  setLoading(false);
                  const data = {
                    id: item.id,
                    ...paymantInfo
                  }
                  dispatch(setPaymentData(data))
                } else {
                  const newList = [...feedList];
                  const index = newList.findIndex(el => el.id === item.id);
                  const newMember: IFeedJoinMember = {
                    id: item.creatorId ?? -1,
                    created_at: moment().toDate(),
                    feed_id: item.id ?? -1,
                    status: '',
                    user: user,
                  };
                  if (index >= 0)
                    newList[index].members = newList[index].members
                      ? [...newList[index].members, newMember]
                      : [newMember];
                  dispatch((setFeeds(newList)))
                  dispatch(
                    setFeedListAction(newList, () => {
                      setLoading(false);
                      if (
                        item.type === 'package' &&
                        (!!item.measurement?.length ||
                          !!item.coach_question?.length)
                      ) {
                        //@ts-ignore
                        navigation.navigate('ANSWER_COACH_QUESTIONS', {
                          id: item.id,
                        });
                      } else {
                        openChannelButtonPressHandle(item);
                      }
                      if (item.id && item.type === 'package')
                        AnalyticService.packageJoin(item.id, item.price ?? '0');
                      dispatch(
                        setError({
                          title: `${t('congratulations')} !`,
                          buttonTitle: t('close'),
                          text: t('paymentComletedSuccessfully'),
                        }),
                      );
                    }),
                  );
                }
              } else {
                dispatch(
                  setError({
                    buttonTitle: t('OK'),
                    title: '',
                    text: paymantInfo.errorMessage,
                  }),
                );
                setLoading(false);
              }
            }),
          );
      }
    },
    [feedList, user],
  );

  const openChannelButtonPressHandle = useCallback(
    async (item: IFeedCardData) => {
      if (!user) {
        openAuthStack();
      } else {
        if (item.chat_type && item.channel_id) {
          //@ts-ignore
          navigation.navigate('CHANNEL', {
            channelId: item.channel_id,
            type: item.chat_type,
          });
        }
      }
    },
    [channel, user],
  );

  const openChatButtonPressHandle = useCallback((item: IFeedCardData) => {
    if (!user) {
      openAuthStack();
    } else {
      item.creatorId && AnalyticService.clickMessageToCoach(item.creatorId)
      onPressToChat(item.get_stream_id ? item.get_stream_id.toString() : '');
    }
  }, [user]);

  const openGroupeButtonPressHandle = useCallback((id?: number) => {
    if (!user) {
      openAuthStack();
    } else {
      //@ts-ignore
      id && navigation.navigate('JOINED_MEMBERS_LIST', {
        id,
        action: 'joinedMembers',
      });
    }
  }, [user]);

  const threeDotsIconPressHandle = useCallback((id?: number) => {
    if (!user) {
      openAuthStack();
    } else {
      handleThreeDots(id);
    }
  }, [user]);

  const bookmarkIconPressHandle = useCallback(() => {
    if (!user) {
      openAuthStack();
    } else {
    }
  }, [user]);

  const followButtonPressHandle = useCallback(() => {
    if (!user) {
      openAuthStack();
    } else {
      if (cardType === 'coach') {
        const newArr = coachesList.map((user, i) => {
          if (user.id == props.item.id) {
            return { ...user, am_i_follow: !user.am_i_follow };
          } else {
            return user;
          }
        });
        dispatch(
          followUser(props.item.id, status => {
            if (status === 'success') {
              dispatch(setCoachesList(newArr));
              sandFollowAnalytics(
                !user.am_i_follow,
                user.id,
                user?.role_mode === 'coach' ? 'coach' : 'user',
              );
            } else {
              const data: IError = {
                title: 'Something went wrong ...',
                text: 'some error text',
                buttonTitle: 'OK',
              };
              dispatch(setError(data));
            }
          }),
        );
      } else {
        var newArr = feedList.map((obj, i) => {
          if (obj.id == props.item.id) {
            feedList[i].am_i_follow = !feedList[i].am_i_follow;
            return feedList[i];
          } else {
            return obj;
          }
        });
        dispatch(followUser(props.item?.creatorId, (status) => {
          if (status === 'success') {
            dispatch(setFeedListAction(newArr));
            const index = newArr.findIndex(el => el.id === props.item.id)
            if (index > -1)
              sandFollowAnalytics(newArr[index].am_i_follow, props.item?.creatorId, props.item?.role_mode)
          }
        }));

      }
    }
  }, [feedList, coachesList, props.item, user]);
  const sandFollowAnalytics = useCallback(
    (am_i_follow: boolean, userId: number, userRole: IUserRoleType) => {

      if (am_i_follow) AnalyticService.followUser(userId, userRole);
      else AnalyticService.unfollowUser(userId, userRole);
    },
    [],
  );
  const shareIconPressHandle = useCallback((data: IFeedCardData) => {
    if (data.id) {
      SheetManager.show('feedShareSheet', {
        payload: {
          data,
        },
      });
    }
  }, []);

  const onHehashtagPressHandle = useCallback((index: number) => { }, []);

  const navigateUserPage = useCallback(
    (id?: number) => {
      id &&
        dispatch(
          getPersonInfo(id, () => {
            navigation.navigate('USER_PROFILE');
          }),
        );
    },
    [feedList],
  );
  const startWorkoutButtonPressHandle = useCallback((item: IFeedCardData) => {
    if (item?.traningCount && item?.traningCount > 0) {
      //@ts-ignore
      navigation.navigate('WATCH_WORKOUT', { id: item.id });
    } else if (!!!item.traningCount) {
      //@ts-ignore
      navigation.navigate('ABOUT_FEED', {
        id: item.id,
        type: 'feed',
        action: 'singleVideo',
      });
    }
  }, []);
  const cardPressHandle = useCallback(
    (id?: number, type?: IFeedTypes | undefined) => {
      if (cardType !== 'coach') {
        if (type !== 'basic') {
          //@ts-ignore
          navigation.navigate('ABOUT_FEED', { id, type: 'feed' });
        } else {
          //@ts-ignore
          navigation.navigate('ABOUT_FEED', { id, type: 'basic' });
        }
      } else {
        navigateUserPage(id);
      }
    },
    [cardType],
  );

  return {
    commentIconPressHandle,
    energyIconPressHandle,
    joinButtonPressHandle,
    openChannelButtonPressHandle,
    openChatButtonPressHandle,
    openGroupeButtonPressHandle,
    shareIconPressHandle,
    threeDotsIconPressHandle,
    bookmarkIconPressHandle,
    followButtonPressHandle,
    onHehashtagPressHandle,
    navigateUserPage,
    startWorkoutButtonPressHandle,
    loading,
    youtubePlayerRef,
    cardPressHandle,
    cardWidth
  };
};
