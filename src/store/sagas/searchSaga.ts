import { takeLatest, put, select } from 'redux-saga/effects';
import { searchTypes } from '../costants';
import {
  setFilteredListAction,
  setFilteredListMoreItemsAction,
  setFilteredUsersListAction,
  setFilteredUsersListMoreItemsAction,
  setFilters,
  setNextPageAction,
  setRecomendedList,
  setSearchResultsAction,
} from '../actions/search-action';
import {
  FeedListFilterTypes,
  ILocation,
  IRequestStatusType,
} from '../../types/types';
import searchs from '../../services/api/routes/search';
import {
  FilterFacetsSubkeys,
  FilterFacetsSubkeysType,
  FilterFieldNames,
  IFilterBuckets,
  IFilterFacetsKeysType,
  IFilterResponse,
  ISelectedBuckets,
  IStoreFacetsData,
} from '../../types/feedFilterTypes';
import { locationsListSelector } from '../selectors/administrative-selector';
import { getLocationAction } from '../actions/administrative-action';
import administratives from '../../services/api/routes/administrative';
import { GoogleConfigs } from '../../utils/googleConfigs';
import { getData } from '../../utils/local_storage';

function* search({
  payload,
  selectedType,
  cb,
}: {
  payload: string;
  selectedType: FeedListFilterTypes;
  cb?: (status: IRequestStatusType) => void;
}): Generator {
  try {
    let feedsList: any = [];
    let coachList: any = [];
    switch (selectedType) {
      case 'feed':
        feedsList = yield searchs.getSearchResults(payload);
        coachList = yield searchs.getUsersSearchResults(payload);
        yield put(
          setSearchResultsAction([...feedsList.results, ...coachList.results]),
        );
        cb && cb('success');
        break;
      case 'coaches':
        coachList = yield searchs.getUsersSearchResults(payload);
        yield put(setFilteredUsersListAction(coachList.results));
        cb && cb('success');
      default:
        break;
    }
  } catch (error) {
    cb && cb('reject');
    console.log('exxxxxxxx', error);
  }
}
function* filterListByType({
  payload,
  selectedFilters,
  page,
  cb,
}: {
  payload: FeedListFilterTypes;
  cb?: (status: IRequestStatusType) => void;
  page?: number;
  selectedFilters?: ISelectedBuckets;
}): Generator {
  try {
    if (payload !== 'coaches') {
      //@ts-ignore
      const res: IFilterResponse = yield searchs.getFilteredListByType(
        payload,
        page,
        selectedFilters,
      );
      if (res) {
        yield put(setNextPageAction(!!res.next));
        if (page && page === 1) {
          yield put(setFilteredListAction(res.results));
        } else {
          yield put(setFilteredListMoreItemsAction(res.results));
        }
        cb && cb('success');
      }
    } else {
      //@ts-ignore
      const res: any = yield searchs.getUsersFilteredListByType(
        page,
        selectedFilters,
      );
      if (res) {
        yield put(setNextPageAction(!!res.next));
        if (page && page === 1) {
          yield put(setFilteredUsersListAction(res.results));
        } else {
          yield put(setFilteredUsersListMoreItemsAction(res.results));
        }
        cb && cb('success');
      }
    }
  } catch (ex: any) {
    cb && cb('reject');
    console.log(ex, 'filteredListByType response');
  }
}
function* coachesFilterListByType({
  selectedFilters,
  page,
  cb,
}: {
  cb?: (status: IRequestStatusType) => void;
  page?: number;
  selectedFilters?: ISelectedBuckets;
}): Generator {
  try {
    //@ts-ignore
    const res: any = yield searchs.getCoachesFiltersResults(
      page,
      selectedFilters,
    );
    if (res) {
      yield put(setNextPageAction(!!res.next));
      if (page && page === 1) {
        yield put(setFilteredUsersListAction(res.results));
      } else {
        yield put(setFilteredUsersListMoreItemsAction(res.results));
      }
      cb && cb('success');
    }
  } catch (ex: any) {
    cb && cb('reject');
    console.log(ex, 'filteredListByType response');
  }
}
function dely(seconds: number) {
  return new Promise(r => setTimeout(r, seconds * 1000));
}
function* getFilters({ payload }: { payload: FeedListFilterTypes }): Generator {
  try {
    let res: any;
    if (payload !== 'coaches') {
      res = yield searchs.getFilters(payload);
    } else {
    }
    if (res) {
      const facetsList = res.facets;
      let newFacetsList: Array<IStoreFacetsData> = [];
      for (let key in facetsList) {
        const facet =
          facetsList[key as IFilterFacetsKeysType][
          FilterFacetsSubkeys[key as FilterFacetsSubkeysType]
          ] || facetsList[key as IFilterFacetsKeysType];
        let newBuckets: IFilterBuckets[] = [];
        if (key === 'location') {
          for (let index = 0; index < facet.buckets.length; index++) {
            const bucket: IFilterBuckets = facet.buckets[index];
            while (true) {
              //@ts-ignore
              const locationsList: ILocation[] | undefined = yield select(
                locationsListSelector,
              );
              const location = locationsList?.find(
                listItem => listItem.place_id === bucket.key,
              );
              if (!location) {
                // yield put(getLocationAction(bucket.key));
                // yield dely(0.1);
              } else {
                bucket.title = locationsList?.[index]?.formatted_address || '';
                break;
              }
            }
            newBuckets.push(bucket);
          }
        } else {
          newBuckets = facet.buckets.map((el: any) => ({ ...el, title: el.key }));
        }
        newFacetsList.push({
          name: FilterFieldNames[key as IFilterFacetsKeysType],
          buckets: newBuckets,
          key: key as IFilterFacetsKeysType,
          selected: [],
        });
      }
      yield put(setFilters(newFacetsList));
    }
  } catch (error) {
    console.log(error, 'filteredListByType response error');
  }
}
function* getRecomendedList(): Generator {
  try {
    const res: any = yield searchs.getRecomendedList()
    yield put(setRecomendedList(res.results))
  } catch (error) {
    console.log(error, 'error getRecomendedList');

  }
}
function* getCoachesFilters(): Generator {
  try {
    const res: any = yield searchs.getCoachesFilters()
    if (res) {
      const facetsList = res;
      let newFacetsList: Array<IStoreFacetsData> = [];
      for (let key in facetsList) {
        const facet =
          facetsList[key as IFilterFacetsKeysType][
          FilterFacetsSubkeys[key as FilterFacetsSubkeysType]
          ] || facetsList[key as IFilterFacetsKeysType];
        let newBuckets: IFilterBuckets[] = [];
        if (key === 'location') {
          const languageSelector: any = yield getData('selectedLanguage');
          let language: string;
          switch (languageSelector.code) {
            case 'UK':
              language = 'en';
              break;
            case 'AM':
              language = 'hy';
              break;
            default:
              language = languageSelector.code.toLowerCase();
              break;
          }
          for (let index = 0; index < facet.length; index++) {
            const bucket: IFilterBuckets = facet[index];
            const res: any = yield administratives.getLocation(
              bucket.key,
              GoogleConfigs.api_key,
              language,
            );
            bucket.title = res.results[0]?.formatted_address || '';
            newBuckets.push(bucket);
          }
        } else {
          newBuckets = facet.map((el: any) => ({ ...el, title: el.key }));
        }
        newFacetsList.push({
          name: FilterFieldNames[key as IFilterFacetsKeysType],
          buckets: newBuckets,
          key: key as IFilterFacetsKeysType,
          selected: [],
        });
      }
      yield put(setFilters(newFacetsList));
    }
  } catch (error) {
    console.log(error, 'error getRecomendedList');
  }
}

export function* watchSearchSaga() {
  yield takeLatest(searchTypes.GET_SEARCH_RESULTS as any, search);
  yield takeLatest(searchTypes.GET_FILTERED_LIST as any, filterListByType);
  yield takeLatest(searchTypes.GET_COACHES_FILTERED_LIST as any, coachesFilterListByType);
  yield takeLatest(searchTypes.GET_FILTERS as any, getFilters);
  yield takeLatest(searchTypes.GET_RECOMENDED_LIST as any, getRecomendedList);
  yield takeLatest(searchTypes.GET_COACHES_FILTERS as any, getCoachesFilters);
}
