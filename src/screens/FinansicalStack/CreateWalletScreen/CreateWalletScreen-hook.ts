import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getCountry } from "react-native-localize";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { checkStripeKeyAction, createWallet, deleteStripeItemAction, getCurrencyTypes, getFinances, getLastStripeAction, getStripeRedirectUrlAction, getWithdrawMethods } from '../../../store/actions/finansical-action';
import { currencyTypesSelector, myWalletsSelector, withdrawMethodsSelector } from '../../../store/selectors/finansical-selector';
import { ICheckStripeResponseData, ICurrency, IRegion, IWithdrawMethod } from '../../../types/types';
import { paymentDataSelector } from '../../../store/selectors/administrative-selector';
import { profileSelector, regionsSelector } from '../../../store/selectors/profile-selector';
import { setPaymentData } from '../../../store/actions/administrative-action';
import { getRegions } from '../../../store/actions/profile-action';
import { getData } from '../../../utils/local_storage';
import { MainNavigationParamList } from '../../../navigation/MainNavigation';
import { IValue } from './components/AccountInformationStep/AccountInformationStep';

type Props = NativeStackScreenProps<MainNavigationParamList, 'CREATE_WALLET'>;

export default () => {

  const { t } = useTranslation();
  const navigation = useNavigation<Props['navigation']>();
  const dispatch = useDispatch()
  const user = useSelector(profileSelector)
  const finances = useSelector(myWalletsSelector)
  const currencyTypes = useSelector(currencyTypesSelector)
  const withdrawMethods = useSelector(withdrawMethodsSelector)
  const paymentModalData = useSelector(paymentDataSelector);
  const regionsList = useSelector(regionsSelector)
  const [loader, setLoader] = useState(false)
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(1);
  const [selectedCurencyType, setSelectedCurencyType] = useState<number>()
  const [selectedWithdrawMethod, setSelectedWithdrawMethod] = useState<IWithdrawMethod>()
  const [stripeData, setStripeData] = useState<ICheckStripeResponseData>()
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedRegion, setSelectedRegion] = useState<IRegion | undefined>(undefined)

  const staticData = {
    wallet: {
      headerTitle: '',
      steps: [t('selectCurrency'), t('paymentMethods'), t('accountInformation')],
    }
  };

  const handleBack = () => {
    navigation.goBack()
  };

  useEffect(() => {
    dispatch(getRegions())
  }, [])

  useEffect(() => {
    getData('selectedRegion').then(region => {
      if (region) {
        setSelectedRegion(region)
      } else {
        if (regionsList) {
          if (getCountry() && regionsList?.filter((item) => item.name == getCountry()).length > 0) {
            return setSelectedRegion(regionsList?.filter((item) => item.name == getCountry())[0])
          } else {
            return setSelectedRegion(regionsList?.filter(el => el.id == 1)[0])
          }
        }
      }
    });
  }, [regionsList, getCountry])

  useEffect(() => {
    setLoader(true)
    dispatch(getCurrencyTypes(() => {
      setLoader(false)
    }))
  }, [navigation])

  useEffect(() => {
    !paymentModalData && selectedCurencyType && dispatch(getLastStripeAction(selectedCurencyType, (status, data) => {
      if (status === 'success') {
        setStripeData(data)
      }
    }))
  }, [paymentModalData])

  const moveSecondStep = useCallback((id: number | undefined, region: IRegion | undefined) => {
    if (id && region) {
      setLoader(true)
      const payload = {
        region: region?.name
      }
      console.log(id,region.name);
      
      dispatch(getWithdrawMethods(id, payload, () => {
        setSelectedStepIndex(2)
        setLoader(false)
      }))
    }
  }, [selectedCurencyType])

  const changeRegion = useCallback((region: IRegion) => {
    setSelectedRegion(region)
    moveSecondStep(selectedCurencyType, region)
  }, [selectedCurencyType, selectedRegion])

  const handleSelectCurrency = useCallback((id: number) => {
    setSelectedCurencyType(id)
    moveSecondStep(id, selectedRegion)
  }, [selectedRegion])

  const handleSelectWithdraw = useCallback((elem: IWithdrawMethod) => {
    setSelectedWithdrawMethod(elem)
    if (elem.dynamic_fields[0].key === 'stripe' && user) {
      dispatch(checkStripeKeyAction(user?.id, (status, data) => {
        if (status === 'success') {
          if (!!data.length) {
            setStripeData(data[data.length - 1])
          }
        }
      }))
    }

  }, [])

  const moveThirdStep = useCallback(() => {
    setSelectedStepIndex(3)
  }, [])

  const handleBackStep = useCallback(() => {
    setSelectedStepIndex(selectedStepIndex - 1)
  }, [selectedStepIndex])

  const hanldeSave = useCallback((values: IValue[]) => {
    if (user) {
      const payload = {
        "user": user.id,
        "currency_type": selectedCurencyType,
        "withdraw_method": selectedWithdrawMethod?.id,
        "meta": "aaaaa",
        "is_active": true,
        "values": values
      }
      setLoader(true)
      dispatch(createWallet(payload, () => {
        dispatch(
          getFinances({
            name: 'user-wallet/',
            index: 0,
            type: 'user-wallet',
            params: {}
          }, () => {
            handleBack()
            setLoader(false)
          }),
        );
      }))
    }

  }, [selectedCurencyType, selectedWithdrawMethod, user])

  const getDifference = (array1: ICurrency[], array2: any[] = []) => {
    return array1.filter(object1 => {
      return !array2.some(object2 => {
        return object1.id === object2.currency_type.id;
      });
    });
  }
  const handleConnectToStripe = useCallback(() => {
    if (selectedCurencyType) {
      setLoading(true)
      dispatch(getStripeRedirectUrlAction(selectedCurencyType, (status, redirect_url) => {
        if (status === 'success') {
          setStripeData(undefined)
          const data = {
            id: 0,
            type: 'converse',
            url: redirect_url,
            hideHeader: true
          }
          dispatch(setPaymentData(data))
          setLoading(false)
        }
      }))
    }
  }, [selectedCurencyType])
  const handleDeleteStripe = useCallback(() => {
    stripeData?.id && dispatch(deleteStripeItemAction(stripeData?.id, (status) => {
      console.log(status);
      if (status === 'success') {
        setStripeData(undefined)
      }
    }))
  }, [stripeData?.id])
  return {
    t,
    handleBack,
    staticData,
    selectedStepIndex,
    loader,
    currencyTypes,
    handleSelectCurrency,
    moveSecondStep,
    selectedCurencyType,
    withdrawMethods,
    handleSelectWithdraw,
    selectedWithdrawMethod,
    moveThirdStep,
    handleBackStep,
    hanldeSave,
    finances,
    getDifference,
    stripeData,
    handleConnectToStripe,
    loading,
    handleDeleteStripe,
    selectedRegion,
    regionsList,
    changeRegion
  };
};
