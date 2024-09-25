import { WorkoutLevel } from "../../types/enums"
import { ICreateFeed, ICreateFeedErrorMessage, IExercise, IFeedCategoryItem, IFeedCoachQuestionItem, IFeedMediaItem, IFeedMultiItem, IFeedPaymentType, IFeedPreparationSteps, IFeedTypes, IMediaSize, IUploadImage, IWallet, IWorkoutSelectedMultiItem, IWorkoutType } from "../../types/types"
import { CreateFeedTypes } from "../costants"

export const setContextAction = (payload: IFeedMediaItem[]) => {
  return {
    type: CreateFeedTypes.SET_CONTEXT,
    payload
  }
}
export const setMediaAction = (payload: IFeedMediaItem[]) => {
  return {
    type: CreateFeedTypes.SET_MEDIA,
    payload
  }
}
export const setTitleAction = (payload: string) => {
  return {
    type: CreateFeedTypes.SET_TITLE,
    payload
  }
}
export const setStartDateAction = (payload: Date) => {
  return {
    type: CreateFeedTypes.SET_START_DATE,
    payload
  }
}
export const setDurationAction = (payload?: number) => {
  return {
    type: CreateFeedTypes.SET_START_DURATION,
    payload
  }
}
export const setUsersCountAction = (payload: number) => {
  return {
    type: CreateFeedTypes.SET_USER_COUNT,
    payload
  }
}
export const setPackageTypeAction = (payload: boolean) => {
  return {
    type: CreateFeedTypes.SET_PACKAGE_TYPE,
    payload
  }
}
export const setPriceAction = (payload: number) => {
  return {
    type: CreateFeedTypes.SET_PRICE,
    payload
  }
}
export const setCommunicationAction = (payload: 'channel' | 'group') => {
  return {
    type: CreateFeedTypes.SET_COMMUNICATION,
    payload
  }
}
export const setQuestionAction = (payload: IFeedCoachQuestionItem[]) => {
  return {
    type: CreateFeedTypes.SET_QUESTION,
    payload
  }
}
export const setLanguageAction = (payload: number) => {
  return {
    type: CreateFeedTypes.SET_LANGUAGE,
    payload
  }
}
export const setSelectedCategoriesAction = (payload: IFeedCategoryItem[]) => {
  return {
    type: CreateFeedTypes.SET_SELECTED_CATEGORIES,
    payload
  }
}
export const setSelectedMeasurementAction = (payload: IFeedMultiItem[]) => {
  return {
    type: CreateFeedTypes.SET_SELECTED_MEASUREMENTS,
    payload
  }
}
export const setFeedTypeAction = (payload?: IFeedTypes) => {
  return {
    type: CreateFeedTypes.SET_FEED_TYPE,
    payload
  }
}
export const setDescriptionAction = (payload?: string) => {
  return {
    type: CreateFeedTypes.SET_DESCRIPTION,
    payload
  }
}
export const setIngredientsAction = (payload?: string) => {
  return {
    type: CreateFeedTypes.SET_INGREDIENTS_STRING,
    payload
  }
}
export const setComponentsAction = (payload?: IFeedMultiItem[]) => {
  return {
    type: CreateFeedTypes.SET_COMPONENTS,
    payload
  }
}
export const setPreparationStepsAction = (payload?: IFeedPreparationSteps[]) => {
  return {
    type: CreateFeedTypes.SET_PREPARATION_STEPS,
    payload
  }
}
export const setProteinAction = (payload?: number) => {
  return {
    type: CreateFeedTypes.SET_PROTEIN,
    payload
  }
}
export const setCarbsAction = (payload?: number) => {
  return {
    type: CreateFeedTypes.SET_CARBS,
    payload
  }
}
export const setFatAction = (payload?: number) => {
  return {
    type: CreateFeedTypes.SET_FAT,
    payload
  }
}
export const setKcalMeasurementAction = (payload?: "per-serving" | 'for-100-grams') => {
  return {
    type: CreateFeedTypes.SET_KCAL_MEASUREMENT,
    payload
  }
}
export const setTotalKcalAction = (payload?: number) => {
  return {
    type: CreateFeedTypes.SET_TOTAL_KCAL,
    payload
  }
}
export const setPortionAction = (payload?: number) => {
  return {
    type: CreateFeedTypes.SET_PORTION,
    payload
  }
}
export const setServingSizeAction = (payload?: number) => {
  return {
    type: CreateFeedTypes.SET_SERVING_SIZE,
    payload
  }
}
export const setUnitOfMeasurementAction = (payload?: number) => {
  return {
    type: CreateFeedTypes.SET_UNIT_OF_MEASUREMENT,
    payload
  }
}
export const setMeasurementSelectedUnitAction = (payload?: IFeedMultiItem) => {
  return {
    type: CreateFeedTypes.SET_MEASUREMENT_SELECTED_UNIT,
    payload
  }
}
export const setIsMoreInfoAction = (payload?: boolean) => {
  return {
    type: CreateFeedTypes.SET_IS_MORE_INFO,
    payload
  }
}
export const setCategoriesListAction = (payload?: IFeedCategoryItem[]) => {
  return {
    type: CreateFeedTypes.SET_CATEGORIES_LIST,
    payload
  }
}
export const setSelectedCurrencyAction = (payload?: IFeedMultiItem) => {
  return {
    type: CreateFeedTypes.SET_SELECTED_CURRENCY,
    payload
  }
}
export const setCreatorAction = (payload?: number) => {
  return {
    type: CreateFeedTypes.SET_CREATOR,
    payload
  }
}
export const setWalletsLIstAction = (payload?: IWallet[]) => {
  return {
    type: CreateFeedTypes.SET_USER_WALLET_LIST,
    payload
  }
}
export const setErrorMessageAction = (payload?: ICreateFeedErrorMessage) => {
  return {
    type: CreateFeedTypes.SET_ERROR_MESSAGES,
    payload
  }
}
export const setFeedPaymentTypeAction = (payload?: IFeedPaymentType) => {
  return {
    type: CreateFeedTypes.SET_FEED_PAYMENT_TYPE,
    payload
  }
}
export const setState = (payload: ICreateFeed) => {
  return {
    type: CreateFeedTypes.SET_STATE,
    payload
  }
}
export const setWorkoutTypeAction = (payload?: IWorkoutType) => {
  return {
    type: CreateFeedTypes.SET_WORKOUT_TYPE,
    payload
  }
}
export const setWorkoutLevelAction = (payload?: WorkoutLevel) => {
  return {
    type: CreateFeedTypes.SET_WORKOUT_LEVEL,
    payload
  }
}
export const setCalorieAction = (payload?: number) => {
  return {
    type: CreateFeedTypes.SET_CALORIE,
    payload
  }
}
export const setSelectedEquipmentsAction = (payload: IWorkoutSelectedMultiItem[]) => {
  return {
    type: CreateFeedTypes.SET_SELECTED_EQUIPMENTS,
    payload
  }
}
export const setSelectedBodyPartsAction = (payload?: IExercise[]) => {
  return {
    type: CreateFeedTypes.SET_SELECTED_BODY_PARTS,
    payload
  }
}
export const setSelectedExercisesAction = (payload?: IWorkoutSelectedMultiItem[]) => {
  return {
    type: CreateFeedTypes.SET_SELECTED_EXERCISES,
    payload
  }
}
export const setSelectedExerciseItemAction = (payload?: IWorkoutSelectedMultiItem) => {
  return {
    type: CreateFeedTypes.SET_SELECTED_EXERCISE_ITEM,
    payload
  }
}
export const setWorkoutPermissionAction = (payload?: boolean) => {
  return {
    type: CreateFeedTypes.SET_WORKOUT_PERMISSION,
    payload
  }
}

