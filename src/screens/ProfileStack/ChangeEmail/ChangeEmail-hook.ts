import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { changeEmail } from '../../../store/actions/profile-action';
import { MainNavigationParamList } from '../../../navigation/MainNavigation';

type Props = NativeStackScreenProps<MainNavigationParamList, 'CHANGE_EMAIL'>;

export default () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();

  const handleSave = useCallback((data: any) => {
    dispatch(changeEmail(data.email?.toLowerCase(), () => {
      handleBack()
    }))
  }, [])

  const handleBack = useCallback(() => {
    navigation.goBack()
  }, [])

  return {
    t,
    handleSave,
    handleBack
  };
};
