import {IAction} from '../../types/types';
import {FollowersTypes} from '../costants';

export const initialState = {
  followers: undefined,
  followings: undefined,
  checkCoachFollow: undefined,
};

const followersReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case FollowersTypes.SET_FOLLOWERS:
      return {
        ...state,
        followers: action.payload,
      };
    case FollowersTypes.SET_FOLLOWINGS:
      return {
        ...state,
        followings: action.payload,
      };
    case FollowersTypes.SET_CHECK_COACHES_FOLLOW:
      return {
        ...state,
        checkCoachFollow: action.payload,
      };

    default:
      return state;
  }
};
export default followersReducer;
