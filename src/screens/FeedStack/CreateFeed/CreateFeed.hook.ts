import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import transformSelectedFeedDataToEditData from '../../../utils/dataTransformHelpers/createFeed/transformSelectedFeedDataToEditData';
import transformCreateFeedData from '../../../utils/dataTransformHelpers/createFeed/transformCreateFeedData';
import { currencyTypesSelector } from '../../../store/selectors/finansical-selector';
import {
  selectedDraftFeedSelector,
  selectedFeedSelector,
} from '../../../store/selectors/feed-selector';
import { createFeedStateSelector } from '../../../store/selectors/create-feed-selector';
import { profileSelector } from '../../../store/selectors/profile-selector';
import {
  createDraftFeedAction,
  editFeedAction,
  getFeedCategoriesAction,
  getFeedMeasurmentsAction,
  setFeedListAction,
} from '../../../store/actions/feed-action';
import {
  setComponentsAction,
  setCreatorAction,
  setErrorMessageAction,
  setFeedTypeAction,
  setMediaAction,
  setState,
  setVideoCompressingProgressAction,
  setVideoUploadingProgressAction,
  setWorkoutTypeAction,
} from '../../../store/actions/createFeed-action';
import { MainNavigationParamList } from '../../../navigation/MainNavigation';
import { ICreateFeedErrorMessage } from '../../../types/types';
import { getData } from '../../../utils/local_storage';
import { setShowSelectedRegionPage } from '../../../store/actions/administrative-action';

type Props = NativeStackScreenProps<MainNavigationParamList, 'CREATE_FEED'>;

