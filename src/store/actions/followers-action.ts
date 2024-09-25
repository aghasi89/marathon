import { ICoachIdsPayload } from '../../types/types';
import { FollowersTypes, } from '../costants';

export const setFollowers = (payload: any) => {
    return {
        type: FollowersTypes.SET_FOLLOWERS,
        payload,
    };
};
export const getFollowers = () => {
    return {
        type: FollowersTypes.GET_FOLLOWERS,
    };
};
export const setFollowings = (payload: any) => {
    return {
        type: FollowersTypes.SET_FOLLOWINGS,
        payload,
    };
};
export const getFollowings = () => {
    return {
        type: FollowersTypes.GET_FOLLOWINGS,
    };
};
export const getCheckCoachesFollow = (payload: ICoachIdsPayload) => {
    return {
        type: FollowersTypes.GET_CHECK_COACHES_FOLLOW,
        payload,
    };
};
export const setCheckCoachesFollow = (payload: any) => {
    return {
        type: FollowersTypes.SET_CHECK_COACHES_FOLLOW,
        payload
    };
};