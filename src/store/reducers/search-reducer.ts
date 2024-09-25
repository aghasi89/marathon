import {ISelectedBuckets, IStoreFacetsData} from '../../types/feedFilterTypes';
import {IFeedItem, IFeedListItem, IUser} from '../../types/types';
import {searchTypes} from '../costants';

interface IInitialState {
  searchedFeedList?: IFeedListItem[] | undefined;
  searchFilteredList?: IFeedItem[] | undefined;
  filtersList?: IStoreFacetsData[] | undefined;
  selectedBuckets?: ISelectedBuckets | undefined;
  nextPage: boolean;
  searchFilteredUsersList?: IUser[] | undefined;
  recomendedList?: any;
}

export const initialState: IInitialState = {
  searchedFeedList: [],
  searchFilteredList: [],
  filtersList: [],
  selectedBuckets: undefined,
  nextPage: false,
  searchFilteredUsersList: [],
  recomendedList: [],
};

const searchReducer = (
  state = initialState,
  action: {type: string; payload: any | undefined},
) => {
  switch (action.type) {
    case searchTypes.SET_SEARCH_RESULTS:
      return {
        ...state,
        searchedFeedList: action.payload,
      };
    case searchTypes.SET_FILTERED_LIST:
      return {
        ...state,
        searchFilteredList: action.payload,
      };
    case searchTypes.SET_FILTERED_LIST_MORE_ITEMS:
      return {
        ...state,
        searchFilteredList: [
          ...(state.searchFilteredList || []),
          ...action.payload,
        ],
      };
    case searchTypes.SET_FILTERS:
      return {
        ...state,
        filtersList: action.payload,
      };
    case searchTypes.SET_SELECTED_BUCKETS:
      return {
        ...state,
        selectedBuckets: action.payload,
      };
    case searchTypes.SET_NEXT_PAGE:
      return {
        ...state,
        nextPage: action.payload,
      };
    case searchTypes.SET_FILTERED_USERS_LIST:
      return {
        ...state,
        searchFilteredUsersList: action.payload,
      };
    case searchTypes.SET_FILTERED_USERS_LIST_MORE_ITEMS:
      return {
        ...state,
        searchFilteredUsersList: [
          ...(state.searchFilteredUsersList || []),
          ...action.payload,
        ],
      };
    case searchTypes.SET_RECOMENDED_LIST:
      return {
        ...state,
        recomendedList: action.payload,
      };
    default:
      return state;
  }
};
export default searchReducer;
