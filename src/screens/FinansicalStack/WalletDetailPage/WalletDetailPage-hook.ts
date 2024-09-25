import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationParamList } from '../../../navigation/FinansicalNavigation';
import { getWallet, setWallet } from '../../../store/actions/finansical-action';
import { walletSelector } from '../../../store/selectors/finansical-selector';

type Props = NativeStackScreenProps<NavigationParamList, 'WALLET_DETAIL_PAGE'>;

export default () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const { id } = route.params
  const wallet = useSelector(walletSelector)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(getWallet(id, () => {
      setLoading(false)
    }))
  }, [id])

  const goBack = () => {
    dispatch(setWallet(undefined))
    navigation.goBack()
  }

  const navigateEditPage = () => {
    //@ts-ignore
    navigation.navigate("EDIT_WALLET", {id: id})
  }

  return {
    t,
    loading,
    wallet,
    goBack,
    navigateEditPage
  };
};