export const uploadMediaForFeedCreatingAction = (payload: {
  mediaList: IUploadImage[];
  size: IMediaSize;
  mediaFor:'media'|'context'
  feedId:number;
  feedType?:IFeedTypes
  isEditing?:boolean
  contextIndex?:number
}) => {
  return {
    type: CreateFeedTypes.UPLOAD_MEDIA_FOR_FEED_CREATING,
    payload,
  };
};


export const getVideoUploadProgressAction = (payload: {
  public_key: string;
  mediaFor: 'media' | 'context',
  size:IMediaSize
  contextIndex?:number
}) => {
  return {
    type: CreateFeedTypes.GET_FEED_VIDEO_UPLOAD_PROGRESS,
    payload,
  };
};
export const setVideoUploadProgressAction = (payload:{mediaItem:IFeedMediaItem,mediaFor:'media'|'context',contextIndex:number}) => {
  return {
    type: CreateFeedTypes.SET_FEED_VIDEO_UPLOAD_PROGRESS,
    payload
  };
};
export const setVideoCompressingProgressAction = (payload?: number) => {
  return {
    type: CreateFeedTypes.SET_FEED_COMPRESSING_VIDEO_PROGRESS,
    payload
  };
};
export const setVideoUploadingProgressAction = (payload: number | undefined) => {
  console.log("UPLOAD ACTIONNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNn", payload);
  
  return {
    type: CreateFeedTypes.SET_FEED_UPLOADING_VIDEO_PROGRESS,
    payload
  };
};