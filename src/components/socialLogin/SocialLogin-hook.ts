import { useCallback, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin, NativeModuleError, statusCodes } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { useTranslation } from 'react-i18next';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { setIsLogin, setSocialLogin } from '../../store/actions/registration-action';
import { roleModeSelector } from '../../store/selectors/registration-selector';
import AnalyticService from '../../utils/analytics/AnalyticService';
import { NavigationParamList } from '../../navigation/AuthNavigation';
import { changeProfileInfo, getProfileInfo } from '../../store/actions/profile-action';
import { getData } from '../../utils/local_storage';

type Props = NativeStackScreenProps<NavigationParamList, 'LOGIN'>;

export default () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const roleMode = useSelector(roleModeSelector)

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
      iosClientId: '845710147677-6ft6rqtk4pv39k3s1sh4l7hn3suomoqu.apps.googleusercontent.com',
      webClientId: Platform.OS === 'ios' ? '845710147677-6ft6rqtk4pv39k3s1sh4l7hn3suomoqu.apps.googleusercontent.com' : '845710147677-3l8rqc1fev3bnqpq9p7napkcou8pds6k.apps.googleusercontent.com'
    });
  }, [])

  const selectCase = useCallback((response: any) => {
    switch (response.message) {
      case 'Success':
        dispatch(setIsLogin(false))
        dispatch(getProfileInfo((user) => {
          getData('selectedRegion').then(region => {
            if (region && user) {
              const payload = {
                ...user,
                "geolocation": region.name
              }
              dispatch(changeProfileInfo(user.id, payload, () => { }))
            }
          })
        }))
        break;
      case 'No phone_number':
      case 'No email,no phone_number':
      case 'No email':
        navigation.navigate('ASSIGN_INFORMATION', { response })
        break;
      case 'Is it you?':
        navigation.navigate('CONFIRM_ACCOUNT', { response })
        break;
    }
  }, [])

  const signInWithGoogle = async () => {
    GoogleSignin.signOut()
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const payload = {
        "token": idToken,
        "role": roleMode ? roleMode : "client",
        "social": "google"
      }
      dispatch(setSocialLogin(payload, (response: any) => {
        selectCase({ ...response, ...payload })
        AnalyticService.userLogin('google')
      }))
    } catch (error) {
      const typedError = error as NativeModuleError;
      switch (typedError.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          AnalyticService.errorTracking('google_login', 'cancelled')
          Alert.alert('cancelled');
          break;
        case statusCodes.IN_PROGRESS:
          Alert.alert('in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          AnalyticService.errorTracking('google_login', 'play services not available or outdated')
          Alert.alert('play services not available or outdated');
          break;
        default:
          AnalyticService.errorTracking('google ' + typedError.name, typedError.message)
          Alert.alert('Something went wrong', typedError.toString());
      }
    }
  };

  const signInWithFacebook = async () => {
    LoginManager.logOut()
    if (Platform.OS === "android") {
      LoginManager.setLoginBehavior('web_only')
    }
    await LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function (result) {
        if (result.isCancelled) {
          Alert.alert("Login cancelled");
          AnalyticService.errorTracking('facebook_login', 'cancelled')
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data: any) => {
              const payload = {
                "token": data.accessToken,
                "role": roleMode ? roleMode : "client",
                "social": "facebook"
              }
              dispatch(setSocialLogin(payload, (response: any) => {
                AnalyticService.userLogin('facebook')
                selectCase({ ...response, ...payload })
              }))
            }
          )
        }
      },
      function (error) {
        Alert.alert("Login fail with error: " + error);
        AnalyticService.errorTracking('Facebook_login', `${error}`)
      }
    );
  };

  useEffect(() => {
    // return appleAuth.onCredentialRevoked(async () => {
    //   console.warn('If this function executes, User Credentials have been Revoked');
    // });
  }, []);

  const signInWithApple = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
    if (credentialState === appleAuth.State.AUTHORIZED) {
      const payload = {
        "token": appleAuthRequestResponse.identityToken,
        "role": roleMode ? roleMode : "client",
        "social": "apple"
      }
      dispatch(setSocialLogin(payload, (response: any) => {
        selectCase({ ...response, ...payload })
        AnalyticService.userLogin('apple')
      }))
    }
  };

  return {
    signInWithGoogle,
    signInWithFacebook,
    signInWithApple,
    t
  };
};
