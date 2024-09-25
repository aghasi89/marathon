import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NavigationParamList } from '../../../navigation/AuthNavigation';
import { ILogin } from '../../../types/types';
import { resetPassword } from '../../../store/actions/profile-action';
import { tokenSelector } from '../../../store/selectors/registration-selector';
import { setIsLogin, setToken } from '../../../store/actions/registration-action';

type Props = NativeStackScreenProps<NavigationParamList, 'FORGOT_PASSWORD'>;

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const token = useSelector(tokenSelector)
  const navigation = useNavigation<Props['navigation']>();
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const onSend = useCallback((data: ILogin) => {
    const payload = {
      confirm_code: token,
      new_password: data.password,
      email: null
    }
    dispatch(resetPassword(payload, () => {
      navigation.navigate('LOGIN')
      dispatch(setToken(undefined))
    }))
  }, []);

  const handleBack = () => {
    dispatch(setIsLogin(false))
    dispatch(setToken(undefined))
  }

  return {
    onSend,
    t,
    handleBack,
    secureTextEntry,
    setSecureTextEntry
  };
};

