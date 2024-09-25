import axios from 'axios';
import Keys from '../Keys';

export const setMarathonFinansicalApiAuthorizationHeader = (token: string | null) => {
	finansicalApi.defaults.headers.common.Authorization = token
		? `Bearer ${token}`
		: null;
};
const finansicalApi = axios.create({
  baseURL: Keys.FINANSICAL_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});
export default finansicalApi;