export default () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const dispatch = useDispatch();
  const user = useSelector(profileSelector);
  const selectedFeed = useSelector(selectedFeedSelector);
  const selectedDraftFeed = useSelector(selectedDraftFeedSelector);
  const currencyList = useSelector(currencyTypesSelector);
  const state = useSelector(createFeedStateSelector);
  const { t } = useTranslation();
  const [isDisabledPrevious, setIsDisabledPrevious] = useState<boolean>(true);
  const [postButtonLoading, setPostButtonLoading] = useState<boolean>(false);
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(1);
  const [geo, setGeo] = useState<string>('');
  const [actionModalVisibility, setActionModalVisibility] =
    useState<boolean>(false);
  const { type, channelId, isEditing, workoutType } = route?.params;
  const staticData = {
    package: {
      headerTitle: isEditing ? t('editPack') : t('createPack'),
      steps: ['package 1', 'package 2', 'package 3', 'package 4', ''],
    },
    live: {
      headerTitle: t('createLiveTraining'),
      steps: ['live 1', 'live 2', 'live 3', ''],
    },
    article: {
      headerTitle: t('createAnArticle'),
      steps: [],
    },
    recipe: {
      headerTitle: t('createRecipe'),
      steps: [
        t('information'),
        t('ingredients'),
        t('preparationSteps'),
        t('caloriesAndMore'),
        '',
      ],
    },
    basic: {
      headerTitle: t('createPublication'),
      steps: [],
    },
    workout: {
      headerTitle: t('createWorkout'),
      steps:
        workoutType === 'singleVideo'
          ? [t('information'), t('information'), t('information'), '']
          : [t('information'), t('information'), t('information'), ''],
    },
    exercise: {
      headerTitle: '',
      steps: [],
    },
    feed: {
      headerTitle: '',
      steps: [],
    },
  };

  useEffect(() => {
    getData('selectedRegion').then(region => {
      if (region) {
        setGeo(region.name);
      }
    });
  }, []);

  useEffect(() => {
    !isEditing && type && dispatch(createDraftFeedAction({ type }));
    dispatch(getFeedMeasurmentsAction());
    dispatch(setCreatorAction(user?.id));
    if (type) {
      dispatch(getFeedCategoriesAction(type));
      dispatch(setFeedTypeAction(type));
      if (type === 'workout') {
        dispatch(setWorkoutTypeAction(workoutType));
      }
    }
  }, []);

  useEffect(() => {
    if (
      ((isEditing && selectedFeed) || (!isEditing && selectedDraftFeed)) &&
      currencyList
    ) {
      const currency = currencyList?.find(
        el => el.id == selectedFeed?.currency_id,
      );
      dispatch(
        setState(
          transformSelectedFeedDataToEditData(
            isEditing ? selectedFeed : selectedDraftFeed,
            user,
            currency,
            isEditing,
          ),
        ),
      );
    }
  }, [selectedFeed, currencyList, isEditing, selectedDraftFeed]);

  const backIconPressHandle = useCallback(() => {
    setActionModalVisibility(true);
  }, []);
  const stepperButtonsPressHandle = useCallback(
    (action: 'previous' | 'next') => {      
      setSelectedStepIndex(current => {
        if (current === 1 || current === 3) {
          if (
            type === 'recipe' &&
            state?.ingredients_string &&
            !!!state?.components?.length
          ) {
            createComponents();
          }
        }
        if (action === 'next' && type) {
          if (current < staticData[type]?.steps.length) {
            if (current === 1) {
              setIsDisabledPrevious(false);
            }
            if (requiredFieldsValidationChackHandle(current)) {
              if (!isEditing) {                
                // const data = transformCreateFeedData(geo, state, type, user);
                // type &&
                //   dispatch(editFeedAction(type, data, selectedDraftFeed?.id));
              }
              if (isEditing && current === 2) {
                return current + 2;
              } else {
                return current + 1;
              }
            }
            return current;
          } else {
            return current;
          }
        } else {
          if (current > 1) {
            if (current - 1 === 1) {
              setIsDisabledPrevious(true);
            }
            if (!isEditing) {
              const data = transformCreateFeedData(geo, state, type, user);
              type &&
                dispatch(editFeedAction(type, data, selectedDraftFeed?.id));
            }
            if (isEditing && current === 4) {
              return current - 2;
            } else {
              return current - 1;
            }
          } else {
            return current;
          }
        }
      });
    },
    [state, selectedDraftFeed, type, user, geo],
  );

  const postButtonPressHandle = useCallback(() => {
    if (requiredFieldsValidationChackHandle()) {
      const data = {
        ...transformCreateFeedData(geo, state, type, user),
        is_draft: false,
      };
      let duration = 0;
      if (state?.selectedExercises && state?.selectedExercises?.length > 0) {
        state.selectedExercises.map(item => {
          if (item.time && item.rest_time) {
            duration += Number(item.time) + Number(item.rest_time);
          }
        });
      }
      if (duration > 0) data.duration = duration;
      if (selectedFeed || selectedDraftFeed) {
        setPostButtonLoading(true)
        type &&
          dispatch(
            editFeedAction(
              type,
              data,
              isEditing ? selectedFeed?.id : selectedDraftFeed?.id,
              (status) => {
                if (status === 'success') {
                  dispatch(setFeedListAction([])) //temporary---------------!!
                  setPostButtonLoading(false)
                  if (channelId) {
                    navigation.navigate('CHANNEL', {
                      channelId: channelId,
                    });
                  } else {
                    navigation.reset({ routes: [{ name: 'TAB_NAVIGATION_STACK' }] });
                  }
                  // dispatch(setState({}))
                  dispatch(setMediaAction([]));
                  dispatch(setState({}));
                  dispatch(setVideoUploadingProgressAction(undefined));
                  dispatch(setVideoCompressingProgressAction(undefined));
                }
              }
            ),
          );
      }
    }
  }, [state, selectedFeed, selectedDraftFeed, channelId, type, user, geo]);

  const packageValidationChackHandle = useCallback(
    (stepIndex?: number) => {
      const errorMessages: ICreateFeedErrorMessage | undefined = {};
      switch (stepIndex) {
        case 1:
          if (!state?.media?.length)
            errorMessages.coverMedia = 'This field is required';
          if (!state?.title?.length)
            errorMessages.title = 'This field is required';
          if (!state?.selectedCategories?.length)
            errorMessages.category = 'This field is required';
          if (!state?.language)
            errorMessages.language = 'This field is required';
          dispatch(setErrorMessageAction(errorMessages));
          return !Object.values(errorMessages).filter(
            (el: string) => el && el.length > 0,
          ).length;
        case 2:
          if (!state?.start_day)
            errorMessages.datetime = 'This field is required';
          if (!state?.duration)
            errorMessages.duration = 'This field is required';
          if (state?.feedPaymentType === 'paid' && !state?.selectedCurrency?.name)
            errorMessages.currency = 'Please select currency';
          if (
            state?.feedPaymentType === 'paid' &&
            ((state?.price && state?.price < 1) || !state?.price)
          )
            errorMessages.price = 'Please insert price';
          if (
            !state?.is_individual &&
            ((state?.user_count && state?.user_count < 2) || !state?.user_count)
          )
            errorMessages.user_count =
              'Please insert groupe available places count';
          dispatch(setErrorMessageAction(errorMessages));
          return !Object.values(errorMessages).filter(
            (el: string) => el && el.length > 0,
          ).length;
        default:
          return true;
      }
    },
    [state],
  );
  const recipeValidationChackHandle = useCallback(
    (stepIndex?: number) => {
      const errorMessages: ICreateFeedErrorMessage | undefined = {};
      switch (stepIndex) {
        case 1:
          if (!state?.media?.length)
            // errorMessages.coverMedia = 'This field is required';
          if (!state?.title?.length)
            errorMessages.title = 'This field is required';
          if (!state?.selectedCategories?.length)
            errorMessages.category = 'This field is required';
          dispatch(setErrorMessageAction(errorMessages));
          return !Object.values(errorMessages).filter(
            (el: string) => el && el.length > 0,
          ).length;
        case 2:
          if (!state?.components?.length && !state?.ingredients_string?.length)
            errorMessages.ingredients = 'This field is required';
          dispatch(setErrorMessageAction(errorMessages));
          return !errorMessages.ingredients?.length;
        case 3:
          if (
            !state?.preparation_steps?.length ||
            !state?.preparation_steps[0].text?.length
          )
            errorMessages.preparation_steps = 'This field is required';
          dispatch(setErrorMessageAction(errorMessages));
          return !Object.values(errorMessages).filter(
            (el: string) => el && el.length > 0,
          ).length;
        case 4:
          if (!state?.protein) errorMessages.protein = 'This field is required';
          if (!state?.carbohydrates)
            errorMessages.carbohydrates = 'This field is required';
          if (!state?.fat) errorMessages.fat = 'This field is required';
          if (!state?.duration)
            errorMessages.duration = 'This field is required';
          dispatch(setErrorMessageAction(errorMessages));
          return !Object.values(errorMessages).filter(
            (el: string) => el && el.length > 0,
          ).length;
        default:
          return true;
      }
    },
    [state],
  );
  const liveValidationChackHandle = useCallback(
    (stepIndex?: number) => {
      const errorMessages: ICreateFeedErrorMessage | undefined = {};
      switch (stepIndex) {
        case 1:
          if (!state?.media?.length)
            errorMessages.coverMedia = 'This field is required';
          if (!state?.title?.length)
            errorMessages.title = 'This field is required';
          if (!state?.selectedCategories?.length)
            errorMessages.category = 'This field is required';
          if (!state?.language)
            errorMessages.language = 'This field is required';
          dispatch(setErrorMessageAction(errorMessages));
          return !Object.values(errorMessages).filter(
            (el: string) => el && el.length > 0,
          ).length;
        case 2:
          if (!state?.start_day)
            errorMessages.datetime = 'This field is required';
          if (!state?.duration)
            errorMessages.duration = 'This field is required';
          if (state?.feedPaymentType === 'paid' && !state?.selectedCurrency?.name)
            errorMessages.currency = 'Please select currency';
          if (
            state?.feedPaymentType === 'paid' &&
            ((state?.price && state?.price < 1) || !state?.price)
          )
            errorMessages.price = 'Please insert price';
          dispatch(setErrorMessageAction(errorMessages));
          return !Object.values(errorMessages).filter(
            (el: string) => el && el.length > 0,
          ).length;
        default:
          return true;
      }
    },
    [state],
  );
  const publicationValidationChackHandle = useCallback(() => {
    const errorMessages: ICreateFeedErrorMessage | undefined = {};
    if (!state?.media?.length)
      errorMessages.coverMedia = 'This field is required';
    dispatch(setErrorMessageAction(errorMessages));
    return !errorMessages.coverMedia?.length;
  }, [state, selectedStepIndex]);
  const articleValidationChackHandle = useCallback(() => {
    const errorMessages: ICreateFeedErrorMessage | undefined = {};
    if (!state?.media?.length)
      errorMessages.coverMedia = 'This field is required';
    if (!state?.title?.length) errorMessages.title = 'This field is required';
    if (!state?.selectedCategories?.length)
      errorMessages.category = 'This field is required';
    if (!state?.language) errorMessages.language = 'This field is required';
    dispatch(setErrorMessageAction(errorMessages));
    return !Object.values(errorMessages).filter(
      (el: string) => el && el.length > 0,
    ).length;
  }, [state, selectedStepIndex]);
  const workoutValidationChackHandle = useCallback(
    (stepIndex?: number) => {
      const errorMessages: ICreateFeedErrorMessage | undefined = {};
      switch (stepIndex) {
        case 1:
          if (!state?.media?.length)
            // errorMessages.coverMedia = 'This field is required';
          if (!state?.title?.length)
            errorMessages.title = 'This field is required';
          if (!state?.selectedCategories?.length)
            errorMessages.category = 'This field is required';
          if (!state?.language)
            errorMessages.language = 'This field is required';
          dispatch(setErrorMessageAction(errorMessages));
          return !Object.values(errorMessages).filter(
            (el: string) => el && el.length > 0,
          ).length;
        case 2:
          if (
            !state?.selectedExercises?.length &&
            state?.workoutType === 'manyVideos'
          ) {
            errorMessages.exercises =
              '*This field is required,This field is requiredThis field is requiredThis field is requiredThis field is requiredThis field is requiredThis field is requiredThis field is requiredThis field is required';
            dispatch(setErrorMessageAction(errorMessages));
            return !Object.values(errorMessages).filter(
              (el: string) => el && el.length > 0,
            ).length;
          } else {
            return true;
          }
        default:
          return true;
      }
    },
    [state],
  );
  const requiredFieldsValidationChackHandle = useCallback(
    (stepIndex?: number) => {
      switch (type) {
        case 'package':
          return packageValidationChackHandle(stepIndex);
        case 'recipe':
          return recipeValidationChackHandle(stepIndex);
        case 'live':
          return liveValidationChackHandle(stepIndex);
        case 'basic':
          return publicationValidationChackHandle();
        case 'article':
          return articleValidationChackHandle();
        case 'workout':
          return workoutValidationChackHandle(stepIndex);
        default:
          return true;
      }
    },
    [state],
  );
  const createComponents = useCallback(() => {
    const ingridientsList = state?.ingredients_string
      ?.trim()
      .split(`\n`)
      .filter(el => el)
      .map(el => ({ name: el }));
    dispatch(
      setComponentsAction(
        ingridientsList && ingridientsList?.length > 1
          ? ingridientsList
          : ingridientsList
            ? [...ingridientsList, { name: '' }]
            : [{ name: '' }],
      ),
    );
  }, [state]);

  const actionModalCancleHandle = useCallback(() => {
    setActionModalVisibility(false);
  }, []);
  const handleGoBack = useCallback(() => {    
    setActionModalVisibility(false);
    navigation.goBack();
    dispatch(setMediaAction([]));
    dispatch(setState({}));
    dispatch(setVideoUploadingProgressAction(undefined));
    dispatch(setVideoCompressingProgressAction(undefined));
  }, []);

  useEffect(() => {
    if (!user?.geolocation) {
      dispatch(setShowSelectedRegionPage(true))
    }
  }, [user])

  return {
    backIconPressHandle,
    t,
    stepperButtonsPressHandle,
    isDisabledPrevious,
    selectedStepIndex,
    state,
    dispatch,
    postButtonPressHandle,
    staticData,
    type,
    workoutType,
    actionModalCancleHandle,
    actionModalVisibility,
    handleGoBack,
    postButtonLoading
  };
};
