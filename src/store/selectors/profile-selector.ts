import { IReducer } from "../../types/types";

export const profileSelector = (state: IReducer) => state.profileReducer.user;
export const personSelector = (state: IReducer) => state.profileReducer.person;
export const languagesSelector = (state: IReducer) => state.profileReducer.languages;
export const specialitiesSelector = (state: IReducer) => state.profileReducer.specialities;
export const feedsSelector = (state: IReducer) => state.profileReducer.feedsList;
export const feedsListCountSelector = (state: IReducer) => state.profileReducer.feedListCount;
export const followersSelector = (state: IReducer) => state.profileReducer.followers;
export const followingsSelector = (state: IReducer) => state.profileReducer.followings;
export const searchInputSelector = (state: IReducer) => state.profileReducer.searchUsers
export const generatedMessageSelector = (state: IReducer) => state.profileReducer.generatedMessage
export const regionsSelector = (state: IReducer) => state.profileReducer.regions
export const myPurchasesSelector = (state: IReducer) => state.profileReducer.myPurchases
export const myCreationsByStatusSelector = (state: IReducer) => state.profileReducer.myCreationsByStatus
export const mandatoryFieldsSelector = (state: IReducer) => state.profileReducer.mandatoryFields
