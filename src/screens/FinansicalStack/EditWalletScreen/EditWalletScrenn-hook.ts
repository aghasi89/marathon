import {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  checkStripeKeyAction,
  createWallet,
  deleteStripeItemAction,
  editWallet,
  getCurrencyTypes,
  getFinances,
  getLastStripeAction,
  getStripeRedirectUrlAction,
  getWallet,
  getWithdrawMethods,
} from '../../../store/actions/finansical-action';
import {
  currencyTypesSelector,
  myWalletsSelector,
  walletSelector,
  withdrawMethodsSelector,
} from '../../../store/selectors/finansical-selector';
import {
  ICheckStripeResponseData,
  ICurrency,
  IWalletValues,
  IWithdrawMethod,
} from '../../../types/types';
import {paymentDataSelector} from '../../../store/selectors/administrative-selector';
import {profileSelector} from '../../../store/selectors/profile-selector';
import {setPaymentData} from '../../../store/actions/administrative-action';
import {MainNavigationParamList} from '../../../navigation/MainNavigation';
import {IValue} from '../CreateWalletScreen/components/AccountInformationStep/AccountInformationStep';

type Props = NativeStackScreenProps<MainNavigationParamList, 'EDIT_WALLET'>;

export default () => {
  const {t} = useTranslation();
  const route = useRoute<Props['route']>();
  const {id} = route.params;
  const navigation = useNavigation<Props['navigation']>();
  const dispatch = useDispatch();
  const user = useSelector(profileSelector);
  const wallet = useSelector(walletSelector);
  const withdrawMethods = useSelector(withdrawMethodsSelector);
  const paymentModalData = useSelector(paymentDataSelector);
  const [loader, setLoader] = useState(false);
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(3);
  const [selectedCurencyType, setSelectedCurencyType] = useState<number>();
  const [selectedWithdrawMethod, setSelectedWithdrawMethod] =
    useState<IWithdrawMethod>();
  const [stripeData, setStripeData] = useState<ICheckStripeResponseData>();
  const [initState, setInitState] = useState<IWalletValues[] | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      dispatch(
        getWallet(id, () => {
          setLoading(false);
        }),
      );
    }
  }, [id]);

  useEffect(() => {
    if (wallet?.currency_type.id) {
      setInitState(wallet.values);
      handleSelectWithdraw(wallet.withdraw_method);
      setSelectedCurencyType(wallet?.currency_type.id);
      setLoader(true);
      dispatch(
        getWithdrawMethods(wallet?.currency_type.id, () => {
          setLoader(false);
        }),
      );
    }
  }, [wallet]);

  const staticData = {
    wallet: {
      headerTitle: '',
      steps: [
        t('selectCurrency'),
        t('paymentMethods'),
        t('accountInformation'),
      ],
    },
  };

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    !paymentModalData &&
      selectedCurencyType &&
      dispatch(
        getLastStripeAction(selectedCurencyType, (status, data) => {
          if (status === 'success') {
            setStripeData(data);
          }
        }),
      );
  }, [paymentModalData]);

  const handleSelectWithdraw = useCallback((elem: IWithdrawMethod) => {
    setSelectedWithdrawMethod(elem);
    if (elem.dynamic_fields[0].key === 'stripe' && user) {
      dispatch(
        checkStripeKeyAction(user?.id, (status, data) => {
          if (status === 'success') {
            if (!!data.length) {
              setStripeData(data[data.length - 1]);
            }
          }
        }),
      );
    }
  }, []);

  const moveThirdStep = useCallback(() => {
    setSelectedStepIndex(3);
  }, []);

  const handleBackStep = useCallback(() => {
    setSelectedStepIndex(selectedStepIndex - 1);
    setInitState(undefined);
  }, [selectedStepIndex]);

  const hanldeSave = useCallback(
    (values: IValue[]) => {
      if (user && wallet?.id) {
        const payload = {
          user: user.id,
          currency_type: selectedCurencyType,
          withdraw_method: selectedWithdrawMethod?.id,
          meta: 'aaaaa',
          is_active: true,
          values: values,
        };
        setLoading(true);
        dispatch(
          editWallet(payload, wallet.id, () => {
            dispatch(
              getWallet(id, () => {
                handleBack();
                setLoading(false);
              }),
            );
            dispatch(
              getFinances(
                {
                  name: 'user-wallet/',
                  index: 0,
                  type: 'user-wallet',
                  params: {},
                },
                () => {
                  setLoading(false);
                },
              ),
            );
          }),
        );
      }
    },
    [selectedCurencyType, selectedWithdrawMethod, user, wallet],
  );

  const handleConnectToStripe = useCallback(() => {
    if (selectedCurencyType) {
      setLoading(true);
      dispatch(
        getStripeRedirectUrlAction(
          selectedCurencyType,
          (status, redirect_url) => {
            if (status === 'success') {
              setStripeData(undefined);
              const data = {
                id: 0,
                type: 'converse',
                url: redirect_url,
                hideHeader: true,
              };
              dispatch(setPaymentData(data));
              setLoading(false);
            }
          },
        ),
      );
    }
  }, [selectedCurencyType]);
  const handleDeleteStripe = useCallback(() => {
    stripeData?.id &&
      dispatch(
        deleteStripeItemAction(stripeData?.id, status => {
          if (status === 'success') {
            setStripeData(undefined);
          }
        }),
      );
  }, [stripeData?.id]);
  return {
    t,
    handleBack,
    staticData,
    selectedStepIndex,
    loader,
    withdrawMethods,
    handleSelectWithdraw,
    selectedWithdrawMethod,
    moveThirdStep,
    handleBackStep,
    hanldeSave,
    stripeData,
    handleConnectToStripe,
    loading,
    handleDeleteStripe,
    initState,
  };
};
