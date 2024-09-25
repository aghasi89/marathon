import { IReducer } from "../../types/types";

export const notificationsSelector = (state: IReducer) => state.notificationsReducer.notifications;
export const unseenNotificationsCountSelector = (state: IReducer) => state.notificationsReducer.unseenNotificationsCount;
