import React, { useMemo, useEffect, useState } from 'react';
import { ActivityIndicator, Modal as RNModal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { Chat, OverlayProvider } from 'stream-chat-react-native';
import { StreamChat } from 'stream-chat';
import Modal from 'react-native-modal';
import messaging from '@react-native-firebase/messaging';
import { useNetInfo } from '@react-native-community/netinfo';
import { SheetProvider } from 'react-native-actions-sheet';
import { getData } from '../utils/local_storage';
import {
  isLoginSelector,
  isNewnSelector,
} from '../store/selectors/registration-selector';
import AuthNavigation from '../navigation/AuthNavigation';
import i18n from '../locale/i18n';
import MainNavigationStack from '../navigation/MainNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ErrorMessageModal from '../components/errorMessageModal/ErrorMessageModal';
import {
  errorSelector,
  isConnenctedSelector,
  paymentDataSelector,
  showSelectedLanguageSelector,
  showSelectedRegionSelector,
} from '../store/selectors/administrative-selector';
import {
  changeConnect,
  setError,
  setPaymentData,
  setShowSelectedRegionPage,
} from '../store/actions/administrative-action';
import { setIsNew } from '../store/actions/registration-action';
import { chatApiKey } from '../services/chatConfig';
import { setMarathonApiAuthorizationHeader } from '../services/api/mainInstance';
import { setMarathonFinansicalApiAuthorizationHeader } from '../services/api/finansicalInstance';
import { profileSelector } from '../store/selectors/profile-selector';
import { setupClient } from '../utils/connectUser';
import { getProfileInfo } from '../store/actions/profile-action';
import { registerDevice } from '../utils/firebaseConfigs';
import UnreadMessageContext from './ChatStack/UnreadCountContext';
import { setMarathonApiFeedHeader } from '../services/api/feedInstance';
import SelectRegionScreen from './FirstScreensStack/SelectRegion/SelectRegion';
import SelectLanguageScreen from './FirstScreensStack/SelectLanguage/SelectLanguage';
import NoConnectionScreen from './NoConnection/NoConnection';
import Paymant from './FeedStack/Feed/Paymant/Paymant';
import { setMarathonNotificationsApiAuthorizationHeader } from '../services/api/notificationsInstance';
import FirstNavigation from '../navigation/FirstStackNavigation';

const Main: React.FC = () => {
  const isNew = useSelector(isNewnSelector);
  const error = useSelector(errorSelector);
  const paymentData = useSelector(paymentDataSelector);
  const isLogin = useSelector(isLoginSelector);
  const showSelectedRegion = useSelector(showSelectedRegionSelector);
  const showSelectedLanguage = useSelector(showSelectedLanguageSelector);
  const showNoConnection = useSelector(isConnenctedSelector);
  const { isConnected } = useNetInfo();
  const chatClient = StreamChat.getInstance(chatApiKey);
  const user = useSelector(profileSelector);
  const dispatch = useDispatch();
  const [unreadCount, setUnreadCount] = useState(0);

  const updateUnreadCount = (count: number) => {
    setUnreadCount(count);
  };
  const resetUnreadCount = () => {
    setUnreadCount(0);
  };
  useEffect(() => {
    dispatch(changeConnect(isConnected));
  }, [isConnected]);

  useEffect(() => {
    chatClient?.on(event => {
      if (event.total_unread_count !== undefined) {
        setUnreadCount(event.total_unread_count);
      }
    });
  }, [chatClient]);

  useEffect(() => {
    getData('selectedLanguage').then(language => {
      if (language) {
        i18n.changeLanguage(language.code?.toLowerCase());
      }
    });
  }, []);
  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
    }
  };
  useEffect(() => {
    if (user) {
      requestPermission()
        .then(async () => {
          await setupClient(user, updateUnreadCount);
          await registerDevice(dispatch, user);
        })
        .catch(error => {
          console.log('connection error', error);
        });
    }
  }, [user]);

  useEffect(() => {
    getData('isNew').then(isNew => {
      if (isNew) {
        dispatch(setIsNew('no'));
        dispatch(setShowSelectedRegionPage(false));
      } else {
        dispatch(setIsNew('yes'));
        dispatch(setShowSelectedRegionPage(true));
      }
    });
  }, [isNew]);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      setMarathonApiAuthorizationHeader(JSON.parse(accessToken));
      setMarathonApiFeedHeader(JSON.parse(accessToken));
      setMarathonFinansicalApiAuthorizationHeader(JSON.parse(accessToken));
      setMarathonNotificationsApiAuthorizationHeader(JSON.parse(accessToken))
      dispatch(getProfileInfo());
    }
  };
  const linkingConfig = {
    prefixes: ['marathon.me://'],
    config: {
      screens: {
        LoginScreen: 'login',
      },
    },
  };

  const main = useMemo(() => {
    if (showSelectedRegion) {
      return <FirstNavigation />
    } else if (isLogin) {
      return <AuthNavigation />
    } else {
      return <MainNavigationStack />
    }
  }, [isLogin, showSelectedRegion]);

  const errorMessage = useMemo(() => {
    return error ? (
      <ErrorMessageModal
        isVisible={true}
        title={error.title}
        text={error.text}
        buttonTitle={error.buttonTitle}
        onClose={() => {
          dispatch(setError(undefined));
        }}
      />
    ) : (
      <></>
    );
  }, [error]);

  const closePaymentModal = () => {
    dispatch(setPaymentData(undefined))
  }

  const paymentModal = useMemo(() => {
    return paymentData ? (
      <Modal
        testID={'modal'}
        style={{ margin: 0 }}
        isVisible={true}
        onSwipeComplete={closePaymentModal}
        onBackdropPress={closePaymentModal}
        backdropOpacity={0}
        backdropColor='rgba(0,0,0,0)'
        useNativeDriverForBackdrop>
        <Paymant
          data={paymentData}
          handleBack={closePaymentModal}
        />
      </Modal>
    ) : (
      <></>
    );
  }, [paymentData]);

  if (isNew == undefined)
    return <ActivityIndicator style={{ flex: 1 }} size={'large'} />;
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <OverlayProvider>
          <UnreadMessageContext.Provider
            value={{ unreadCount, resetUnreadCount }}>
            <Chat client={chatClient}>
              <NavigationContainer linking={linkingConfig}>
                <SheetProvider>
                  {main}
                  {paymentModal}
                </SheetProvider>
              </NavigationContainer>
            </Chat>
            {errorMessage}
          </UnreadMessageContext.Provider>
        </OverlayProvider>
      </GestureHandlerRootView>
      {/* <RNModal visible={showSelectedRegion}>
        <SelectRegionScreen />
      </RNModal> */}
      <RNModal visible={showSelectedLanguage}>
        <SelectLanguageScreen />
      </RNModal>
      <RNModal visible={!showNoConnection}>
        <NoConnectionScreen />
      </RNModal>
    </>
  );
};
export default Main;
