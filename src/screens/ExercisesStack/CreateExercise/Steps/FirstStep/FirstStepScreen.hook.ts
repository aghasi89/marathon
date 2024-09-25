import {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {coverVideosProgressSelector} from '../../../../../store/selectors/feed-selector';
import {loadingSelector} from '../../../../../store/selectors/administrative-selector';
import chackUploadingProgress from '../../../../../utils/bunny.net/chackUploadingProgress';
import {downloadMediaFromBunny} from '../../../../../utils/bunny.net';
import {IFeedMediaItem, IMediaSize, IUploadImage} from '../../../../../types/types';
import {
  setMediaAction,
  setErrorMessageAction,
  setTitleAction,
  setDescriptionAction,
  setDuration,
  uploadMediaForExerciseCreatingAction,
} from '../../../../../store/actions/createExercise-action';
import {createExerciseStateSelector} from '../../../../../store/selectors/create-exercise-selector';
import { profileSelector } from '../../../../../store/selectors/profile-selector';

export default () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector(createExerciseStateSelector);
  const user = useSelector(profileSelector);
  const uploading = useSelector(loadingSelector);
  const coverVideosProgress = useSelector(coverVideosProgressSelector);

  useEffect(() => {
    chackUploadingProgress(
      state.media ?? [],
      coverVideosProgress,
      (index, mediaArr) => {
        if (index > -1) {
          const newList = [...mediaArr];
          newList[index].inProgress = false;
          setTimeout(() => {
            dispatch(setMediaAction(newList));
          }, 1200);
        } else {
          dispatch(setMediaAction(mediaArr));
        }
      },
    );
  }, [coverVideosProgress]);

  const coverMediaUploadHandle = useCallback(
    (mediaList: IUploadImage[], size: IMediaSize) => {
      dispatch(
        uploadMediaForExerciseCreatingAction({
          mediaList,
          size,
        }),
      );
    },
    [state],
  );
  const coverCloseIconPressHandle = useCallback(() => {
    dispatch(setMediaAction([]));
  }, [state]);

  const inputValueChangeHandle = useCallback(
    (text: string) => {
      dispatch(setTitleAction(text));
      if (text.trim().length > 0)
        dispatch(setErrorMessageAction({...state.errorMessages, title: ''}));
    },
    [state],
  );

  const descriptionValueChangeHandle = useCallback((text: string) => {
    dispatch(setDescriptionAction(text));
  }, []);
  const changeDuration = (duration: number) => {
    dispatch(setDuration(duration.toString()));
  };
  const data = useMemo(():IFeedMediaItem[]|undefined => {
  const newMediaList=state?.media?.map(media=>{
      const coverMedia =
      downloadMediaFromBunny({
       public_key: media.url,
        mediaType:media.type,
        aspectRatio:media.size,
        userDir:user?.id,
        imageDir:'feed'
      });
    return {
      url:
      !media.inProgress ? coverMedia?.url : '',
      thumbnail:
      !media.inProgress
          ? coverMedia?.thumbnailURL
          : '',
      animationURL:
      !media.inProgress
          ? coverMedia?.previewAnimationURL
          : '',
      inProgress:media.inProgress,
      uploadingProgress:media.uploadingProgress,
      type:media.type
    };
    })
    return newMediaList
  }, [state.media,state.media?.length]);
  return {
    t,
    coverMediaUploadHandle,
    inputValueChangeHandle,
    coverCloseIconPressHandle,
    descriptionValueChangeHandle,
    state,
    uploading,
    changeDuration,
    data,
  };
};
