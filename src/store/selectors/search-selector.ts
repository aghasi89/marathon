import {  ISelectedBuckets, IStoreFacetsData } from "../../types/feedFilterTypes";
import { IFeedItem, IFeedListItem, IUser } from "../../types/types";

export const searchedFeedListSelector = (state: {
    searchReducer: {searchedFeedList: Array<IFeedListItem>};
  }) => state.searchReducer.searchedFeedList;
export const searchFilteredListSelector = (state: {
    searchReducer: {searchFilteredList: Array<IFeedItem>};
  }) => state.searchReducer.searchFilteredList;
export const searchFiltersSelector = (state: {
    searchReducer: {filtersList: IStoreFacetsData[]};
  }) => state.searchReducer.filtersList;
export const searchSelectedBucketsSelector = (state: {
    searchReducer: {selectedBuckets: ISelectedBuckets};
  }) => state.searchReducer.selectedBuckets;
export const searchNextPageSelector = (state: {
    searchReducer: {nextPage: boolean};
  }) => state.searchReducer.nextPage;
  export const searchFilteredUsersListSelector = (state: {
    searchReducer: {searchFilteredUsersList: Array<IUser>};
  }) => state.searchReducer.searchFilteredUsersList;
  export const searchRecomendedListSelector = (state: {
    searchReducer: {recomendedList: any};
  }) => state.searchReducer.recomendedList;