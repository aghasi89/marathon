import moment from 'moment';
import {
  FilterFacetsSubkeys,
  FilterFacetsSubkeysType,
  IFilterFacetsKeysType,
  IFilterResponse,
  ISelectedBuckets,
} from '../../../types/feedFilterTypes';
import { IFeedListItem } from '../../../types/types';
import feedApi from '../feedInstance';
import mainApi from '../mainInstance';

class Searchs {
  getSearchResults = async (payload: string): Promise<IFeedListItem[]> => {
    try {
      const res = await feedApi.get(`/feed_search/?search=${payload}/`);
      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  };
  getFilteredListByType = async (
    payload: string,
    page?: number,
    selectedFilters?: ISelectedBuckets,
  ): Promise<IFilterResponse | undefined> => {
    try {
      let nested_facet = `?nested_facet=feed_${payload}&page=${page ?? 1}`;
      let filters = '';
      for (const key in selectedFilters) {
        const filterList = selectedFilters[key as IFilterFacetsKeysType];
        if (filterList?.length) {
          if (key !== 'date' && key !== 'upcoming' && key !== 'finished') {
            filterList.forEach(el => {
              if (key !== 'calorie') {
                filters += `&${FilterFacetsSubkeys[key as FilterFacetsSubkeysType] ?? key
                  }_key=${el.key}`;
              } else {
                const [from, to] = el.key.split('-');
                filters += `&${FilterFacetsSubkeys[key as FilterFacetsSubkeysType] ?? key
                  }_key=${Number(from) + '-' + Number(to)}`;
              }
            });
          } else if (key === 'date') {
            filters += `&${key}_key=${moment(
              new Date(filterList[0].key),
            ).format('YYYY-MM-DD')}`;
          } else {
            filters += `&${key}_key=${moment(new Date()).format('YYYY-MM-DD')}`;
          }
        }
      }
      if (filters.length) {
        nested_facet += filters;
      }
      const { data }: { data: IFilterResponse } = await feedApi.get(
        `search/feed_${payload}/${nested_facet}`,
      );
      if (data) return data;
    } catch (error: any) {
      throw error.response.data;
    }
  };
  getFilters = async (
    payload: string,
  ): Promise<IFilterResponse | undefined> => {
    try {
      const { data }: { data: IFilterResponse } = await feedApi.get(
        `search/feed_${payload}/?nested_facet=feed_${payload}`,
      );
      if (data) return data;
    } catch (error: any) {
      throw error.response.data;
    }
  };
  getUsersFilteredListByType = async (
    page?: number,
    selectedFilters?: ISelectedBuckets,
  ): Promise<IFilterResponse | undefined> => {
    try {
      let nested_facet = `?nested_facet=coach&page=${page ?? 1}`;
      let filters = '';
      for (const key in selectedFilters) {
        const filterList = selectedFilters[key as IFilterFacetsKeysType];
        filterList?.forEach(el => {
          filters += `&${FilterFacetsSubkeys[key as FilterFacetsSubkeysType] ?? key
            }_key=${el.key}`;
        });
        nested_facet += filters;
      }
      const { data } = await mainApi.get(`search/coach_search/${nested_facet}`);
      return data;
    } catch (error: any) {
      throw error.response.data;
    }
  };
  getUserFilters = async (): Promise<IFilterResponse | undefined> => {
    try {
      const { data }: { data: IFilterResponse } = await mainApi.get(
        `search/coach_search/?nested_facet=coach`,
      );
      if (data) return data;
    } catch (error: any) {
      throw error.response.data;
    }
  };
  getUsersSearchResults = async (payload: string): Promise<IFeedListItem[]> => {
    try {
      const res = await mainApi.get(`/search/user_search/?search=${payload}`);
      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  };
  getRecomendedList = async (): Promise<IFeedListItem[]> => {
    try {
      const res = await feedApi.get(`/search/recommend/`);
      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  };
  getCoachesFilters = async (): Promise<IFeedListItem[]> => {
    try {
      const res = await mainApi.get(`get-filters/`);
      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  };
  getCoachesFiltersResults = async (
    page?: number,
    selectedFilters?: ISelectedBuckets,
  ): Promise<IFilterResponse | undefined> => {
    try {
      let nested_facet = `/filter-coach/?page=${page ?? 1}`;
      let filters = '';
      for (const key in selectedFilters) {
        const filterList = selectedFilters[key as IFilterFacetsKeysType];
        filterList?.forEach(el => {
          filters += `&${FilterFacetsSubkeys[key as FilterFacetsSubkeysType] ?? key
            }=${el.key}`;
        });
        nested_facet += filters;
      }
      const res = await mainApi.get(`${nested_facet}`);
      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  };
}

const searchs = new Searchs();
export default searchs;
