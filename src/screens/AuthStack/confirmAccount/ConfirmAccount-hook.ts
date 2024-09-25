import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationParamList } from '../../../navigation/AuthNavigation';
import { IError, ILogin } from '../../../types/types';
import {
  setIsLogin,
  setSocialLogin,
} from '../../../store/actions/registration-action';
import { getProfileInfo } from '../../../store/actions/profile-action';
import { roleModeSelector } from '../../../store/selectors/registration-selector';
import { setError } from '../../../store/actions/administrative-action';

type Props = NativeStackScreenProps<NavigationParamList, 'CONFIRM_ACCOUNT'>;

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const roleMode = useSelector(roleModeSelector);
  const route = useRoute<Props['route']>();
  const { response } = route.params;
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const handleBack = () => {
    const newResponse = { ...response };
    if (roleMode && roleMode == 'coach') {
      newResponse.message = 'No email,no phone_number';
    } else {
      newResponse.message = 'No email';
    }
    navigation.navigate('ASSIGN_INFORMATION', { response: newResponse });
  };

  const selectCase = useCallback((response: any) => {
    switch (response.message) {
      case 'Success':
        dispatch(setIsLogin(false));
        dispatch(getProfileInfo());
        break;
      case 'No phone_number':
      case 'No email,no phone_number':
      case 'No email':
        navigation.navigate('ASSIGN_INFORMATION', { response });
        break;
      case 'Is it you?':
        navigation.navigate('CONFIRM_ACCOUNT', { response });
        break;
      default:
        const data: IError = {
          title: 'Something went wrong ...',
          text: response.message,
          buttonTitle: 'OK',
        };
        dispatch(setError(data));
        break;
    }
  }, []);

  const handleLogin = useCallback((data: ILogin) => {
    dispatch(
      setSocialLogin({ ...data, ...response }, (response: any) => {
        selectCase({ ...response, ...data });
      }),
    );
  }, []);
  const goForgetPasswordScreen = () => {
    navigation.navigate('FORGOT_PASSWORD')
  }

  return {
    setSecureTextEntry,
    secureTextEntry,
    t,
    handleBack,
    response,
    handleLogin,
    goForgetPasswordScreen
  };
};
