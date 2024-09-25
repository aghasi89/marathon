import { useCallback } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { NavigationParamList } from '../../../navigation/AuthNavigation';
import { setSelectedRole } from '../../../store/actions/registration-action';

type Props = NativeStackScreenProps<NavigationParamList, 'SUCCESS_SCREEN'>;

export default () => {
  const { t } = useTranslation();
  const navigation = useNavigation<Props['navigation']>();
  const dispatch = useDispatch()

  const handlePress = useCallback((role_mode: string) => {
    dispatch(setSelectedRole(role_mode))
    navigation.navigate('REGISTER')
  }, []);

  const handleBack = () => {
    navigation.goBack()
  }

  return {
    handlePress,
    t,
    handleBack
  };
};
