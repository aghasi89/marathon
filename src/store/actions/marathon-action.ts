import {ICategory, IMarathons, ITag, IUser} from '../../types/types';
import {IFilterMarathons} from '../reducers/marathons-reducer';
import {MarathonsTypes} from '../costants';

export const setSelectedFilterList = (payload: Array<IFilterMarathons>) => {
  return {
    type: MarathonsTypes.SET_SELECTED_FILTER,
    payload,
  };
};
export const setCategories = (payload: Array<ICategory>) => {
  return {
    type: MarathonsTypes.SET_CATEGORIES,
    payload,
  };
};
export const getMarathonGroupTags = () => {
  return {
    type: MarathonsTypes.GET_MARATHONGROUP_TAGS,
  };
};
export const setMarathonGroupTags = (payload: Array<ITag>) => {
  return {
    type: MarathonsTypes.SET_MARATHONGROUP_TAGS,
    payload,
  };
};
export const getCategories = () => {
  return {
    type: MarathonsTypes.GET_CATEGORIES,
  };
};
export const setGroups = (payload: Array<IMarathons>) => {
  return {
    type: MarathonsTypes.SET_GROUPS,
    payload,
  };
};
export const getGroups = () => {
  return {
    type: MarathonsTypes.GET_GROUPS,
  };
};
export const createGroup = (payload: IMarathons) => {
  return {
    type: MarathonsTypes.CREATE_GROUP,
    payload,
  };
};
export const deleteGroup = (payload: number) => {
  return {
    type: MarathonsTypes.DELETE_GROUP,
    payload,
  };
};
export const getGroupById = (payload: number) => {
  return {
    type: MarathonsTypes.GET_GROUP_BY_ID,
    payload,
  };
};
export const setGroup = (payload: IMarathons) => {
  return {
    type: MarathonsTypes.SET_GROUP,
    payload,
  };
};
export const changeGroup = (payload: {group: IMarathons; id: number}) => {
  return {
    type: MarathonsTypes.CHANGE_GROUP,
    payload,
  };
};
export const getClients = () => {
  return {
    type: MarathonsTypes.GET_CLIENTS,
  };
};
export const setClinets = (payload: Array<IUser>) => {
  return {
    type: MarathonsTypes.SET_CLIENTS,
    payload,
  };
};
export const getLeads = () => {
  return {
    type: MarathonsTypes.GET_LEADS,
  };
};
export const setLeads = payload => {
  return {
    type: MarathonsTypes.SET_LEADS,
    payload,
  };
};
export const getInviteGroups = () => {
  return {
    type: MarathonsTypes.GET_INVITE_GROUPS,
  };
};
export const setInviteGroups = payload => {
  return {
    type: MarathonsTypes.SET_INVITE_GROUPS,
    payload,
  };
};
export const getNotifications = () => {
  return {
    type: MarathonsTypes.GET_NOTIFICATIONS,
  };
};
export const setNotifications = payload => {
  return {
    type: MarathonsTypes.SET_NOTIFICATIONS,
    payload,
  };
};
export const getPayments = () => {
  return {
    type: MarathonsTypes.GET_PAYMENTS,
  };
};
export const setPayments = payload => {
  return {
    type: MarathonsTypes.SET_PAYMENTS,
    payload,
  };
};
