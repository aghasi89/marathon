import { IFeedTypes, ICreateFeed, IFeedCategoryItem, IFeedItem, IFeedMultiItem, getCoachFeedPayload, getFeedListPayload, IWorkoutMultiItem, IExerciseItem, IEditExerciseItem, IFeedListItem, IRequestStatusType, IPrivateWorkout, IPostAnswer, IVideoProgressItem, ILikedUsersListItem, IFeedListFilter, IUser, IComment, ICommentItem, ICommentReply, IHideFeed, IReportFeed, IReportFeedCategory, ICheckIsQuetstinsExist, IQuestioneRequestStatus } from '../../types/types';
import { FeedTypes } from '../costants';


export const getFeedListAction = (payload: getFeedListPayload, cb?: () => void) => {
  return {
    type: FeedTypes.GET_FEED_LIST,
    payload,
    cb
  };
};
export const getFeedListMoreItemsAction = (payload: getFeedListPayload, cb?: () => void) => {
  return {
    type: FeedTypes.GET_FEED_LIST_MORE_ITEMS,
    payload,
    cb
  };
};
export const setFeedListMoreItemsAction = (payload: number) => {
  return {
    type: FeedTypes.SET_FEED_LIST_MORE_ITEMS,
    payload,
  };
};
export const setFeedListAction = (payload?: IFeedListItem[], cb?: () => void) => {
  cb && cb()
  return {
    type: FeedTypes.SET_FEED_LIST,
    payload,
  };
};
export const setFeedsCountAction = (payload: number) => {
  return {
    type: FeedTypes.SET_FEEDS_COUNT,
    payload,
  };
};
export const setFeedListActiveFilterAction = (payload: IFeedListFilter) => {
  return {
    type: FeedTypes.SET_FEED_LIST_ACTIVE_FILTER,
    payload,
  };
};

export const getFeedByIdAction = (payload: { id: number, type: string, cb?: (status: string) => void }) => {
  return {
    type: FeedTypes.GET_FEED_BY_ID,
    payload,
  }
}
export const setSelectedFeedAction = (payload?: IFeedItem) => {
  return {
    type: FeedTypes.SET_SELECTED_FEED,
    payload,
  }
}
export const getChatFeeds = (payload: any) => {
  return {
    type: FeedTypes.GET_CHAT_FEEDS,
    payload
  };
};
export const setChatFeeds = (payload: any) => {
  return {
    type: FeedTypes.SET_CHAT_FEEDS,
    payload
  }
}
export const editFeedAction = (feedType?: IFeedTypes, data?: ICreateFeed, id?: number,cb?:(status:IRequestStatusType)=>void) => {
  return {
    type: FeedTypes.EDIT_FEED,
    feedType,
    data,
    id,
    cb
  }
}
export const getFeedCategoriesAction = (feedType?: IFeedTypes) => {
  return {
    type: FeedTypes.GET_FEED_CATEGORIES_LIST,
    feedType
  }
}
export const setFeedCategoriesAction = (payload: IFeedCategoryItem[]) => {
  return {
    type: FeedTypes.SET_FEED_CATEGORIES_LIST,
    payload
  }
}
export const getFeedMeasurmentsAction = () => {
  return {
    type: FeedTypes.GET_FEED_MEASURMENTS_LIST,
  }
}
export const setFeedMeasurmentsAction = (payload: IFeedMultiItem[]) => {
  return {
    type: FeedTypes.SET_FEED_MEASURMENTS_LIST,
    payload
  }
}
export const getFeedMeasurmentUnitsListAction = () => {
  return {
    type: FeedTypes.GET_FEED_MEASURMENT_UNITS_LIST,
  }
}
export const setFeedMeasurmentUnitsListAction = (payload: IFeedMultiItem[]) => {
  return {
    type: FeedTypes.SET_FEED_MEASURMENT_UNITS_LIST,
    payload
  }
}

export const getCoachFeeds = (payload: getCoachFeedPayload) => {
  return {
    type: FeedTypes.GET_COACH_FEEDS,
    payload
  }
}

