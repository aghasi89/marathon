import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NavigationParamList } from '../../../navigation/AuthNavigation';
import { ILogin } from '../../../types/types';
import { setForgetPassword } from '../../../store/actions/registration-action';

type Props = NativeStackScreenProps<NavigationParamList, 'FORGOT_PASSWORD'>;

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const navigation = useNavigation<Props['navigation']>();

  const onSend = useCallback((data: string) => {
    dispatch(setForgetPassword(data, () => {
      navigation.navigate('SUCCESS_SCREEN', { email: data })
    }))
  }, []);

  const goSignUpScreen = () => {
    navigation.navigate('LOGIN')
  }

  const handleBack = () => {
    navigation.goBack()
  }

  return {
    onSend,
    t,
    goSignUpScreen,
    handleBack
  };
};
