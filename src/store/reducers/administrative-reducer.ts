import { IError, ILocation } from '../../types/types';
import { AdministrativeTypes } from '../costants';

export interface IAdministrative {
  error: undefined | IError,
  activeChannelId: string | undefined
  loading?: boolean,
  showSelectedRegion: boolean,
  showSelectedLanguage: boolean,
  createFeedModalVisibility?: boolean,
  isConnencted: boolean;
  clickedCount: number;
  paymentData: undefined | any
  locations:Array<ILocation> | undefined
}

export const initialState: IAdministrative = {
  error: undefined,
  activeChannelId: undefined,
  loading: false,
  showSelectedRegion: false,
  showSelectedLanguage: false,
  createFeedModalVisibility: false,
  isConnencted: true,
  clickedCount: 0,
  paymentData: undefined,
  locations:[]
};

const administrativeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case AdministrativeTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case AdministrativeTypes.SET_PAYMENT_DATA:
      return {
        ...state,
        paymentData: action.payload,
      };
    case AdministrativeTypes.SET_ACTIVE_CHANNEL:
      return {
        ...state,
        activeChannelId: action.payload,
      };
    case AdministrativeTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case AdministrativeTypes.SET_SHOW_SELECTED_REGION_PAGE:
      return {
        ...state,
        showSelectedRegion: action.payload,
      };
    case AdministrativeTypes.SET_SHOW_SELECTED_LANGUAGE_PAGE:
      return {
        ...state,
        showSelectedLanguage: action.payload,
      };
    case AdministrativeTypes.SET_CREATE_FEED_MODAL_VISIBILITY:
      return {
        ...state,
        createFeedModalVisibility: action.payload,
      };
    case AdministrativeTypes.CHANGE_ISCONNECTED:
      return {
        ...state,
        isConnencted: action.payload,
      };
    case AdministrativeTypes.SET_FEED_BUTTON_CLICK_COUNT:
      return {
        ...state,
        clickedCount: action.payload,
      };
    case AdministrativeTypes.SET_FEED_BUTTON_CLICK_COUNT:
      return {
        ...state,
        clickedCount: action.payload,
      };
    case AdministrativeTypes.SET_LOCATION:
      return {
        ...state,
        locations: [...(state.locations||[]),...action.payload],
      };
    default:
      return state;
  }
};
export default administrativeReducer;
