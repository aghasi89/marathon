import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {
  followersSelector,
  followingsSelector,
  profileSelector,
} from '../../../store/selectors/profile-selector';
import {NavigationParamList} from '../../../navigation/ProfileNavigation';
import {
  followUser,
  getFollowers,
  getFollowings,
  getPersonInfo,
} from '../../../store/actions/profile-action';

type Props = NativeStackScreenProps<
  NavigationParamList,
  'FOLLOWERS_FOLLOWINGS'
>;
export default () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const {userId, activeTab} = route?.params!;
  const user = useSelector(profileSelector);
  const followers = useSelector(followersSelector);
  const followings = useSelector(followingsSelector);
  const [selectedTab, setSelectedTab] = useState<'followers' | 'followings'>();
  const [isLoading, setIsLoading] = useState(false);

  const handleTabPress = useCallback(
    (selected: 'followers' | 'followings') => {
      setSelectedTab(selected);
    },
    [selectedTab],
  );

  useEffect(() => {
    dispatch(getFollowers(userId));
    dispatch(getFollowings(userId));
    setSelectedTab(activeTab);
  }, [userId, activeTab]);

  const goBack = () => {
    navigation.goBack();
  };

  const handleUnfollow = useCallback((id: number) => {
    setIsLoading(true);
    dispatch(
      followUser(id, status => {
        dispatch(getFollowings(userId));
        dispatch(getFollowers(userId));
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }),
    );
  }, []);

  const navigateToFollowsPage = useCallback((id?: number) => {
    id &&
      dispatch(
        getPersonInfo(id, () => {
          navigation.navigate('USER_PROFILE');
        }),
      );
  }, []);

  return {
    t,
    dispatch,
    navigation,
    selectedTab,
    handleTabPress,
    followers,
    followings,
    goBack,
    user,
    userId,
    handleUnfollow,
    isLoading,
    navigateToFollowsPage
  };
};
