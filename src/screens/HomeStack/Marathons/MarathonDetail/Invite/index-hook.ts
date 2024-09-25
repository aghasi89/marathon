import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {useCallback, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeGroup,
  getClients,
  getGroupById,
  getInviteGroups,
  getLeads,
  setSelectedFilterList,
} from '../../../../../store/actions/marathon-action';
import {IInviteGroup} from '../../../../../store/reducers/marathons-reducer';
import {
  clientsSelector,
  groupsSelector,
  leadsSelector,
  marathonsDetailSelector,
  marathonsSelectedFilterListSelector,
} from '../../../../../store/selectors/marathons-selector';
import {IFilter, IUser} from '../../../../../types/types';
import indexReducer from './index-reducer';

export default props => {
  const {state, dispatchState} = indexReducer();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isFocus, setIsfocus] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>();
  const [index, setIndex] = useState<number>(0);
  const [isOpenedEditSheet, setIsOpenedEditSheet] = useState<boolean>(false);
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const clients = useSelector(clientsSelector);
  const leads = useSelector(leadsSelector);
  const groupList = useSelector(groupsSelector);

  useEffect(() => {
    dispatch(getClients());
    dispatch(getLeads());
    dispatch(getInviteGroups());
  }, []);

  const filterText = text => {
    setSearchText(text);
  };

  const onFocus = () => setIsfocus(true);
  const onBlur = () => setIsfocus(false);

  const navigateFilter = () => {
    props.navigate('FilterMarathons');
  };
  const leftIconPress = useCallback(() => {
    dispatch(getGroupById(marathonsDetail?.id));
    setIsVisibleModal(false);
    navigation.goBack();
  }, [navigation]);

  const [sheetIndex, setSheetIndex] = useState<number>(0);
  const snapPoints = useMemo(() => ['13%', '80%'], []);

  const marathonsDetail = useSelector(marathonsDetailSelector);
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
  const handleSheetChanges = useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

  const checkIsSubmitedClient = (id: number) => {
    let isSubmted = state.submitedClients.find(item => item.id == id);
    if (isSubmted) {
      return true;
    }
    return false;
  };

  const addClient = (client: IUser) => {
    if (!checkIsSubmitedClient(client.id)) {
      dispatchState({
        type: 'SET_ADD_CLIENT',
        payload: [...state.submitedClients, client],
      });
    } else {
      let array = [...state.submitedClients];
      const findIndex = array.findIndex(element => {
        return element.id == client.id;
      });
      array.splice(findIndex, 1);
      dispatchState({type: 'SET_ADD_CLIENT', payload: array});
    }
  };

  const checkIsSubmitedLead = (id: number) => {
    let isSubmted = state.submitedLeads.find(item => item.id == id);
    if (isSubmted) {
      return true;
    }
    return false;
  };
  const addLead = (lead: IUser) => {
    if (!checkIsSubmitedLead(lead.id)) {
      dispatchState({
        type: 'SET_ADD_LEAD',
        payload: [...state.submitedLeads, lead],
      });
    } else {
      let array = [...state.submitedLeads];
      const findIndex = array.findIndex(element => {
        return element.id == lead.id;
      });
      array.splice(findIndex, 1);
      dispatchState({type: 'SET_ADD_LEAD', payload: array});
    }
  };

  const checkIsSubmitedGroup = (id: number) => {
    let isSubmted = state.submitedGroups.find(
      (item: IInviteGroup) => item.id == id,
    );
    if (isSubmted) {
      return true;
    }
    return false;
  };

  const addGroup = (group: IInviteGroup) => {
    if (!checkIsSubmitedGroup(group.id)) {
      dispatchState({
        type: 'SET_ADD_GROUP',
        payload: [...state.submitedGroups, group],
      });
    } else {
      let array = [...state.submitedGroups];
      const findIndex = array.findIndex(element => {
        return element.id == group.id;
      });
      array.splice(findIndex, 1);
      dispatchState({type: 'SET_ADD_GROUP', payload: array});
    }
  };

  const addGroupMembers = (group: IInviteGroup) => {
    if (!checkIsSubmitedGroup(group.id)) {
      dispatchState({
        type: 'SET_ADD_GROUP_MEMBER',
        payload: [...state.submitedGroupMembers, ...(group?.users ?? [])],
      });
    } else {
      let array = [...state.submitedGroupMembers];
      const findIndex = array.findIndex(element => {
        return element.id == group.id;
      });
      array.splice(findIndex, group?.users?.length);
      dispatchState({type: 'SET_ADD_GROUP_MEMBER', payload: array});
    }
  };
  const checkIsSubmitedGroupMember = (id: number) => {
    let isSubmted = state.submitedGroupMembers.find(item => item.id == id);
    if (isSubmted) {
      return true;
    }
    return false;
  };
  const addGroupMember = (user: IUser) => {
    if (!checkIsSubmitedGroupMember(user.id)) {
      dispatchState({
        type: 'SET_ADD_GROUP_MEMBER',
        payload: [...state.submitedGroupMembers, user],
      });
    } else {
      let array = [...state.submitedGroupMembers];
      const findIndex = array.findIndex(element => {
        return element.id == user.id;
      });
      array.splice(findIndex, 1);
      dispatchState({type: 'SET_ADD_GROUP_MEMBER', payload: array});
    }
  };
  const [isGroup, setIsGroup] = useState<boolean>(true);
  const [selectedGroup, setSelectedGroup] = useState<IInviteGroup>();

  const setGroup = id => {
    const groupItem = groupList.find(group => group.id == id);
    setSelectedGroup(groupItem);
    setIsGroup(!isGroup);
  };

  const onInvite = () => {
    let invited = state.submitedClients.concat(
      state.submitedLeads,
      state.submitedGroupMembers,
    );
    dispatch(
      changeGroup({
        group: {
          ...marathonsDetail,
          users: [...(marathonsDetail?.users ?? []), ...invited],
        },
        id: marathonsDetail.id,
      }),
    );
    setIsVisibleModal(true);
  };

  return {
    isFocus,
    searchText,
    index,
    setIndex,
    filterText,
    deleteItem,
    onFocus,
    onBlur,
    navigateFilter,
    leftIconPress,
    marathonsDetail,
    checkIsSubmitedClient,
    addClient,
    state,
    sheetIndex,
    snapPoints,
    handleSheetChanges,
    checkIsSubmitedLead,
    addLead,
    groupList,
    checkIsSubmitedGroup,
    addGroup,
    addGroupMembers,
    checkIsSubmitedGroupMember,
    addGroupMember,
    isOpenedEditSheet,
    setIsOpenedEditSheet,
    isGroup,
    setIsGroup,
    selectedGroup,
    setSelectedGroup,
    setGroup,
    isVisibleModal,
    setIsVisibleModal,
    selectedFilterListMarathon,
    clients,
    leads,
    onInvite,
  };
};
