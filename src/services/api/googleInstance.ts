import axios from 'axios';
import Keys from '../Keys';

const googleApi = axios.create({
  baseURL: Keys.GOOGLE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});
export default googleApi;