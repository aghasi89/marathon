import { NotificationsTypes } from "../costants";

export const getUnseenNotificationsCount = (id: number) => {
  return {
    type: NotificationsTypes.GET_UNSEEN_NOTIFICATIONS_COUNT,
    id
  };
};

export const setUnseenNotificationsCount = (payload: any) => {
  return {
    type: NotificationsTypes.SET_UNSEEN_NOTIFICATIONS_COUNT,
    payload
  };
};

export const getNotifications = (id: number) => {
  return {
    type: NotificationsTypes.GET_NOTIFICATIONS,
    id,
  };
};

export const setNotifications = (payload: any) => {
  return {
    type: NotificationsTypes.SET_NOTIFICATIONS,
    payload
  };
};

export const readNotification = (id: number, cb: () => void) => {
  return {
    type: NotificationsTypes.READ_NOTIFICATION,
    id,
    cb
  };
};
