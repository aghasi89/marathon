import { NotificationsTypes } from '../costants';

export interface INotificationCenter {
  unseenNotificationsCount: number,
  notifications: undefined | any[]
}

export const initialState: INotificationCenter = {
  unseenNotificationsCount: 0,
  notifications: undefined
};

const notificationsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case NotificationsTypes.SET_UNSEEN_NOTIFICATIONS_COUNT:
      return {
        ...state,
        unseenNotificationsCount: action.payload,
      };
    case NotificationsTypes.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    default:
      return state;
  }
};
export default notificationsReducer;
