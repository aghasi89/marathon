import RestApi from '../RestApi';
import chatApi from '../chatInstance';

class chatToken extends RestApi<any> {
    routeName = '';
    getChatUserToken = async (userId: any) => {
        try {
            const res = await chatApi.get(`/generate-token/${userId}/`)
            return res.data;
        } catch (er) {
            throw er;
        }
    };
}
const chat = new chatToken();
export default chat;
