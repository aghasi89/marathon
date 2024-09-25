import { ISelectedBuckets, IStoreFacetsData } from '../../types/feedFilterTypes';
import { FeedListFilterTypes, IFeedItem, IFeedListItem, IRequestStatusType, IUser } from '../../types/types';
import { searchTypes } from '../costants';

export const getSearchResultsAction = (
  payload: string,
  selectedType: FeedListFilterTypes,
  cb?: (status: IRequestStatusType) => void,
) => {
  return {
    type: searchTypes.GET_SEARCH_RESULTS,
    payload,
    selectedType,
    cb,
  };
};
export const setSearchResultsAction = (payload: IFeedListItem[]) => {
  return {
    type: searchTypes.SET_SEARCH_RESULTS,
    payload,
  };
};
export const getFilteredListAction = (
  payload: FeedListFilterTypes,
  page?: number,
  selectedFilters?: ISelectedBuckets,
  cb?: (status: IRequestStatusType) => void,
) => {
  console.log("kkanchviiiiiiiiiiiiiiiiiiiiiiiii");

  return {
    type: searchTypes.GET_FILTERED_LIST,
    payload,
    page, selectedFilters,
    cb,
  };
};
export const setFilteredListAction = (
  payload: IFeedItem[],
  cb?: (status: IRequestStatusType) => void,
) => {
  return {
    type: searchTypes.SET_FILTERED_LIST,
    payload,
    cb,
  };
};
export const setFilteredListMoreItemsAction = (
  payload: IFeedItem[],
  cb?: (status: IRequestStatusType) => void,
) => {
  return {
    type: searchTypes.SET_FILTERED_LIST_MORE_ITEMS,
    payload,
    cb,
  };
};
export const getFilters = (payload: FeedListFilterTypes) => {
  return {
    type: searchTypes.GET_FILTERS,
    payload,
  };
};
export const setFilters = (payload: IStoreFacetsData[]) => {
  return {
    type: searchTypes.SET_FILTERS,
    payload
  };
};
export const setSelectedBuckets = (payload: ISelectedBuckets) => {
  return {
    type: searchTypes.SET_SELECTED_BUCKETS,
    payload
  };
};
export const setNextPageAction = (payload: boolean) => {
  return {
    type: searchTypes.SET_NEXT_PAGE,
    payload
  };
};
export const setFilteredUsersListAction = (
  payload: IUser[],
  cb?: (status: IRequestStatusType) => void,
) => {
  return {
    type: searchTypes.SET_FILTERED_USERS_LIST,
    payload,
    cb,
  };
};
export const setFilteredUsersListMoreItemsAction = (
  payload: IUser[],
  cb?: (status: IRequestStatusType) => void,
) => {
  return {
    type: searchTypes.SET_FILTERED_USERS_LIST_MORE_ITEMS,
    payload,
    cb,
  };
};
export const getRecomendedList = () => {
  return {
    type: searchTypes.GET_RECOMENDED_LIST,
  }
}
export const setRecomendedList = (payload: any) => {
  return {
    type: searchTypes.SET_RECOMENDED_LIST,
    payload
  }
}
export const getCoachesFilters = () => {
  return {
    type: searchTypes.GET_COACHES_FILTERS,
  }
}

export const getCoachesFiltersResultsAction = (
  page?: number,
  selectedFilters?: ISelectedBuckets,
  cb?: (status: IRequestStatusType) => void,
) => {
  return {
    type: searchTypes.GET_COACHES_FILTERED_LIST,
    page, selectedFilters,
    cb,
  };
};