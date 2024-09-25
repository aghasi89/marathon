import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createFeedStateSelector } from '../../../../../../store/selectors/create-feed-selector';
import {
  setDurationAction,
  setErrorMessageAction,
  setFeedPaymentTypeAction,
  setPackageTypeAction,
  setPriceAction,
  setSelectedCurrencyAction,
  setStartDateAction,
  setUsersCountAction,
  setWalletsLIstAction,
} from '../../../../../../store/actions/createFeed-action';
import { getFinances } from '../../../../../../store/actions/finansical-action';
import { MainNavigationParamList } from '../../../../../../navigation/MainNavigation';
import { IFeedMultiItem } from '../../../../../../types/types';

type Props = NativeStackScreenProps<MainNavigationParamList, 'CREATE_FEED'>;
export default () => {
  const navigation = useNavigation<Props['navigation']>();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector(createFeedStateSelector);
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [currencyModalVisibiliti, setCurrencyModalVisibiliti] =
    useState<boolean>(false);
  const [isUsersCountInputDisabled, setIsUsersCountInputDisabled] =
    useState<boolean>(true);
  const [isPriceInputDisabled, setIsPriceInputDisabled] =
    useState<boolean>(false);
  const usersCountSwitchOptions = [
    { label: t('individual'), value: 'individual' },
    { label: t('group'), value: 'group' },
  ];
  const priceSwitchOptions = [
    { label: t('paid'), value: 'paid' },
    { label: t('free'), value: 'free' },
  ];
  useEffect(() => {
    if (state.creator) {
      const unsubscribe = navigation.addListener('focus', getUserWallets);
      getUserWallets();
      return unsubscribe;
    }
  }, []);
  useEffect(() => {
    if (!!state.errorMessages?.currency?.length) {
      // setCurrencyModalVisibiliti(true);
    }
  }, [state]);

  const getUserWallets = useCallback(() => {
    dispatch(
      getFinances({ name: `user-wallet/` }, responsData => {
        dispatch(setWalletsLIstAction(responsData));
        const currency = responsData
          ? {
            ...responsData[0].currency_type,
            name: responsData[0].currency_type.code,
            wallet_id: responsData[0].id,
          }
          : undefined;
        currency && dispatch(setSelectedCurrencyAction(currency));
        setCurrencyModalVisibiliti(false);
      }),
    );
  }, []);
  const datePickerCancelHandle = useCallback(() => {
    setIsPickerOpen(false);
  }, []);
  const datePickerConfirmHandle = useCallback(
    (date: Date) => {
      dispatch(setStartDateAction(date));
      dispatch(setErrorMessageAction({ ...state.errorMessages, datetime: '' }));
      setIsPickerOpen(false);
    },
    [state],
  );
  const datePickerButtonPressHandle = useCallback(() => {
    setIsPickerOpen(true);
  }, []);
  const durationChangeHandle = useCallback(
    (duration: string) => {
      dispatch(setDurationAction(duration ? parseInt(duration) : undefined));
      if (parseInt(duration) > 0)
        dispatch(setErrorMessageAction({ ...state.errorMessages, duration: '' }));
    },
    [state],
  );
  const userCountChangeHandle = useCallback((count: string) => {
    dispatch(setUsersCountAction(parseInt(count)));
  }, []);
  const userCountSwitchHandle = useCallback(
    (type: string) => {
      if (type === 'individual') {
        dispatch(setUsersCountAction(1));
        dispatch(setPackageTypeAction(true));
        dispatch(
          setErrorMessageAction({ ...state.errorMessages, user_count: '' }),
        );
      } else {
        dispatch(setPackageTypeAction(false));
      }
    },
    [state],
  );
  const priceChangeHandle = useCallback((price: string) => {
    dispatch(setPriceAction(parseInt(price)));
  }, []);
  const pricetSwitchHandle = useCallback(
    (type: string) => {
      if (type === 'free') {
        dispatch(setPriceAction(0));
        dispatch(setFeedPaymentTypeAction(type));
        setIsPriceInputDisabled(true);
        dispatch(
          setErrorMessageAction({
            ...state.errorMessages,
            price: '',
            currency: '',
          }),
        );
      } else {
        dispatch(setFeedPaymentTypeAction('paid'));
        setIsPriceInputDisabled(false);
      }
    },
    [state],
  );
  const carrancyButtonPressHandle = useCallback(() => {
    setCurrencyModalVisibiliti(true);
  }, []);
  const currencyModalCloseHandle = useCallback(() => {
    setCurrencyModalVisibiliti(false);
  }, []);
  const currencySelectHandle = useCallback(
    (selected: IFeedMultiItem) => {
      if (selected.id !== -1) {
        if (!isPriceInputDisabled) {
          dispatch(setSelectedCurrencyAction(selected));
        }
      } else {
        navigation.navigate('CREATE_WALLET');
      }
      setCurrencyModalVisibiliti(false);
    },
    [state, isPriceInputDisabled],
  );

  const currencyList = useMemo(() => {
    let newCurrencyList: IFeedMultiItem[] | undefined = [];
    if (!!state?.userWalletsList?.length) {
      state?.userWalletsList?.map(el => {
        return newCurrencyList?.push({
          name: el.currency_type.code,
          id: el.currency_type.id,
          wallet_id: el.id,
        });
      });
    }
    newCurrencyList.push({
      name: t('createWallet') ?? '',
      id: -1,
    });
    return newCurrencyList;
  }, [state]);
  return {
    t,
    state,
    isPickerOpen,
    datePickerCancelHandle,
    datePickerConfirmHandle,
    datePickerButtonPressHandle,
    durationChangeHandle,
    usersCountSwitchOptions,
    userCountChangeHandle,
    userCountSwitchHandle,
    isUsersCountInputDisabled,
    priceSwitchOptions,
    priceChangeHandle,
    pricetSwitchHandle,
    isPriceInputDisabled,
    carrancyButtonPressHandle,
    currencyModalVisibiliti,
    currencyModalCloseHandle,
    currencySelectHandle,
    currencyList,
  };
};
