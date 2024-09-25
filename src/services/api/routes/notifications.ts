import RestApi from '../RestApi';
import notificationsApi from '../notificationsInstance';

class NotificationsEP extends RestApi<any> {
  routeName = '';
  getUnseenNotificationsCount = async (id: string) => {
    try {
      const res = await notificationsApi.get(`unseen-notifications-count/${id}/`);
      return res.data;
    } catch (ex: any) {
      throw ex.response.data
    }
  };
  getNotifications = async (id: string) => {
    try {
      const res = await notificationsApi.get(`notification-center/${id}/`);
      return res.data;
    } catch (ex: any) {
      throw ex.response.data
    }
  };
  readNotification = async (id: string) => {
    try {
      const res = await notificationsApi.post(`read-notifications/`, { notifications: [id] });
      return res.data;
    } catch (ex: any) {
      throw ex.response.data
    }
  };
}

const notificationsEP = new NotificationsEP();

export default notificationsEP;
