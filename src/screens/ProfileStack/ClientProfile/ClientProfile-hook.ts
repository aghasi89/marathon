import { useCallback, useEffect } from 'react';
import { Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { followersSelector, followingsSelector, profileSelector } from '../../../store/selectors/profile-selector';
import { NavigationParamList } from '../../../navigation/ProfileNavigation';
import { getFollowers, getFollowings, getProfileInfo } from '../../../store/actions/profile-action';

type Props = NativeStackScreenProps<NavigationParamList, 'PROFILE'>;

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const user = useSelector(profileSelector)
  const followers = useSelector(followersSelector)
  const followings = useSelector(followingsSelector)

  const handlenavigateToEditPage = () => {
    navigation.navigate('EDIT_PROFILE')
  }

  const navigateToSocial = useCallback(async (type: string) => {
    if (type == 'facebook') {
      Linking.openURL(user?.facebook ?? "")
    } else if (type == 'linkedin') {
      Linking.openURL(user?.linkedin ?? "")
    } else {
      Linking.openURL(user?.instagram ?? "")
    }
  }, [user])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      //@ts-ignore
      dispatch(getProfileInfo())
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (user) {
      dispatch(getFollowers(user?.id))
      dispatch(getFollowings(user?.id))
    }
  }, [user])

  return {
    t,
    user,
    handlenavigateToEditPage,
    navigateToSocial,
    followers,
    followings
  };
};
