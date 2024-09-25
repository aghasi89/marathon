import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {coverVideosProgressSelector} from '../../../../../../store/selectors/feed-selector';
import chackUploadingProgress from '../../../../../../utils/bunny.net/chackUploadingProgress';
import {
  IExercise,
  IFeedMediaItem,
  ISelectedFeedData,
  IWorkoutSelectedMultiItem,
} from '../../../../../../types/types';
import {downloadMediaFromBunny} from '../../../../../../utils/bunny.net';

import {
  setMediaAction,
  setSelectedBodyPartsAction,
  setSelectedEquipmentsAction,
} from '../../../../../../store/actions/createFeed-action';
import {createFeedStateSelector} from '../../../../../../store/selectors/create-feed-selector';
import {profileSelector} from '../../../../../../store/selectors/profile-selector';
import {BunnyAdministrativeDirectories} from '../../../../../../utils/bunny.net/bunnyConfig';

export default () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector(createFeedStateSelector);
  const user = useSelector(profileSelector);
  const coverVideosProgress = useSelector(coverVideosProgressSelector);
  const [equipmentsModalVisibility, setEquipmentsModalVisibility] =
    useState<boolean>(false);
  const [bodyPartsModalVisibility, setBodyPartsModalVisibility] =
    useState<boolean>(false);

  useEffect(() => {
    if (state.workoutType === 'manyVideos')
      equipmentsAndBodyPartsFilterHandle();
  }, []);
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
      type: state.feedType,
      liveInfoData: {
        availablePlacesExist: true,
        isJoined: true,
        isOwner: true,
      },
      hashtagsData: {
        feedCategory:
          state?.selectedCategories && state?.selectedCategories[0]?.category
            ? state?.selectedCategories[0]?.category[0].name
            : undefined,
        hashtags: [],
      },
      description: state.text,
      selectedEquipmentsName: !!state.selectedEquipments?.length
        ? state.selectedEquipments?.length === 1
          ? state.selectedEquipments[0].name
          : `${state.selectedEquipments?.length} ${t('equipments')}`
        : t('noEquipments') ?? '',
      selectedBodyPartsName: !!state.selectedBodyParts?.length
        ? state.selectedBodyParts?.length === 1
          ? state.selectedBodyParts[0].slug
          : `${state.selectedBodyParts?.length} ${t('parts')}`
        : '',
    };
    return feedData;
  }, [state, user]);
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
  const equipmentsAndBodyPartsFilterHandle = useCallback(() => {
    const execisesList = state.selectedExercises
      ? [...state.selectedExercises]
      : [];
    let body_parts: IExercise[] = [],
      equipments: IWorkoutSelectedMultiItem[] = [];
    execisesList?.forEach(execises => {
      execises.body_parts?.forEach(body_part => {
        const isInclude =
          body_parts.findIndex(el => el.id === body_part.id) >= 0;
        if (!isInclude) {
          body_parts = [...body_parts, body_part];
        }
      });
    });
    execisesList?.forEach(execises => {
      execises.equipments?.forEach(equipment => {
        const isInclude =
          equipments.findIndex(el => el.id === equipment.id) >= 0;
        if (!isInclude) {
          equipments = [
            ...equipments,
            {
              id: equipment.id,
              name: equipment.name_en,
              url: downloadMediaFromBunny({
                public_key: equipment.image,
                mediaType: 'image',
                customDir: BunnyAdministrativeDirectories.EQUIPMENT,
              })?.url,
            },
          ];
        }
      });
    });
    equipments && dispatch(setSelectedEquipmentsAction(equipments));
    body_parts && dispatch(setSelectedBodyPartsAction(body_parts));
  }, [state]);
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
