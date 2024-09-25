import {
  ICancellationPeriodList,
  ICategory,
  ILanguageList,
  IMarathons,
  INotification,
  IPayment,
  ITag,
  IUser,
} from '../../types/types';
import {IFilterMarathons, IInviteGroup} from '../reducers/marathons-reducer';

export const marathonsListSelector = (state: {
  marathonsReducer: {marathonsList: Array<IMarathons>};
}) => state.marathonsReducer.marathonsList;
export const filterListSelector = (state: {
  marathonsReducer: {filterList: Array<IFilterMarathons>};
}) => state.marathonsReducer.filterList;
export const marathonsSelectedFilterListSelector = (state: {
  marathonsReducer: {marathonsSelectedFilterList: Array<IFilterMarathons>};
}) => state.marathonsReducer.marathonsSelectedFilterList;
export const marathonsDetailSelector = (state: {
  marathonsReducer: {marathonsDetail: IMarathons};
}) => state.marathonsReducer.marathonsDetail;
export const categoryListSelector = (state: {
  marathonsReducer: {categoryList: Array<ICategory>};
}) => state.marathonsReducer.categoryList;
export const tagListSelector = (state: {
  marathonsReducer: {tagList: Array<ITag>};
}) => state.marathonsReducer.tagList;
export const languageListSelector = (state: {
  marathonsReducer: {languageList: Array<ILanguageList>};
}) => state.marathonsReducer.languageList;
export const cencelationPriodListSelector = (state: {
  marathonsReducer: {cancellationPeriodList: Array<ICancellationPeriodList>};
}) => state.marathonsReducer.cancellationPeriodList;
export const clientsSelector = (state: {
  marathonsReducer: {clients: Array<IUser>};
}) => state.marathonsReducer.clients;
export const leadsSelector = (state: {
  marathonsReducer: {leads: Array<IUser>};
}) => state.marathonsReducer.leads;
export const groupsSelector = (state: {
  marathonsReducer: {groups: Array<IInviteGroup>};
}) => state.marathonsReducer.groups;
export const notificationListSelector = (state: {
  marathonsReducer: {notifications: Array<INotification>};
}) => state.marathonsReducer.notifications;
export const paymentListSelector = (state: {
  marathonsReducer: {payments: Array<IPayment>};
}) => state.marathonsReducer.payments;
