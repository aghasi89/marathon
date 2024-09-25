import axios from 'axios';
import Keys from '../Keys';

const chatApi = axios.create({
    baseURL: Keys.API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});
export default chatApi;