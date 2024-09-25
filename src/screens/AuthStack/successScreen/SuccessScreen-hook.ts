import { useCallback, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { NavigationParamList } from '../../../navigation/AuthNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogin } from '../../../store/actions/registration-action';
import { emailSelector } from '../../../store/selectors/registration-selector';

type Props = NativeStackScreenProps<NavigationParamList, 'SUCCESS_SCREEN'>;

export default () => {
  const { t } = useTranslation();
  const navigation = useNavigation<Props['navigation']>();
  const dispatch = useDispatch()
  const route = useRoute<Props['route']>();
  const emailVerify = useSelector(emailSelector);

  useEffect(() => {
    if(emailVerify) {
      navigation.navigate("REGISTER");
    }
  },[emailVerify]);

  const { email, type } = route.params

  const handleBack = () => {
    navigation.goBack()
  }

  const goSignInScreen = () => {
    dispatch(setIsLogin(false))
  }

  return {
    email,
    type,
    handleBack,
    t,
    goSignInScreen
  };
};
