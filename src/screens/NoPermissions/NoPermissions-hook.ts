import { useDispatch, } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { getPersonInfo } from '../../store/actions/profile-action';
import { useNavigation } from '@react-navigation/native';


export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const navigateBack = useCallback(() => {
    navigation.goBack()
  }, [])

  const cardPressHandle = useCallback(
    (id: number) => {
      dispatch(
        getPersonInfo(id, () => {
          //@ts-ignore
          navigation.navigate('USER_PROFILE');
        }),
      );
    }, []);

  return {
    t,
    navigateBack,
    cardPressHandle
  };
};
