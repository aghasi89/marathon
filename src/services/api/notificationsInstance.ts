import axios from 'axios';
import Keys from '../Keys';

export const setMarathonNotificationsApiAuthorizationHeader = (token: string | null) => {
  notificationsApi.defaults.headers.common.Authorization = token
    ? `Bearer ${token}`
    : null;
};
const notificationsApi = axios.create({
  baseURL: Keys.NOTIFICATION_CENTER_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});
export default notificationsApi;