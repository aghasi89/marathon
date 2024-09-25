import { useCallback, useEffect, useState } from 'react';
import { Linking, Share } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  followersSelector,
  followingsSelector,
  personSelector,
  profileSelector,
} from '../../../store/selectors/profile-selector';
import AnalyticService from '../../../utils/analytics/AnalyticService';
import { IUserRoleType } from '../../../utils/analytics/analyticTypes';
import { NavigationParamList } from '../../../navigation/FeedNavigation';
import {
  followUser,
  getFollowers,
  getFollowings,
  setPersonInfo,
} from '../../../store/actions/profile-action';
import { setIsLogin } from '../../../store/actions/registration-action';
import { activeChannelIdSelector } from '../../../store/selectors/administrative-selector';
import { setActiveChannel } from '../../../store/actions/administrative-action';
import useSendMessage from '../../ChatStack/Chat/useSendMessage';
import keys from '../../../services/Keys';
import generateSharePath from '../../../utils/sharing/generateSharePath';
import { getData } from '../../../utils/local_storage';

type Props = NativeStackScreenProps<NavigationParamList, 'USER_PROFILE'>;

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { onPressToChat } = useSendMessage();
  const navigation = useNavigation<Props['navigation']>();
  const person = useSelector(personSelector);
  const user = useSelector(profileSelector);
  const followers = useSelector(followersSelector);
  const followings = useSelector(followingsSelector);
  const [actionSheetVisibility, setActionSheetVisibility] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedLang, setSelectedLang] = useState<string>("");
  const activeChannelId = useSelector(activeChannelIdSelector);

  const navigateToSocial = useCallback(
    async (type: string) => {
      if (type == 'facebook') {
        Linking.openURL(person?.facebook ?? '');
      } else if (type == 'linkedin') {
        Linking.openURL(person?.linkedin ?? '');
      } else {
        Linking.openURL(person?.instagram ?? '');
      }
    },
    [person],
  );

  const handleFollowUser = useCallback(() => {
    if (person && user) {
      var newPerson = { ...person };
      newPerson.am_i_follow = !newPerson.am_i_follow;
      setIsLoading(true);
      dispatch(
        followUser(person?.id, status => {
          if (status === 'success') {
            setIsLoading(false);
            dispatch(setPersonInfo(newPerson));
            sandFollowAnalytics(
              !!newPerson.am_i_follow,
              newPerson.id,
              newPerson.role_mode === 'coach' ? 'coach' : 'user',
            );
          }
        }),
      );
    } else {
      dispatch(setIsLogin(true));
    }
  }, [person]);

  useEffect(() => {
    if (person) {
      dispatch(getFollowers(person?.id));
      dispatch(getFollowings(person?.id));
      AnalyticService.viewUserProfile(person.id, person.role_mode === 'coach' ? 'coach' : 'user')
    }
  }, [person]);
  useEffect(() => {
    getData('selectedLanguage').then(language => {
      if (language) {
        setSelectedLang(language.code)
      }
    });
    return () => {
      dispatch(setActiveChannel(undefined));
    };
  }, []);

  const data = [
    {
      title: 'All',
    },
    {
      title: 'Recipes',
    },
    {
      title: 'Articles',
    },
    {
      title: 'Lives',
    },
    {
      title: 'Packages',
    },
  ];
  const sandFollowAnalytics = useCallback(
    (am_i_follow: boolean, userId: number, userRole: IUserRoleType) => {
      if (am_i_follow) AnalyticService.followUser(userId, userRole);
      else AnalyticService.unfollowUser(userId, userRole);
    },
    [],
  );
  const blockPressHandle = useCallback(() => {
    setActionSheetVisibility(false);
  }, []);

  const canclePressHandle = useCallback(() => {
    setActionSheetVisibility(false);
  }, []);

  const sharePressHandle = useCallback(() => {
    if (person?.user) {
      Share.share({
        title: "Share User Profile",
        url: generateSharePath({ type: "profile", lang: selectedLang, username: person.user.username }),
        message: generateSharePath({ type: "profile", lang: selectedLang, username: person.user.username }),
      });
      AnalyticService.shareFeed("profile", 'social_media');
    }
    setActionSheetVisibility(false);
  }, [person, selectedLang]);

  const actionSheetData = [
    {
      title: t('block'),
      onSelect: blockPressHandle,
    },
    {
      title: t('cancel'),
      onSelect: canclePressHandle,
    },
    {
      title: t('share'),
      onSelect: sharePressHandle,
    },
  ];

  const actionSheetCloseHandle = useCallback(() => {
    setActionSheetVisibility(false);
  }, []);

  const openActionSheet = useCallback(() => {
    if (user) {
      setActionSheetVisibility(true);
    } else {
      dispatch(setIsLogin(true));
    }
  }, []);

  const goBack = () => {
    activeChannelId
      ? //@ts-ignore
      navigation.navigate('CHANNEL', {
        channelId: activeChannelId,
      })
      : navigation.goBack();
  };
  const handlenavigateToEditPage = () => {
    navigation.navigate('EDIT_PROFILE');
  };
  const handleOpenChat = useCallback(() => {
    if (user) {
      person?.id && AnalyticService.clickMessageToCoach(person?.id)
      onPressToChat(person?.get_stream_id ? person?.get_stream_id.toString() : '');
    } else {
      dispatch(setIsLogin(true));
    }
  }, [user]);

  const pdfViewHandle = useCallback(async (url: string) => {
    await Linking.openURL(`${keys.API_URL}${url}`);
  }, []);

  const navigateFollowersFollowingsPage = useCallback((value: "followers" | "followings") => {
    if (person)
      navigation.navigate('FOLLOWERS_FOLLOWINGS', { activeTab: value, userId: person?.id })
  }, [person])

  return {
    t,
    person,
    navigateToSocial,
    data,
    handleFollowUser,
    followers,
    followings,
    actionSheetData,
    actionSheetVisibility,
    actionSheetCloseHandle,
    setActionSheetVisibility,
    openActionSheet,
    user,
    dispatch,
    goBack,
    isLoading,
    handlenavigateToEditPage,
    handleOpenChat,
    pdfViewHandle,
    navigateFollowersFollowingsPage
  };
};