export const setCoachFeeds = (payload: any) => {
  return {
    type: FeedTypes.SET_COACH_FEEDS,
    payload
  }
}
export const getEquipmentsList = () => {
  return {
    type: FeedTypes.GET_EQUIPMENT_LIST,
  }
}
export const setEquipmentsList = (payload: IWorkoutMultiItem[]) => {
  return {
    type: FeedTypes.SET_EQUIPMENT_LIST,
    payload
  }
}
export const getBodyPartsList = () => {
  return {
    type: FeedTypes.GET_BODY_PARTS_LIST,
  }
}
export const setBodyPartsList = (payload: IWorkoutMultiItem[]) => {
  return {
    type: FeedTypes.SET_BODY_PARTS_LIST,
    payload
  }
}
export const createExercise = (payload: any, cb: () => void) => {
  return {
    type: FeedTypes.CREATE_EXERCISE,
    payload,
    cb
  }
}
export const getMyExercisesList = (cb?: () => void) => {
  return {
    type: FeedTypes.GET_MT_EXERCISES_LIST,
    cb
  }
}
export const setMyExercisesList = (payload: IExerciseItem[]) => {
  return {
    type: FeedTypes.SET_MT_EXERCISES_LIST,
    payload
  }
}
export const editExerciseAction = (id: number, payload: IEditExerciseItem, cb?: (status: 'success' | 'reject') => void) => {
  return {
    type: FeedTypes.EDIT_EXERCISE,
    payload,
    cb,
    id
  }
}
export const getExercise = (payload: number) => {
  return {
    type: FeedTypes.GET_EXERCISE,
    payload
  }
}
export const setExercise = (payload: IExerciseItem | undefined) => {
  return {
    type: FeedTypes.SET_EXERCISE,
    payload
  }
}
export const deleteExercise = (payload: number, cb: () => void) => {
  return {
    type: FeedTypes.DELETE_EXERCISE,
    payload,
    cb
  }
}
export const getCoachFeedsByTypeAction = (id: number, feedType: IFeedTypes) => {
  return {
    type: FeedTypes.GET_COACH_FEED_BY_TYPE,
    id,
    feedType
  }
}
export const setCoachWorkoutTypeFeedsAction = (payload: IFeedItem[]) => {
  return {
    type: FeedTypes.SET_COACH_WORKOUT_TYPE_FEEDS,
    payload
  }
}
export const setCoachRecipeTypeFeedsAction = (payload: IFeedItem[]) => {
  return {
    type: FeedTypes.SET_COACH_RECIPE_TYPE_FEEDS,
    payload
  }
}
export const setConnectPrivateWorkout = (payload: IPrivateWorkout) => {
  return {
    type: FeedTypes.SET_CONNECT_PRIVATE_WORKOUT,
    payload,
  };
};
export const deleteFeed = (id: number, cb: (status: IRequestStatusType) => void) => {
  return {
    type: FeedTypes.DELETE_FEED,
    id,
    cb
  }
}
export const setCoachQuestionAnswerAction = (payload: IPostAnswer, cb?: (status: IRequestStatusType) => void) => {
  return {
    type: FeedTypes.SET_COACH_QUESTION_ANSWER,
    payload,
    cb
  }
}
// export const getVideoUploadProgressAction = (payload: { public_key: string, type: 'context' | 'cover' }) => {
//   return {
//     type: FeedTypes.GET_FEED_VIDEO_UPLOAD_PROGRESS,
//     payload,
//   }
// }
// export const setVideoUploadProgressAction = (payload: IVideoProgressItem) => {
//   return {
//     type: FeedTypes.SET_FEED_VIDEO_UPLOAD_PROGRESS,
//     payload,
//   }
// }
export const setLikeOrDislikeFeedAction = (payload: number, cb?: (status: IRequestStatusType) => void) => {
  return {
    type: FeedTypes.SET_LIKE_OR_DISLIKE_FEED,
    payload,
    cb
  }
}
export const getLikedUsersLitsAction = (payload: number, cb?: (status: IRequestStatusType) => void) => {
  return {
    type: FeedTypes.GET_LIKED_USERS_LIST,
    payload,
    cb
  }
}
export const setLikedUsersLitsAction = (payload: ILikedUsersListItem[]) => {
  return {
    type: FeedTypes.SET_LIKED_USERS_LIST,
    payload,
  }
}
export const setPermissionDenied = (payload: any) => {
  return {
    type: FeedTypes.SET_PERMISSION_DENIED,
    payload,
  }
}
export const setCoachesList = (payload: IUser[]) => {
  return {
    type: FeedTypes.SET_COACHES_LIST,
    payload,
  }
}
export const createComment = (payload: IComment, cb: () => void) => {
  return {
    type: FeedTypes.POST_COMMENT,
    payload,
    cb
  }
}
export const getComments = (payload: string, cb?: (status: IRequestStatusType) => void) => {
  return {
    type: FeedTypes.GET_COMMENTS,
    payload,
    cb
  }
}
export const setComments = (payload: ICommentItem | undefined) => {
  return {
    type: FeedTypes.SET_COMMENTS,
    payload,
  }
}
export const postCommentReply = (payload: ICommentReply, cb: () => void) => {
  return {
    type: FeedTypes.POST_COMMENT_REPLY,
    payload,
    cb
  }
}
export const hideFeed = (payload: IHideFeed, cb: (status: IRequestStatusType) => void) => {
  return {
    type: FeedTypes.HIDE_FEED,
    payload,
    cb
  }
}
export const getReportCategoryList = () => {
  return {
    type: FeedTypes.GET_REPORT_CATEGORY_LIST,
  }
}
export const setReportCategoryList = (payload: IReportFeedCategory) => {
  return {
    type: FeedTypes.SET_REPORT_CATEGORY_LIST,
    payload,
  }
}
export const postReport = (payload: IReportFeed, cb?: () => void) => { // poxel any
  return {
    type: FeedTypes.POST_REPORT_FEED,
    payload,
    cb
  }
}
export const deleteComment = (payload: number, cb: () => void) => {
  return {
    type: FeedTypes.DELETE_COMMENT,
    payload,
    cb
  }
}
export const deleteRepliedComment = (payload: number, cb: () => void) => {
  return {
    type: FeedTypes.DELETE_REPLY_COMMENT,
    payload,
    cb
  }
}
export const likeComment = (payload: number, cb: () => void) => {
  return {
    type: FeedTypes.LIKE_COMMENT,
    payload,
    cb
  }
}
export const likeReplyComment = (payload: number, cb: () => void) => {
  return {
    type: FeedTypes.LIKE_REPLY_COMMENT,
    payload,
    cb
  }
}
export const checkIsQuetstinsExistAction = (payload: ICheckIsQuetstinsExist, cb?: (status: IQuestioneRequestStatus) => void) => {
  return {
    type: FeedTypes.CHECK_IS_QUESTIONS_EXIST,
    payload,
    cb
  }
}
export const createDraftFeedAction = (payload: { type: IFeedTypes }) => {
  return {
    type: FeedTypes.CREATE_DRAFT_FEED,
    payload,
  }
}
export const setDraftFeedAction = (payload?:IFeedItem) => {
  return {
    type: FeedTypes.SET_DRAFT_FEED,
    payload,
  }}
export const setCoachInfo = (payload: IUser) => {
  return {
    type: FeedTypes.SET_COACH_INFO,
    payload,
  }
}
