import {IError, ILocation, IUploadImage} from '../../types/types';
import { ImageDirectoryType } from '../../utils/bunny.net';
import {AdministrativeTypes} from '../costants';

export const setError = (payload: IError | undefined) => {
  return {
    type: AdministrativeTypes.SET_ERROR,
    payload,
  };
};
export const setActiveChannel = (payload?: string) => {
  return {
    type: AdministrativeTypes.SET_ACTIVE_CHANNEL,
    payload,
  };
};
export const setLoadingAction = (payload: boolean) => {
  return {
    type: AdministrativeTypes.SET_LOADING,
    payload,
  };
};
export const setNavigationHistory = (payload: boolean) => {
  return {
    type: AdministrativeTypes.SET_LOADING,
    payload,
  };
};
export const setShowSelectedRegionPage = (payload: boolean) => {
  return {
    type: AdministrativeTypes.SET_SHOW_SELECTED_REGION_PAGE,
    payload,
  };
};
export const setShowSelectedLanguagePage = (payload: boolean) => {
  return {
    type: AdministrativeTypes.SET_SHOW_SELECTED_LANGUAGE_PAGE,
    payload,
  };
};
export const setCreateFeedModalVisibility = (payload: boolean) => {
  return {
    type: AdministrativeTypes.SET_CREATE_FEED_MODAL_VISIBILITY,
    payload,
  };
};
export const changeConnect = (payload: boolean | null) => {
  return {
    type: AdministrativeTypes.CHANGE_ISCONNECTED,
    payload,
  };
};
export const setFeedButtonClickCount = (payload: number) => {
  return {
    type: AdministrativeTypes.SET_FEED_BUTTON_CLICK_COUNT,
    payload,
  };
};
export const setPaymentData = (payload: any) => {
  return {
    type: AdministrativeTypes.SET_PAYMENT_DATA,
    payload,
  };
};
export const uploadImageToBunnyAction = (
  mediaList: IUploadImage[],
  imageDir:ImageDirectoryType,
  cb?: (public_key: string) => void,
) => {
  return {
    type: AdministrativeTypes.UPLOAD_IMAGE_TO_BUNNY,
    mediaList,
    imageDir,
    cb
  };
};
export const getLocationAction = (
  payload: string[]|string,
) => {
  return {
    type: AdministrativeTypes.GET_LOCATION,
    payload,
  };
};
export const setLocationAction = (
  payload: ILocation,
) => {
  return {
    type: AdministrativeTypes.SET_LOCATION,
    payload,
  };
};