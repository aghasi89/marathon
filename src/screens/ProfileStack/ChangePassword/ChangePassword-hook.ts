import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { changePassword, getProfileInfo, setPassword } from '../../../store/actions/profile-action';
import { MainNavigationParamList } from '../../../navigation/MainNavigation';

type Props = NativeStackScreenProps<MainNavigationParamList, 'CHANGE_PASSWORD'>;

export default () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const { params } = useRoute<Props['route']>()
  const [secureTextEntryOldPassword, setSecureTextEntryOldPassword] = useState<boolean>(true);
  const [secureTextEntryNewPassword, setSecureTextEntryNewPassword] = useState<boolean>(true);

  const handleSave = useCallback((data: any) => {
    if (params?.type == 'change') {
      const payload = {
        "old_password": data.oldPassword,
        "new_password": data.newPassword
      }
      dispatch(changePassword(payload, () => {
        handleBack()
      }))
    } else {
      const payload = {
        "password": data.oldPassword,
      }
      dispatch(setPassword(payload, () => {
        dispatch(getProfileInfo())
        handleBack()
      }))
    }
  }, [params])

  const handleBack = useCallback(() => {
    navigation.goBack()
  }, [])

  return {
    t,
    handleSave,
    handleBack,
    secureTextEntryOldPassword,
    setSecureTextEntryOldPassword,
    secureTextEntryNewPassword,
    setSecureTextEntryNewPassword,
    params
  };
};
