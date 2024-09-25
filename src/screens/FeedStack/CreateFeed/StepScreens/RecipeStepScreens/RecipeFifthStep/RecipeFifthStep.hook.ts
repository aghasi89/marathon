import {useCallback, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {
  IFeedMediaItem,
  ISelectedFeedData,
  ISelectedFeedIngredientsData,
} from '../../../../../../types/types';
import {createFeedStateSelector} from '../../../../../../store/selectors/create-feed-selector';
import {measurmentUnitsListSelector} from '../../../../../../store/selectors/feed-selector';
import {languagesSelector, profileSelector} from '../../../../../../store/selectors/profile-selector';
import {downloadMediaFromBunny} from '../../../../../../utils/bunny.net';

export default () => {
  const {t} = useTranslation();
  const state = useSelector(createFeedStateSelector);
  const languages = useSelector(languagesSelector);
  const user = useSelector(profileSelector);
  const measurementUnitsList = useSelector(measurmentUnitsListSelector);
  const [images, setImages] = useState<{url: string}[]>([]);
  const [imageViewModalVisibility, setImageViewModalVisibility] =
    useState<boolean>(false);
  const imagePressHandler = useCallback((url?: string) => {
    url && setImages([{url}]);
    setImageViewModalVisibility(true);
  }, []);
  const imageViewModalCloseHandle = useCallback(() => {
    setImageViewModalVisibility(false);
  }, []);
  const calcCalories = useCallback(
    (protein?: number, fat?: number, carbs?: number) => {
      return 4 * (protein ?? 0) + 9 * (fat ?? 0) + 4 * (carbs ?? 0);
    },
    [],
  );
  const data = useMemo(() => {
    let ingridients: ISelectedFeedIngredientsData[] = [];
    if (state.feedType === 'recipe') {      
      state.components?.forEach(el => {
        if (!!el.name?.length)
          ingridients = [
            ...ingridients,
            {
              title: el.name,
              mass: undefined,
              measurement: '',
            },
          ];
      });
    }
    const newMediaList: IFeedMediaItem[] = (state?.media || [])?.map(item => {
      const coverMedia = downloadMediaFromBunny({
        public_key: item.url,
        mediaType: item.type,
        aspectRatio: item.size,
        userDir:user?.id,
        imageDir:'feed'
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
        liveDuration: `${state?.duration} ${t('min')} `,
        mediaList: newMediaList,
      },
      title: state.title,
      progressData: {
        calories: calcCalories(state.protein, state.fat, state.carbohydrates),
        carbs: state.carbohydrates ?? 0,
        fat: state.fat ?? 0,
        protein: state.protein ?? 0,
      },
      recipeChipsData: {
        cookingTime: state.duration?.toString() ?? '0',
        apportionment: state.apportionment,
        elements: [
          {
            title: `${state?.serving_size ?? ''} ${
              state.measurementSelectedUnit?.name ?? ''
            }`,
          },
          {
            title: languages?.find(el => el.id === state.language)?.name,
          },
          // ...state.feed_category?.map()
        ],
      },
      ingredientsData: ingridients,
      preparationSteps: state.preparation_steps?.map(el => el.text ?? ''), //?
      commentsCount: 0,
      isBookmarked: false,
      isLiked: false,
      likesCount: 0,
      type: state.feedType,
      hashtagsData: {
        hashtags: state.tag?.map(el => el.toString()), //?
      },
      description:
        state.feedType === 'live'
          ? state.text
          : state.context?.map(el => {
              if (el.type === 'text') {
                return el.value;
              }
            })[0],
    };
    return feedData;
  }, [state, languages, measurementUnitsList,user]);

  return {
    t,
    imagePressHandler,
    imageViewModalCloseHandle,
    imageViewModalVisibility,
    images,
    data,
    state,
  };
};
