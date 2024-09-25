import {IActivity, IActivityDetail} from '../reducers/activity-reducer';

export const activityListSelector = (state: {
  activityReducer: {activityList: Array<IActivity>};
}) => state.activityReducer.activityList;
export const activityDetailSelector = (state: {
  activityReducer: {activityDetail: IActivityDetail};
}) => state.activityReducer.activityDetail;
