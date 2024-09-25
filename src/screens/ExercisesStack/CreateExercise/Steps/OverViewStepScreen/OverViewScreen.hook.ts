import {useCallback, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {
  IExercise,
  IFeedMediaItem,
  ISelectedFeedData,
} from '../../../../../types/types';
import {downloadMediaFromBunny} from '../../../../../utils/bunny.net';
import {createExerciseStateSelector} from '../../../../../store/selectors/create-exercise-selector';
import {profileSelector} from '../../../../../store/selectors/profile-selector';

export default () => {
  const {t} = useTranslation();
  const state = useSelector(createExerciseStateSelector);
  const user = useSelector(profileSelector);
  const [equipmentsModalVisibility, setEquipmentsModalVisibility] =
    useState<boolean>(false);
  const [bodyPartsModalVisibility, setBodyPartsModalVisibility] =
    useState<boolean>(false);
  const data = useMemo(() => {
    const newMediaList: IFeedMediaItem[] = (state?.media || [])?.map(item => {
      const coverMedia = downloadMediaFromBunny({
        public_key: item.url,
        mediaType: item.type,
        aspectRatio: item.size,
        userDir: user?.id,
        imageDir: 'feed',
      });
      return {
        url:
          item?.type !== 'videoLink'
            ? !item?.inProgress
              ? coverMedia?.url
              : ''
            : item?.url,
        thumbnail: !item?.inProgress ? coverMedia?.thumbnailURL : item.url,
        animationURL: !item?.inProgress ? coverMedia?.previewAnimationURL : '',
        size: item.size,
        type: item.type,
        uploadingProgress: item.uploadingProgress,
        inProgress: item.inProgress,
      };
    });
    const feedData: ISelectedFeedData = {
      mediaData: {
        mediaList: newMediaList,
      },
      title: state.title,
      description: state.description,
      selectedEquipmentsName: !!state.equipments?.length
        ? state.equipments?.length === 1
          ? state.equipments[0].name
          : `${state.equipments?.length} ${t('equipments')}`
        : '',
      selectedBodyPartsName: !!state.body_parts?.length
        ? state.body_parts?.length === 1
          ? state.body_parts[0].slug
          : `${state.body_parts?.length} ${t('parts')}`
        : '',
    };
    return feedData;
  }, [state]);
  const equipentsButtonPressHandle = useCallback(() => {
    setEquipmentsModalVisibility(true);
  }, []);
  const equipentsModalCloseHandle = useCallback(() => {
    setEquipmentsModalVisibility(false);
  }, []);
  const bodyPartsButtonPressHandle = useCallback(() => {
    setBodyPartsModalVisibility(true);
  }, []);
  const bodyPartsModalCloseHandle = useCallback(() => {
    setBodyPartsModalVisibility(false);
  }, []);
  const getDifference = (array1: any[], array2?: IExercise[]) => {
    if (array1.length > 0 && array2 && array2.length > 0) {
      return array1.filter(object1 => {
        return array2.some(object2 => {
          return object1.id === object2.id;
        });
      });
    } else {
      return [];
    }
  };
  return {
    t,
    state,
    data,
    equipentsButtonPressHandle,
    bodyPartsButtonPressHandle,
    bodyPartsModalVisibility,
    equipmentsModalVisibility,
    getDifference,
    bodyPartsModalCloseHandle,
    equipentsModalCloseHandle,
  };
};
