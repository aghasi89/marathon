import {IFeedItem, IMyCreationsCardData} from './types';

export interface IFeedListSortedByTypes {
  title: string;
  feed: any;
}
export interface IFilterResponse {
  facets: IFilterServerFacets;
  results: any[];
  next?: string | null;
}
export interface IFilterServerFacets extends _KEY_FILTER_FACETS {
  feed_category?: IFilterFacetsCategory;
  language?: IFilterFacetsLanguage;
  equipments?: IFilterEquipmentsFacets;
  region?: IFilterFacetsRegion;
}
export type IFilterFacetsKeysType =
  | 'feed_category'
  | 'language'
  | 'equipments'
  | 'calorie'
  | 'date'
  | 'duration'
  | 'finished'
  | 'upcoming'
  | 'level'
  | 'region'
  | 'speciality'
  | 'gender'
  | 'location';
type _FacetsKeyTypes =
  | 'calorie'
  | 'date'
  | 'duration'
  | 'finished'
  | 'upcoming'
  | 'level';
type _GLOBAL_FACETS_DATA = {
  doc_count?: number;
};
type _KEY_FILTER_FACETS = {
  [name in _FacetsKeyTypes]?: IFilterFacetsData;
};
export interface IStoreFacetsData {
  name?: string;
  buckets?: Array<IFilterBuckets>;
  key?: IFilterFacetsKeysType;
  selected?: Array<string>;
}
interface IFilterFacetsCategory extends _GLOBAL_FACETS_DATA {
  category: IFilterFacetsData;
}
interface IFilterFacetsLanguage extends _GLOBAL_FACETS_DATA {
  language: IFilterFacetsData;
}
interface IFilterEquipmentsFacets extends _GLOBAL_FACETS_DATA {
  equipments: IFilterFacetsData;
}
interface IFilterFacetsRegion extends _GLOBAL_FACETS_DATA {
  region: IFilterFacetsData;
}
interface IFilterFacetsData {
  doc_count_error_upper_bound?: number;
  sum_other_doc_count?: number;
  buckets: Array<IFilterBuckets>;
}
export interface IFilterBuckets {
  title:string;
  key: string;
  doc_count: number;
  isSelected?: boolean;
}
export enum FilterFieldNames {
  feed_category = 'categories',
  language = 'languages',
  equipments = 'equipments',
  calorie = 'calories',
  date = 'date',
  duration = 'duration',
  finished = 'finished',
  upcoming = 'upcoming',
  level = 'level',
  region = 'region',
  speciality = 'speciality',
  gender = 'gender',
  location = 'location',
}
export enum FilterFacetsSubkeys {
  feed_category = 'category',
  language = 'language',
  equipments = 'equipments',
  duration = 'duration',
  region = 'region',
  speciality = 'speciality',
  gender = 'gender',
}
export type FilterFacetsSubkeysType =
  | 'feed_category'
  | 'language'
  | 'equipments'
  | 'region'
  | 'duration';
export type ISelectedBuckets = {
  [name in IFilterFacetsKeysType]?: ISelectedBucket[];
};
export interface ISelectedBucket{
  title:string,
  key:string,
}
export  enum FilterGenderEnum {
  male=1,
  female,
}