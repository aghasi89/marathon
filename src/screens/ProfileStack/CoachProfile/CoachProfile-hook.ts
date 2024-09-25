import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import {
  followersSelector,
  followingsSelector,
  mandatoryFieldsSelector,
  profileSelector,
} from '../../../store/selectors/profile-selector';
import { NavigationParamList } from '../../../navigation/ProfileNavigation';
import {
  getFollowers,
  getFollowings,
  getProfileInfo,
} from '../../../store/actions/profile-action';
import { Linking } from 'react-native';
import keys from '../../../services/Keys';

type Props = NativeStackScreenProps<NavigationParamList, 'PROFILE'>;

export default () => {
  const { t } = useTranslation();
  const navigation = useNavigation<Props['navigation']>();
  const dispatch = useDispatch();
  const user = useSelector(profileSelector);
  const followers = useSelector(followersSelector);
  const followings = useSelector(followingsSelector);
  const mandatoryFields = useSelector(mandatoryFieldsSelector)
  const [isProfileIncomplete, setIsProfileIncomplete] = useState<boolean>(false);
  const handlenavigateToEditPage = () => {
    navigation.navigate('EDIT_PROFILE');
  };

  useEffect(() => {
    if (user) {
      chackIsProfileCompleted();
      dispatch(getFollowers(user?.id));
      dispatch(getFollowings(user?.id));
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      //@ts-ignore
      dispatch(getProfileInfo());
    });
    return unsubscribe;
  }, [navigation]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, []);
  const chackIsProfileCompleted = useCallback(() => {
    if (user && user.role_mode == 'coach') {
      let isIncomplete: boolean = true;
      for (let i = 0; i < mandatoryFields.length; i++) {
        const key = mandatoryFields[i];
        if (
          (key !== 'gender' && !!!user[key]?.length) ||
          (key === 'gender' && !!!user[key])
        ) {
          isIncomplete = true;
          break;
        } else {
          isIncomplete = false;
        }
      }
      setIsProfileIncomplete(isIncomplete);
    }
  }, [user]);
  const navigateToSocial = useCallback(async (type: string) => {
    if (type == 'facebook') {
      Linking.openURL(user?.facebook ?? "")
    } else if (type == 'linkedin') {
      Linking.openURL(user?.linkedin ?? "")
    } else {
      Linking.openURL(user?.instagram ?? "")
    }
  }, [user])

  const pdfViewHandle = useCallback(async (url: string) => {
    await Linking.openURL(`${keys.API_URL}${url}`);
  }, []);

  const navigateFollowersFollowingsPage = useCallback((value: "followers" | "followings") => {
    if (user)
      navigation.navigate('FOLLOWERS_FOLLOWINGS', { activeTab: value, userId: user?.id })
  }, [user])

  const handlePressSeeAll = useCallback(() => {
    navigation.navigate('CERTIFICATES')
  }, [])

  return {
    t,
    user,
    handlenavigateToEditPage,
    followers,
    followings,
    goBack,
    isProfileIncomplete,
    navigateToSocial,
    pdfViewHandle,
    navigateFollowersFollowingsPage,
    handlePressSeeAll
  };
};
