import { ICoachIdsPayload } from '../../../types/types';
import mainApi from '../mainInstance';
import RestApi from '../RestApi';

class GetFollowersEP extends RestApi<any> {
    routeName = '';
    followers = async () => {
        try {
            const res = await mainApi.get(`get-my-followers`)
            return res.data
        } catch (ex: any) {
            return ex.response.data
        }
    };
    followings = async () => {
        try {
            const res = await mainApi.get(`get-my-followings/`)
            return res.data
        } catch (ex: any) {
            return ex.response.data
        }
    };
    checkCoachFollow = async (data: ICoachIdsPayload) => {
        try {
            const res = await mainApi.post(`check-follow-coaches/`, data)
            return res.data
        } catch (ex: any) {
            return ex.response.data
        }
    };
}
const getFollowersEP = new GetFollowersEP();

export default getFollowersEP;
