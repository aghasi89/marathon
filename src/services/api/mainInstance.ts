import axios from 'axios';
import Keys from '../Keys';

export const setMarathonApiAuthorizationHeader = (token: string | null) => {
  mainApi.defaults.headers.common.Authorization = token
    ? `Bearer ${token}`
    : null;
};
const mainApi = axios.create({
  baseURL: Keys.API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});
export default mainApi;