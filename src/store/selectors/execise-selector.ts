import {IExercise, ITag} from '../../types/types';
import {
  IEquipement,
  IExeciseDetail,
  IExeciseVideo,
  IFilterExecise,
  IMuscle,
} from '../reducers/execises-reducer';

export const exerciseListSelector = (state: {
  execiseReducer: {execiseList: Array<IExercise>};
}) => state.execiseReducer.execiseList;
export const exerciseFilterListSelector = (state: {
  execiseReducer: {execiseFilterList: Array<IFilterExecise>};
}) => state.execiseReducer.execiseFilterList;
export const execiseSelectedFilterListSelector = (state: {
  execiseReducer: {execiseSelectedFilterList: Array<IFilterExecise>};
}) => state.execiseReducer.execiseSelectedFilterList;
export const execiseDetailSelector = (state: {
  execiseReducer: {execisetDetail: IExercise};
}) => state.execiseReducer.execisetDetail;
export const equipementListSelector = (state: {
  execiseReducer: {equipementList: Array<IEquipement>};
}) => state.execiseReducer.equipementList;
export const muscleListSelector = (state: {
  execiseReducer: {muscleList: Array<IMuscle>};
}) => state.execiseReducer.muscleList;
export const tagListSelector = (state: {
  execiseReducer: {tagList: Array<ITag>};
}) => state.execiseReducer.tagList;
export const execiseVideoSelector = (state: {
  execiseReducer: {execiseVideo: IExeciseVideo};
}) => state.execiseReducer.execiseVideo;
