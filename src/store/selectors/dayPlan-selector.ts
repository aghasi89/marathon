import { IDayPlan, IDayPlanDetail, IFilterDayPlan } from "../reducers/dayPlan-reducer";

export const dayPlanListSelector = (state: {
  dayPlanReducer: {dayPlanList: Array<IDayPlan>};
}) => state.dayPlanReducer.dayPlanList;
export const dayPlanFilterListSelector = (state: {
  dayPlanReducer: {filterList: Array<IFilterDayPlan>};
}) => state.dayPlanReducer.filterList;
export const dayPlanSelectedFilterListSelector = (state: {
  dayPlanReducer: {dayPlanSelectedFilterList: Array<IFilterDayPlan>};
}) => state.dayPlanReducer.dayPlanSelectedFilterList;
export const dayPlanDetailSelector = (state: {
  dayPlanReducer: {dayPlanDetail: IDayPlanDetail};
}) => state.dayPlanReducer.dayPlanDetail;
