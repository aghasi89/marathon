import { IReducer } from "../../types/types";

export const followersSelector = (state: IReducer) => state.followersReducer.followers
export const followingsSelector = (state: IReducer) => state.followersReducer.followings
export const checkCoachFollowSelector = (state: IReducer) => state.followersReducer.checkCoachFollow