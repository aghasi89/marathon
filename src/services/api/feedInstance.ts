import axios from 'axios';
import Keys from '../Keys';

export const setMarathonApiFeedHeader = (token: string | null) => {
	feedApi.defaults.headers.common.Authorization = token
		? `Bearer ${token}`
		: null;
};
const feedApi = axios.create({
   baseURL: Keys.FEED_URL,
   headers: {
    'Content-Type': 'application/json',
  },

});
export default feedApi;