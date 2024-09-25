import { IUser, ILanguageItem, IFeedListItem, IRegion, IFeedItem, IMandatoryFields } from '../../types/types';
import { ProfileTypes } from '../costants';

export interface IProfile {
  user: undefined | IUser,
  person: undefined | IUser,
  languages: undefined | ILanguageItem[],
  specialities: undefined | [],
  feedsList: IFeedListItem[] | undefined,
  feedListCount: number,
  followers: any,
  followings: any,
  searchUsers: any,
  generatedMessage: string,
  regions: IRegion[] | undefined,
  myPurchases: IFeedItem[] | undefined
  myCreationsByStatus: IFeedItem[] | undefined
  mandatoryFields: IMandatoryFields[]
}

export const initialState: IProfile = {
  user: undefined,
  person: undefined,
  languages: undefined,
  specialities: undefined,
  feedsList: undefined,
  feedListCount: 0,
  followers: [],
  followings: [],
  searchUsers: [],
  generatedMessage: "",
  regions: undefined,
  myPurchases: undefined,
  myCreationsByStatus: undefined,
  mandatoryFields: [
    'gender',
    'language',
    'speciality',
    'status',
    'image'
  ]
};

const profileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ProfileTypes.SET_PROFILE_INFO:
      return {
        ...state,
        user: action.payload,
      };
    case ProfileTypes.SET_PERSON_INFO:
      return {
        ...state,
        person: action.payload,
      };
    case ProfileTypes.SET_LACATION:
      var newUser = { ...state.user }
      newUser.googleLocation = action.payload
      return {
        ...state,
        user: newUser,
      };
    case ProfileTypes.SET_SPECIALITIES:
      return {
        ...state,
        specialities: action.payload,
      };
    case ProfileTypes.SET_LANGUAGES:
      return {
        ...state,
        languages: action.payload,
      };
    case ProfileTypes.SET_FEEDS:
      return {
        ...state,
        feedsList: action.payload,
      };
    case ProfileTypes.SET_FEEDS_LIST_COUNT:
      return {
        ...state,
        feedListCount: action.payload,
      };
    case ProfileTypes.SET_FOLLOWERS:
      return {
        ...state,
        followers: action.payload,
      };
    case ProfileTypes.SET_FOLLOWINGS:
      return {
        ...state,
        followings: action.payload,
      };
    case ProfileTypes.SET_SEARCH_USERS:
      return {
        ...state,
        searchUsers: action.payload,
      };
    case ProfileTypes.SET_GENERATED_MESSAGE:
      return {
        ...state,
        generatedMessage: action.payload,
      };
    case ProfileTypes.SET_REGIONS:
      return {
        ...state,
        regions: action.payload,
      };
    case ProfileTypes.SET_MY_PURCHASES:
      return {
        ...state,
        myPurchases: action.payload,
      };
    case ProfileTypes.SET_MY_CREATIONS_BY_STATUS:
      return {
        ...state,
        myCreationsByStatus: action.payload,
      };
    default:
      return state;
  }
};
export default profileReducer;
