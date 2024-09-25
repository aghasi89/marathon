import { IUserFeeds, ILanguageItem, IUploadImage, IFeedListItem, IRequestStatusType, IFeedItem, IUser } from "../../types/types";
import { ProfileTypes } from "../costants";

export const getProfileInfo = (cb?: (user: IUser) => void) => {
  return {
    type: ProfileTypes.GET_PROFILE_INFO,
    cb
  };
};

export const setProfileInfo = (payload: any) => {
  return {
    type: ProfileTypes.SET_PROFILE_INFO,
    payload
  };
};

export const getPersonInfo = (id: number, cb: () => void) => {
  return {
    type: ProfileTypes.GET_PERSON_INFO,
    id,
    cb
  };
};

export const getPersonInfoByUsername = (username: string, cb: () => void) => {
  return {
    type: ProfileTypes.GET_PERSON_INFO_BY_USERNAME,
    username,
    cb
  };
};

export const setPersonInfo = (payload: any) => {
  return {
    type: ProfileTypes.SET_PERSON_INFO,
    payload
  };
};

export const changeProfileInfo = (id: number, payload: any, cb: () => void) => {
  return {
    type: ProfileTypes.CHANGE_PROFILE_INFO,
    id,
    payload,
    cb
  };
};

export const changeEmail = (email: string, cb: () => void) => {
  return {
    type: ProfileTypes.CHANGE_EMAIL,
    email,
    cb
  };
};

export const changePassword = (payload: any, cb: () => void) => {
  return {
    type: ProfileTypes.CHANGE_PASSWORD,
    payload,
    cb
  };
};

export const resetPassword = (payload: any, cb: () => void) => {
  return {
    type: ProfileTypes.RESET_PASSWORD,
    payload,
    cb
  };
};

export const setPassword = (payload: any, cb: () => void) => {
  return {
    type: ProfileTypes.SET_PASSWORD,
    payload,
    cb
  };
};

export const getGoogleLocation = (payload: string) => {
  return {
    type: ProfileTypes.GET_LACATION,
    payload
  };
};

export const setLocation = (payload: string) => {
  return {
    type: ProfileTypes.SET_LACATION,
    payload
  };
};

export const languages = () => {
  return {
    type: ProfileTypes.GET_LANGUAGES,
  };
};

export const setLanguages = (payload: ILanguageItem) => {
  return {
    type: ProfileTypes.SET_LANGUAGES,
    payload
  };
};

export const specialities = () => {
  return {
    type: ProfileTypes.GET_SPECIALITIES,
  };
};

export const setSpecialities = (payload: any) => {
  return {
    type: ProfileTypes.SET_SPECIALITIES,
    payload
  };
};

export const setFiles = (payload: IUploadImage, cb: (url: string) => void) => {
  return {
    type: ProfileTypes.SET_FILES,
    payload,
    cb
  };
};

export const getFeeds = (payload: IUserFeeds, cb: () => void, params?: any) => {
  return {
    type: ProfileTypes.GET_FEEDS,
    payload,
    cb,
    params
  };
};

export const setFeeds = (payload: IFeedListItem[], cb?: () => void) => {
  cb && cb()
  return {
    type: ProfileTypes.SET_FEEDS,
    payload,
  };
};

export const getMyPurchases = (payload: any, cb: () => void) => {
  return {
    type: ProfileTypes.GET_MY_PURCHASES,
    cb,
    payload
  };
};

export const setMyPurchases = (payload: IFeedListItem[]) => {
  return {
    type: ProfileTypes.SET_MY_PURCHASES,
    payload
  };
};

export const setFeedsListCount = (payload: number) => {
  return {
    type: ProfileTypes.SET_FEEDS_LIST_COUNT,
    payload
  };
};

export const followUser = (payload: number, cb?: (status: IRequestStatusType) => void) => {
  return {
    type: ProfileTypes.FOLLOW_USER,
    payload,
    cb
  };
};

export const getFollowers = (payload: number) => {
  return {
    type: ProfileTypes.GET_FOLLOWERS,
    payload
  };
};

export const setFollowers = (payload: number) => {
  return {
    type: ProfileTypes.SET_FOLLOWERS,
    payload
  };
};

export const getFollowings = (payload: number) => {
  return {
    type: ProfileTypes.GET_FOLLOWINGS,
    payload
  };
};

export const setFollowings = (payload: number) => {
  return {
    type: ProfileTypes.SET_FOLLOWINGS,
    payload
  };
};
export const getSearchUsers = (payload: any) => {
  return {
    type: ProfileTypes.GET_SEARCH_USERS,
    payload
  }
}
export const setSearchUsers = (payload: any) => {
  return {
    type: ProfileTypes.SET_SEARCH_USERS,
    payload
  }
}
export const getGeneratedMessage = (payload: any) => {
  return {
    type: ProfileTypes.GET_GENERATED_MESSAGE,
    payload,
  };
};
export const setGeneratedMessage = (payload: any) => {
  return {
    type: ProfileTypes.SET_GENERATED_MESSAGE,
    payload,
  };
};
export const getRegions = () => {
  return {
    type: ProfileTypes.GET_REGIONS,
  };
};
export const setRegions = (payload: any) => {
  return {
    type: ProfileTypes.SET_REGIONS,
    payload,
  };
};
export const getMyCreatedFeedsByStatusAction = (payload: IUserFeeds, cb?: () => void) => {
  return {
    type: ProfileTypes.GET_MY_CREATIONS_BY_STATUS,
    payload,
    cb,
  };
};
export const setMyCreatedFeedsByStatusAction = (payload: IFeedItem[]) => {
  return {
    type: ProfileTypes.SET_MY_CREATIONS_BY_STATUS,
    payload,
  };
};

export const getUserWithStream = (id: string, cb?: () => void) => {
  return {
    type: ProfileTypes.GET_USER_WITH_STREAM,
    id,
    cb
  };
};
export const postCertificate = (payload: any, cb?: () => void) => {
  return {
    type: ProfileTypes.POST_CERTIFICATE,
    payload,
    cb
  }
};
export const deleteCertificate = (id: number, cb: () => void) => {
  return {
    type: ProfileTypes.DELETE_CERTIFICATE,
    id,
    cb
  }
};
export const editCertificate = (payload: any, id: number, cb?: () => void) => {
  return {
    type: ProfileTypes.EDIT_CERTIFICATE,
    payload,
    id,
    cb
  }
};
export const setCoachPassword = (payload: any, cb: () => void) => {
  return {
    type: ProfileTypes.SET_COACH_PASSWORD,
    payload,
    cb
  }
};