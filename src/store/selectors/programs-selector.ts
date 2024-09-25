import {ITag} from '../../types/types';
import {
  IFilterPrograme,
  IProgram,
  IProgramDay,
  IProgramDetail,
} from '../reducers/programs-reducer';

export const programeListSelector = (state: {
  programeReducer: {programsList: Array<IProgram>};
}) => state.programeReducer.programsList;
export const filterListSelector = (state: {
  programeReducer: {filterList: Array<IFilterPrograme>};
}) => state.programeReducer.filterList;
export const programSelectedFilterListSelector = (state: {
  programeReducer: {programSelectedFilterList: Array<IFilterPrograme>};
}) => state.programeReducer.programSelectedFilterList;
export const programTagListSelector = (state: {
  programeReducer: {tagList: Array<ITag>};
}) => state.programeReducer.tagList;
export const programSelectedTagListSelector = (state: {
  programeReducer: {selectedTagList: Array<ITag>};
}) => state.programeReducer.selectedTagList;
export const programDetailSelector = (state: {
  programeReducer: {programDetail: IProgramDetail};
}) => state.programeReducer.programDetail;
export const programDaySelector = (state: {
  programeReducer: {programDays: Array<IProgramDay>};
}) => state.programeReducer.programDays;
