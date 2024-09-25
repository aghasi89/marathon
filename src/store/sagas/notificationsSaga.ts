import { takeLatest, all, put } from 'redux-saga/effects';
import notificationsEP from '../../services/api/routes/notifications';
import { NotificationsTypes } from '../costants';
import { setNotifications, setUnseenNotificationsCount } from '../actions/notifications-action';

function* getUnseenNotificationsCount({ id }: any): Generator {
  try {
    const response: any = yield notificationsEP.getUnseenNotificationsCount(id);
    if (response) {
      yield put(setUnseenNotificationsCount(response.count));
    }
  } catch (ex: any) {

  }
}

function* getNotifications({ id }: any): Generator {
  try {
    const response: any = yield notificationsEP.getNotifications(id);
    if (response) {
      yield put(setNotifications(response));
    }
  } catch (ex: any) {

  }
}

function* readNotification({ id, cb }: any): Generator {
  try {
    const response: any = yield notificationsEP.readNotification(id);
    if (response) {
      cb()
    }
  } catch (ex: any) {

  }
}

export function* watchNotificationsSaga() {
  yield all([
    takeLatest(NotificationsTypes.GET_UNSEEN_NOTIFICATIONS_COUNT as any, getUnseenNotificationsCount),
    takeLatest(NotificationsTypes.GET_NOTIFICATIONS as any, getNotifications),
    takeLatest(NotificationsTypes.READ_NOTIFICATION as any, readNotification),
  ]);
}
