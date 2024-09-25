import { IReducer } from '../../types/types';

export const errorSelector = (state: IReducer) =>
  state.administrativeReducer.error;
export const activeChannelIdSelector = (state: IReducer) =>
  state.administrativeReducer.activeChannelId;
export const loadingSelector = (state: IReducer) =>
  state.administrativeReducer.loading;
export const showSelectedRegionSelector = (state: IReducer) =>
  state.administrativeReducer.showSelectedRegion;
export const showSelectedLanguageSelector = (state: IReducer) =>
  state.administrativeReducer.showSelectedLanguage;
export const createFeedModalVisibilitySelector = (state: IReducer) =>
  state.administrativeReducer.createFeedModalVisibility;
export const isConnenctedSelector = (state: IReducer) =>
  state.administrativeReducer.isConnencted;
export const feedButtonClickCount = (state: IReducer) =>
  state.administrativeReducer.clickedCount;
export const paymentDataSelector = (state: IReducer) =>
  state.administrativeReducer.paymentData;
export const locationsListSelector = (state: IReducer) =>
  state.administrativeReducer.locations;
