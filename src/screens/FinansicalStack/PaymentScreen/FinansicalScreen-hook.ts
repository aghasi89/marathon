import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { SheetManager } from 'react-native-actions-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { NavigationParamList } from '../../../navigation/FinansicalNavigation';
import { getFinances, getStripeBalance, getStripePayouts, getStripeTransfers, setMyWallets, stripeDashboard } from '../../../store/actions/finansical-action';
import { myTransactionsSelector, myWalletsSelector, myWithdrawsSelector, stripeBalanceSelector, stripePayoutsSelector, stripeTransfersSelector } from '../../../store/selectors/finansical-selector';
import { ICurrency } from '../../../types/types';

type Props = NativeStackScreenProps<NavigationParamList, 'FINANSICAL'>;

type selectedTabType = {
  index?: number;
  name: string;
  type: string;
  params: {
    currency?: number,
    from_date?: string,
    to_date?: string
  }
};

export default () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const [loading, setLoading] = useState(true)
  const myTransactions = useSelector(myTransactionsSelector)
  const myWallets = useSelector(myWalletsSelector)
  const myWithdraws = useSelector(myWithdrawsSelector)
  const stripePayouts = useSelector(stripePayoutsSelector)
  const stripeTransfers = useSelector(stripeTransfersSelector)
  const stripeBalance = useSelector(stripeBalanceSelector)
  const [currencyActionSheetVisibility, setCurrencyActionSheetVisibility] = useState<boolean>(false);
  const [dateActionSheetVisibility, setDateActionSheetVisibility] = useState<boolean>(false);
  const [toDate, setToDate] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState<any>()
  const [isFromPickerOpen, setIsFromPickerOpen] = useState(false)
  const [isToPickerOpen, setIsToPickerOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedTab, setSelectedTab] = useState<selectedTabType>({
    name: 'user-wallet/',
    index: 0,
    type: 'user-wallet',
    params: {}
  });

  useEffect(() => {
    dispatch(
      getFinances(selectedTab, () => {
        setLoading(false);
      }),
    );
    if (selectedTab.params && selectedTab.params.currency == 3) {
      const walletId = myWallets?.filter(el => el.currency_type.id == 3)[0].id ?? 0
      if (selectedTab.type == 'withdraws') {
        dispatch(getStripePayouts(walletId))
      }
    }
    if (selectedTab.params && selectedTab.params.currency == 2) {
      const walletId = myWallets?.filter(el => el.currency_type.id == 2)[0].id ?? 0
      if (selectedTab.type == 'withdraws') {
        dispatch(getStripePayouts(walletId))
      }
    }
  }, [selectedTab]);

  useEffect(() => {
    if (myWallets?.filter(el => el.currency_type.id == 2)[0]) {
      dispatch(getStripeBalance(myWallets?.filter(el => el.currency_type.id == 2)[0].id))
    } else if (myWallets?.filter(el => el.currency_type.id == 3)[0]) {
      dispatch(getStripeBalance(myWallets?.filter(el => el.currency_type.id == 3)[0].id))
    }
  }, [myWallets])

  const data = [
    {
      title: t('wallets'),
    },
    {
      title: t('withdrawals'),
    },
    {
      title: t('transactions'),
    }
  ];

  const tabSelectHandle = useCallback((selected?: number) => {
    setLoading(true);
    setSelectedCurrency('')
    setFromDate('')
    setToDate('')
    switch (selected) {
      case 0:
        setSelectedTab({
          index: selected,
          name: 'user-wallet/',
          type: 'user-wallet',
          params: {}
        });
        break;
      case 1:
        setSelectedTab({
          index: selected,
          name: `withdraw/`,
          type: 'withdraws',
          params: {}
        });
        handleSelectCurrency({
          code: 'AMD',
          id: 1
        })
        break;
      case 2:
        setSelectedTab({
          index: selected,
          name: 'transactions/',
          type: 'transactions',
          params: {}
        });
        handleSelectCurrency({
          code: t('all'),
          id: 5
        })
        break;
      default:
        setSelectedTab({
          index: selected,
          name: 'user-wallet/',
          type: 'user-wallet',
          params: {}
        });
        break;
    }
  }, []);

  const dateActionSheetData = [
    {
      title: `1 ${t('day')}`,
      onSelect: () => { handleSelectDate(moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')) },
    },
    {
      title: `1 ${t('mounth')}`,
      onSelect: () => { handleSelectDate(moment().format('YYYY-MM-DD'), moment().add(-1, 'M').format('YYYY-MM-DD')) },
    },
    {
      title: `1 ${t('year')}`,
      onSelect: () => { handleSelectDate(moment().format('YYYY-MM-DD'), moment().add(-1, 'y').format('YYYY-MM-DD')) },
    },
    {
      title: t('custom'),
      onSelect: () => { handleSelectCustomDate() },
    }
  ]

  const [currencyActionSheetData, setCurrencyActionSheetData] = useState([
    {
      title: 'USD',
      index: 3,
      onSelect: () => {
        handleSelectCurrency(
          {
            code: 'USD',
            id: 3
          },
        )
      },
    },
    {
      title: 'EUR',
      index: 2,
      onSelect: () => {
        handleSelectCurrency({
          code: 'EUR',
          id: 2
        },
        )
      },
    },
    {
      title: 'RUB',
      index: 4,
      onSelect: () => {
        handleSelectCurrency({
          code: 'RUB',
          id: 4
        },)
      },
    },
    {
      title: 'AMD',
      index: 1,
      onSelect: () => {
        handleSelectCurrency({
          code: 'AMD',
          id: 1
        },)
      },
    },
  ])

  const handleSelectCurrency = useCallback((currency?: any) => {
    setSelectedTab(prevSelectedTab => {
      const newObj = { ...prevSelectedTab };
      if (currency.id !== 5) {
        newObj.params.currency = currency.id;
      } else {
        newObj.params = {}
      }
      setSelectedCurrency(currency);
      setLoading(true);
      return newObj;
    });
    currencyActionSheetCloseHandle();
  }, []);

  const handleSelectCustomDate = () => {
    setIsVisible(true)
    setFromDate('')
    setToDate('')
    dateActionSheetCloseHandle()
  }

  const handleSelectDate = useCallback((firstDate: string, endDate: string) => {
    let newObj = { ...selectedTab }
    newObj.params.from_date = endDate
    newObj.params.to_date = firstDate
    setFromDate(endDate)
    setToDate(firstDate)
    setLoading(true)
    setSelectedTab(newObj)
    dateActionSheetCloseHandle()
  }, [selectedTab])

  const dateActionSheetCloseHandle = useCallback(() => {
    setDateActionSheetVisibility(false);
  }, []);

  const currencyActionSheetCloseHandle = useCallback(() => {
    setCurrencyActionSheetVisibility(false);
  }, []);

  const openCurrenciesList = () => {
    setCurrencyActionSheetVisibility(true);
  }

  const openDatesList = () => {
    setDateActionSheetVisibility(true)
  }

  const handleApply = useCallback(() => {
    let newObj = { ...selectedTab }
    newObj.params.from_date = fromDate
    newObj.params.to_date = toDate
    setLoading(true)
    setSelectedTab(newObj)
    setIsVisible(false)
  }, [toDate, fromDate, selectedTab])

  const fromDatePickerCancelHandle = () => {
    setIsFromPickerOpen(false)
  }

  const fromDatePickerConfirmHandle = (date: Date) => {
    setFromDate(moment(date).format('YYYY-MM-DD'))
    setIsFromPickerOpen(false)
  }

  const toDatePickerCancelHandle = () => {
    setIsToPickerOpen(false)
  }

  const toDatePickerConfirmHandle = (date: Date) => {
    setToDate(moment(date).format('YYYY-MM-DD'))
    setIsToPickerOpen(false)
  }

  const openFromPicker = () => {
    setIsFromPickerOpen(true)
  }

  const openToPicker = () => {
    setIsToPickerOpen(true)
  }

  const handelCreateWallet = () => {
    //@ts-ignore
    navigation.navigate('CREATE_WALLET')
  }
  const handleGotToWithdrawls = useCallback((currency: ICurrency, type: string, id: number) => {
    setSelectedCurrency(currency)
    if (type == 'Stripe') {
      dispatch(stripeDashboard(id, (url) => {
        navigation.navigate('STRIPE_DASHBOARD', { url: url })
      }))
    } else {
      let newObj: selectedTabType = {
        params: {},
        index: 1,
        name: 'withdraw/',
        type: 'withdraws',
      }
      SheetManager.show('withdrawSheet', {
        payload: {
          currency: currency,
          onClose: () => {
            setLoading(true);
            setSelectedTab(newObj);
          }
        }
      })
    }
  }, [selectedTab])

  const handleGotToTransactions = (currency: ICurrency) => {
    setLoading(true);
    setSelectedCurrency(currency)
    let newObj = { ...selectedTab }
    newObj.params.currency = currency.id,
      newObj.index = 2,
      newObj.name = 'transactions/',
      newObj.type = 'transactions'
    setSelectedTab(newObj)
  }

  const goBack = () => {
    navigation.goBack()
  }

  useEffect(() => {
    if (myWallets) {
      const result = [];
      if (selectedTab.index != 1) {
        result.push({
          title: t('all'),
          index: 5,
          onSelect: () => {
            handleSelectCurrency({
              code: t('all'),
              id: 5
            })
          }
        })
      }
      for (let i = 0; i < currencyActionSheetData.length; i++) {
        for (let j = 0; j < myWallets.length; j++) {
          if (currencyActionSheetData[i].index == myWallets[j].currency_type.id) {
            result.push(currencyActionSheetData[i])
          }
        }
      }
      setCurrencyActionSheetData(result)
    }
  }, [myWallets, selectedTab])

  const navigateDetailPage = (id: number) => {
    navigation.navigate('WALLET_DETAIL_PAGE', { id })
  }

  const renderWallets = useMemo(() => {
    if (myWallets) {
      const arr = [...myWallets]
      if (stripeBalance) {        
        for (let i = 0; i < stripeBalance.available.length; i++) {
          for (let j = 0; j < myWallets.length; j++) {
            if (stripeBalance.available[i].currency.toLowerCase() == myWallets[j].currency_type.code.toLowerCase()) {
              // arr[j].wallet_sum = stripeBalance.pending[i].amount / 100
              arr[j].wallet_sum = stripeBalance.amount / 100
              arr[j].requested_withdraw_sum = stripeBalance.available[i].amount / 100
            }
          }
        }
      }
      return arr
    }
  }, [stripeBalance, myWallets])

  return {
    t,
    data,
    selectedTab,
    tabSelectHandle,
    myTransactions,
    myWithdraws,
    loading,
    currencyActionSheetVisibility,
    dateActionSheetVisibility,
    currencyActionSheetData,
    dateActionSheetData,
    dateActionSheetCloseHandle,
    currencyActionSheetCloseHandle,
    selectedCurrency,
    openCurrenciesList,
    openDatesList,
    isVisible,
    setIsVisible,
    handleApply,
    toDate,
    fromDate,
    isFromPickerOpen,
    fromDatePickerCancelHandle,
    fromDatePickerConfirmHandle,
    toDatePickerCancelHandle,
    toDatePickerConfirmHandle,
    openFromPicker,
    isToPickerOpen,
    openToPicker,
    handelCreateWallet,
    handleGotToWithdrawls,
    handleGotToTransactions,
    goBack,
    navigateDetailPage,
    stripePayouts,
    stripeTransfers,
    renderWallets
  };
};
