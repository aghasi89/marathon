import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';
import { NavigationParamList } from '../../../navigation/AuthNavigation';
import { ILogin } from '../../../types/types';
import { setIsLogin, setSocialLogin } from '../../../store/actions/registration-action';
import { getProfileInfo } from '../../../store/actions/profile-action';

type Props = NativeStackScreenProps<NavigationParamList, 'ASSIGN_INFORMATION'>;

export default () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const phoneInput = useRef<PhoneInput>(null);
  const route = useRoute<Props['route']>()
  const { response } = route.params

  const handleBack = () => {
    navigation.navigate('LOGIN')
  }

  const selectCase = useCallback((response: any) => {
    switch (response.message) {
      case 'Success':
        dispatch(setIsLogin(false))
        dispatch(getProfileInfo())
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

  const handleConfirm = (data: ILogin) => {
    dispatch(setSocialLogin({ ...data, ...response }, (response: any) => {
      selectCase({ ...response, ...data })
    }))
  }

  return {
    t,
    handleBack,
    phoneInput,
    response,
    handleConfirm
  };
};
