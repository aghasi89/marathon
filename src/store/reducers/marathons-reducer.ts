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
import {MarathonsTypes} from '../costants';

export interface IInputListDetails {
  id: string;
  value: string;
}
export interface IFilterMarathons {
  id: number;
  title: string;
}
export interface IList {
  id: number;
  title: string;
}

export interface IInviteGroup {
  id: number;
  name: string;
  users?: Array<IUser>;
  //images_url?: string[];
  listTags: Array<ITag>;
}

interface IInitialState {
  marathonsList: Array<IMarathons>;
  filterList: Array<IFilterMarathons>;
  marathonsSelectedFilterList: Array<IFilterMarathons>;
  tagList: Array<ITag>;
  categoryList: Array<ICategory>;
  languageList?: Array<ILanguageList>;
  cancellationPeriodList?: Array<ICancellationPeriodList>;
  marathonsDetail: IMarathons;
  clients: Array<IUser>;
  leads: Array<IUser>;
  groups: Array<IInviteGroup>;
  notifications: Array<INotification>;
  payments: Array<IPayment>;
}
export const initialState: IInitialState = {
  marathonsList: [],
  filterList: [
    {id: 0, title: 'Abs'},
    {id: 1, title: 'Quadriceps'},
    {id: 2, title: 'Chaest'},
    {id: 3, title: 'Back'},
    {id: 4, title: 'Calves'},
    {id: 5, title: 'Forearms'},
    {id: 6, title: 'Triceps'},
    {id: 7, title: 'Shoulders'},
  ],
  marathonsSelectedFilterList: [],
  tagList: [],
  categoryList: [],
  languageList: [
    {
      id: 1,
      title: 'Armenian',
      icon: 'https://image.shutterstock.com/image-vector/armenia-flag-round-bright-icon-260nw-1156861108.jpg',
      checked: false,
    },
    {
      id: 2,
      title: 'Russian',
      icon: 'https://ensp.network/wp-content/uploads/2022/03/flag-round-250-9.png',
      checked: false,
    },
    {
      id: 3,
      title: 'English',
      icon: 'https://thumbs.dreamstime.com/z/usa-flag-round-bright-icon-white-background-usa-flag-round-bright-icon-vector-illustration-123832772.jpg',
      checked: false,
    },
  ],
  cancellationPeriodList: [
    {
      value: '1',
      lable: '1 Day',
    },
    {
      value: '2',
      lable: '2 Days',
    },
    {
      value: '3',
      lable: '3 Days',
    },
    {
      value: '4',
      lable: '4 Days',
    },
    {
      value: '5',
      lable: '5 days',
    },
  ],
  marathonsDetail: {} as IMarathons,
  clients: [],
  leads: [],
  groups: [],
  notifications: [],
  payments: [],
};

const marathonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MarathonsTypes.SET_SELECTED_FILTER:
      return {
        ...state,
        marathonsSelectedFilterList: action.payload,
      };
    case MarathonsTypes.SET_GROUPS:
      return {
        ...state,
        marathonsList: action.payload,
      };
    case MarathonsTypes.SET_CATEGORIES:
      return {
        ...state,
        categoryList: action.payload,
      };
    case MarathonsTypes.SET_MARATHONGROUP_TAGS:
      return {
        ...state,
        tagList: action.payload,
      };
    case MarathonsTypes.SET_GROUP:
      return {
        ...state,
        marathonsDetail: action.payload,
      };
    case MarathonsTypes.SET_CLIENTS:
      return {...state, clients: action.payload};
    case MarathonsTypes.SET_LEADS:
      return {...state, leads: action.payload};
    case MarathonsTypes.SET_INVITE_GROUPS:
      return {...state, groups: action.payload};
    case MarathonsTypes.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case MarathonsTypes.SET_PAYMENTS:
      return {
        ...state,
        payments: action.payload,
      };
    default:
      return state;
  }
};
export default marathonsReducer;
