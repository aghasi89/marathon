import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/core';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Share} from 'react-native';
import {
  getGroupById,
  getNotifications,
  getPayments,
  setSelectedFilterList,
} from '../../../../store/actions/marathon-action';
import {
  marathonsDetailSelector,
  marathonsSelectedFilterListSelector,
  notificationListSelector,
  paymentListSelector,
} from '../../../../store/selectors/marathons-selector';
import {IFilter} from '../../../../types/types';

export default props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const marathonsDetail = useSelector(marathonsDetailSelector);
  const notificationList = useSelector(notificationListSelector);
  const paymentList = useSelector(paymentListSelector);
  const [sheetIndex, setSheetIndex] = useState<number>(0);
  const [indexTab, setIndexTab] = useState<number>(0);
  const [isFocus, setIsfocus] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>();
  const [isOpenCreateSheet, setIsOpenCreateSheet] = useState<boolean>(false);
  const [isOpenedEditSheet, setIsOpenedEditSheet] = useState<boolean>(false);
  const [isOpenInviteSheet, setIsOpenInviteSheet] = useState<boolean>(false);
  const [inputEmail, setInputEmail] = useState<string>('');

  const snapPoints = useMemo(() => ['60%', '100%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setSheetIndex(index);
  }, []);
  const leftIconPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const remote = marathonsDetail?.users?.filter(
    user => user?.isRemote ?? false,
  );
  const inPerson = marathonsDetail?.users?.filter(
    user => user?.isInPerson ?? false,
  );

  const badges = [
    {
      title: `All ${marathonsDetail.users?.length ?? 0}`,
    },
    {
      title: `Remote ${remote?.length ?? 0}`,
    },
    {
      title: `In Person ${inPerson?.length ?? 0}`,
    },
    {
      title: 'Invitation 1',
    },
  ];

  const chipsGroupItems = [
    {title: 'Invite User', id: 0, iconType: 'plus'},
    {title: 'Create User', id: 1, iconType: 'create'},
    {title: 'Share Invitation', id: 2, iconType: 'share'},
  ];

  const filterText = text => {
    setSearchText(text);
  };
  const onFocus = () => setIsfocus(true);
  const onBlur = () => setIsfocus(false);

  const badgesNotification = [
    {
      title: 'All 3',
    },
    {
      title: 'Unread',
    },
  ];
  const badgesPayment = [
    {
      title: 'Total income',
    },
  ];
  const navigateFilter = useCallback(() => {
    props.navigate('FilterMarathons');
  }, [navigation]);

  const selectedFilterListMarathon = useSelector(
    marathonsSelectedFilterListSelector,
  );
  const deleteItem = (value: IFilter) => {
    let index = selectedFilterListMarathon.findIndex(
      item => item.id === value.id,
    );
    let list = [...selectedFilterListMarathon];
    list.splice(index, 1);
    dispatch(setSelectedFilterList(list));
  };
  type elementTypes = {
    id?: number;
    title: string;
    iconType?: string;
  };
  const [element, setElement] = useState<elementTypes>();
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Share Invitation',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    switch (element?.id) {
      case 0:
        return props.navigate('Invite');
      case 1:
        return setIsOpenCreateSheet(true);
      case 2:
        return onShare();
      default:
        break;
    }
  }, [element]);

  const route = useRoute<any>();
  const id = route.params?.id ?? null;

  useEffect(() => {
    if (id) {
      dispatch(getGroupById(id));
      dispatch(getNotifications());
      dispatch(getPayments());
    }
  }, [id]);

  const totalPayment = useMemo(() => {
    let price = 0;
    paymentList.forEach(item => {
      price = price + +item.price;
    });
    return price;
  }, []);

  return {
    marathonsDetail,
    sheetIndex,
    setSheetIndex,
    isOpenedEditSheet,
    setIsOpenedEditSheet,
    snapPoints,
    handleSheetChanges,
    leftIconPress,
    indexTab,
    setIndexTab,
    isFocus,
    setIsfocus,
    onFocus,
    onBlur,
    searchText,
    setSearchText,
    filterText,
    badges,
    navigateFilter,
    chipsGroupItems,
    badgesNotification,
    selectedFilterListMarathon,
    deleteItem,
    badgesPayment,
    isOpenCreateSheet,
    setIsOpenCreateSheet,
    setElement,
    isOpenInviteSheet,
    setIsOpenInviteSheet,
    inputEmail,
    setInputEmail,
    remote,
    inPerson,
    notificationList,
    paymentList,
    totalPayment,
  };
};
