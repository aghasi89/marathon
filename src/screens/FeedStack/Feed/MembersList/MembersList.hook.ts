import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {
  getFeedByIdAction,
  getLikedUsersLitsAction,
  setLikedUsersLitsAction,
  setSelectedFeedAction,
} from '../../../../store/actions/feed-action';
import {
  likedUsersListSelector,
  selectedFeedSelector,
} from '../../../../store/selectors/feed-selector';
import {
  followUser,
  getPersonInfo,
} from '../../../../store/actions/profile-action';
import {setError} from '../../../../store/actions/administrative-action';
import {profileSelector} from '../../../../store/selectors/profile-selector';
import AnalyticService from '../../../../utils/analytics/AnalyticService';
import {MainNavigationParamList} from '../../../../navigation/MainNavigation';
import {downloadMediaFromBunny} from '../../../../utils/bunny.net';

type data = {
  pageRenderDate: {
    headerTitle?: string | null;
    emptyListText?: string | null;
  };
  usersListDate: dataListItem[] | undefined;
};
type dataListItem = {
  id: number;
  name?: string;
  url?: string;
  measurement_answer?: string | null;
  am_i_follow?: boolean;
  followButtonShow?: boolean;
};
type Props = NativeStackScreenProps<
  MainNavigationParamList,
  'JOINED_MEMBERS_LIST'
>;
export default () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(profileSelector);
  const selectedFeed = useSelector(selectedFeedSelector);
  const likedUsersList = useSelector(likedUsersListSelector);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {id, action} = route?.params;

  useEffect(() => {
    setLoading(true);
    if (id) {
      if (action === 'joinedMembers') {
        dispatch(
          getFeedByIdAction({
            id: id,
            type: 'feed',
            cb: () => {
              setLoading(false);
            },
          }),
        );
      } else if (action === 'likesList') {
        dispatch(
          getLikedUsersLitsAction(id, status => {
            if (status === 'success') {
              setLoading(false);
              dispatch(getFeedByIdAction({id: id, type: 'feed'}));
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
      }
    }
  }, [id]);
  const backIconPressHandle = useCallback(() => {
    navigation.goBack();
    // dispatch(setSelectedFeedAction(undefined));
  }, [navigation]);
  const userImagePressHandle = useCallback((item: dataListItem) => {
    dispatch(
      getPersonInfo(item.id, () => {
        //@ts-ignore
        navigation.navigate('USER_PROFILE');
      }),
    );
  }, []);
  const detailsIconPressHandle = useCallback((item: dataListItem) => {
    navigation.navigate('JOINED_MEMBER_DETAILS', {memberId: item.id});
  }, []);
  const refreshingHandle = useCallback(() => {
    setLoading(true);
    if (action === 'joinedMembers') {
      dispatch(setSelectedFeedAction(undefined));
      id &&
        dispatch(
          getFeedByIdAction({
            id: id,
            type: 'feed',
            cb: () => {
              setLoading(false);
              setRefreshing(false);
            },
          }),
        );
    } else if (action === 'likesList') {
      id &&
        dispatch(
          getLikedUsersLitsAction(id, status => {
            if (status === 'success') {
              setLoading(false);
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
    }
  }, []);
  const data = useMemo(() => {
    let data: data | undefined;
    if (action === 'joinedMembers') {
      data = {
        pageRenderDate: {
          headerTitle: t('connectedUsers'),
          emptyListText: t('noJoinedMembers'),
        },
        usersListDate: selectedFeed?.members?.map(el => ({
          id: el.user.id ?? 0,
          url: el.user.image
            ? downloadMediaFromBunny({
                public_key: el.user.image,
                mediaType: 'image',
                userDir: el?.user?.id,
                imageDir: 'profile',
              })?.url
            : '',
          name: `${el?.user.user.first_name ?? ''} ${
            el?.user.user.last_name ?? ''
          }`,
        })),
      };
    } else if (action === 'likesList') {
      data = {
        pageRenderDate: {
          headerTitle: t('energy'),
          emptyListText: t('noLikes'),
        },
        usersListDate: likedUsersList?.map(el => ({
          id: el.user.id ?? 0,
          url: el.user.image
            ? downloadMediaFromBunny({
                public_key: el.user.image,
                mediaType: 'image',
                userDir: el?.user?.id,
                imageDir: 'profile',
              })?.url
            : '',
          name: `${el?.user.user.first_name ?? ''} ${
            el?.user.user.last_name ?? ''
          }`,
          am_i_follow: el.user.am_i_follow,
          followButtonShow: user?.id !== el.user.id,
        })),
      };
    }
    return data;
  }, [selectedFeed, likedUsersList]);

  const followButtonPressHandle = useCallback(
    (item: dataListItem) => {
      const newUserList = likedUsersList.map(el => {
        if (el.user.id === item.id) {
          if (!el.user.am_i_follow)
            AnalyticService.followUser(
              el.user.id,
              el.user.role_mode === 'coach' ? 'coach' : 'user',
            );
          else
            AnalyticService.unfollowUser(
              el.user.id,
              el.user.role_mode === 'coach' ? 'coach' : 'user',
            );
          return {
            ...el,
            user: {...el.user, am_i_follow: !el.user.am_i_follow},
          };
        } else {
          return el;
        }
      });
      dispatch(
        followUser(item.id, status => {
          if (status === 'success') {
            dispatch(setLikedUsersLitsAction(newUserList));
          }
        }),
      );

      // var newArr = feedList.map((obj, i) => {
      //   if (obj.id == props.item.id) {
      //     feedList[i].am_i_follow = !feedList[i].am_i_follow;
      //     return feedList[i];
      //   } else {
      //     return obj;
      //   }
      // });
      // dispatch(followUser(props.item?.creatorId));
      // dispatch(setFeedListAction(newArr));
    },
    [likedUsersList],
  );
  return {
    t,
    backIconPressHandle,
    userImagePressHandle,
    detailsIconPressHandle,
    loading,
    refreshing,
    refreshingHandle,
    selectedFeed,
    data,
    action,
    followButtonPressHandle,
  };
};
