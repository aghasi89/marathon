import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import { languages, setProfileInfo } from '../../store/actions/profile-action';
import { languagesSelector, profileSelector } from '../../store/selectors/profile-selector';
import AnalyticService from '../../utils/analytics/AnalyticService';
import { MainNavigationParamList } from '../../navigation/MainNavigation';
import { getData, storeData } from '../../utils/local_storage';
import { ILanguageItem } from '../../types/types';
import i18n from '../../locale/i18n';
import { momentLocale } from '../../utils/momentLanguage';
import { deleteFirebasePushToken } from '../../store/actions/registration-action';
import { chatClient } from '../../services/chatConfig';
import UnreadMessageContext from '../ChatStack/UnreadCountContext';

type Props = NativeStackScreenProps<MainNavigationParamList, 'SETTINGS'>;

export default () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const { resetUnreadCount } = useContext(UnreadMessageContext);

  const user = useSelector(profileSelector);
  const languagesList = useSelector(languagesSelector);
  const [selectedLanguage, setSelectedLanguage] = useState<ILanguageItem>();
  const [languageModalVisibility, setLanguageModalVisibility] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(languages())
    getData('selectedLanguage').then(language => {
      if (language) {
        setSelectedLanguage(language)
      }
    });
  }, [])

  const goBack = () => {
    navigation.goBack()
  }

  const handleSelectLanguage = (language: ILanguageItem) => {
    storeData('selectedLanguage', language)
    setSelectedLanguage(language)
    i18n.changeLanguage(language.code?.toLowerCase())
    setLanguageModalVisibility(false);
    language.code&&AnalyticService.languageChange(language.code.toLowerCase())
    momentLocale(language.code?.toLowerCase() ? language.code?.toLowerCase() : "uk")
  }

  const languageModalCloseHandle = useCallback(() => {
    setLanguageModalVisibility(false);
  }, []);

  const languageSelectButtonPressHandle = useCallback(() => {
    setLanguageModalVisibility(true);
  }, []);

  const deleteFirebaseToken = async () => {
    const token = await messaging().getToken();
    const payload = {
      token: token,
      user: user?.id ?? 0,
    };
    user && dispatch(deleteFirebasePushToken(payload));
  };

  const handleDeleteAccount = useCallback(() => {
    if (user) {
      dispatch(setProfileInfo(undefined));
      storeData('isNew', 'no');
      storeData('accessToken', undefined);
      //@ts-ignore
      navigation.navigate("FEED");
      // navigation.reset({ routes: [{ name: 'FEED_NAVIGATION_STACK' }] });
      resetUnreadCount();
      deleteFirebaseToken();
      chatClient.disconnectUser();
      AnalyticService.userLogout(user.id);
    }
  }, [user]);

  return {
    t,
    user,
    languagesList,
    goBack,
    selectedLanguage,
    handleSelectLanguage,
    languageModalVisibility,
    languageModalCloseHandle,
    languageSelectButtonPressHandle,
    showDeleteModal,
    setShowDeleteModal,
    handleDeleteAccount
  };
};
