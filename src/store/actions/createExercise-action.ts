import {
  ICreateExercise,
  ICreateExerciseErrorMessage,
  IExercise,
  IFeedMediaItem,
  IMediaSize,
  IUploadImage,
  IWorkoutSelectedMultiItem,
} from '../../types/types';
import {CreateExerciseTypes} from '../costants';

export const setContextAction = (payload: any) => {
  return {
    type: CreateExerciseTypes.SET_CONTEXT,
    payload,
  };
};

export const setMediaAction = (payload: IFeedMediaItem[]) => {
  return {
    type: CreateExerciseTypes.SET_MEDIA,
    payload,
  };
};

export const setTitleAction = (payload: string) => {
  return {
    type: CreateExerciseTypes.SET_TITLE,
    payload,
  };
};

export const setErrorMessageAction = (
  payload?: ICreateExerciseErrorMessage,
) => {
  return {
    type: CreateExerciseTypes.SET_ERROR_MESSAGES,
    payload,
  };
};

export const setDescriptionAction = (payload?: string) => {
  return {
    type: CreateExerciseTypes.SET_DESCRIPTION,
    payload,
  };
};

export const setBodyPartsAction = (payload?: IExercise[]) => {
  return {
    type: CreateExerciseTypes.SET_BODY_PARTS,
    payload,
  };
};

export const setSelectedEquipmentsAction = (
  payload: IWorkoutSelectedMultiItem[],
) => {
  return {
    type: CreateExerciseTypes.SET_SELECTED_EQUIPMENTS,
    payload,
  };
};

export const setDuration = (payload: string) => {
  return {
    type: CreateExerciseTypes.SET_DURATION,
    payload,
  };
};

export const setLevel = (payload: string) => {
  return {
    type: CreateExerciseTypes.SET_LEVEL,
    payload,
  };
};

export const setState = (payload: ICreateExercise) => {
  return {
    type: CreateExerciseTypes.SET_STATE,
    payload,
  };
};
export const delState = (payload: {}) => {
  return {
    type: CreateExerciseTypes.DELETE_ALL_STATE,
    payload,
  };
};
export const uploadMediaForExerciseCreatingAction = (payload: {
  mediaList: IUploadImage[];
  size: IMediaSize;
}) => {
  return {
    type: CreateExerciseTypes.UPLOAD_EXERCISE_MEDIA_CREATING,
    payload,
  };
};
export const getExerciseVideoUploadProgressAction = (
  public_key: string,
  size: IMediaSize
) => {
  return {
    type: CreateExerciseTypes.GET_VIDEO_UPLOADING_PROGRESS,
    public_key,
    size
  };
};