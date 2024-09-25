import {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainNavigationParamList} from '../../../navigation/MainNavigation';
import {ICreateFeedErrorMessage} from '../../../types/types';
import {profileSelector} from '../../../store/selectors/profile-selector';
import {downloadMediaFromBunny} from '../../../utils/bunny.net';
import {
  createExercise,
  editExerciseAction,
  getMyExercisesList,
} from '../../../store/actions/feed-action';
import {selectedExerciseSelector} from '../../../store/selectors/feed-selector';
import {
  delState,
  setErrorMessageAction,
  setState,
} from '../../../store/actions/createExercise-action';
import {createExerciseStateSelector} from '../../../store/selectors/create-exercise-selector';
import { BunnyAdministrativeDirectories } from '../../../utils/bunny.net/bunnyConfig';

type Props = NativeStackScreenProps<MainNavigationParamList, 'CREATE_EXERCISE'>;

export default () => {
  const navigation = useNavigation<Props['navigation']>();
  const {t} = useTranslation();
  const state = useSelector(createExerciseStateSelector);
  const dispatch = useDispatch();
  const user = useSelector(profileSelector);
  const selectedExercise = useSelector(selectedExerciseSelector);
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(1);
  const [actionModalVisibility, setActionModalVisibility] =
    useState<boolean>(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (selectedExercise) {
      dispatch(
        setState({
          title: selectedExercise?.title,
          level: selectedExercise?.level,
          media: selectedExercise?.video
            ? [
                {
                  url: selectedExercise?.video,
                  type: 'video',
                  size: selectedExercise.size,
                },
              ]
            : '',
          duration: selectedExercise?.time?.toString(),
          description: selectedExercise?.description ?? '',
          body_parts: selectedExercise?.body_parts,
          equipments: selectedExercise?.equipments?.map(item => ({
            name: item.name_en,
            url: downloadMediaFromBunny({
              public_key: item.image,
              mediaType: 'image',
              customDir:BunnyAdministrativeDirectories.EQUIPMENT
            })?.url,
            id: item.id,
          })),
        }),
      );
    }
  }, [selectedExercise]);

  const staticData = {
    wallet: {
      headerTitle: '',
      steps: [t('information'), t('information'), t('muscleGroups'), ''],
    },
  };

  const handleBackIconPress = () => {
    setActionModalVisibility(true);
  };

  const exerciseValidationChackHandle = useCallback(
    (stepIndex?: number) => {
      const errorMessages: ICreateFeedErrorMessage | undefined = {};      
      switch (stepIndex) {
        case 1:
          if (!state?.media?.length)
            // errorMessages.coverMedia = 'This field is required';
          if (!state?.title?.length)
            errorMessages.title = 'This field is required';
          
          return !Object.values(errorMessages).filter(
            (el: string) => el && el.length > 0,
          ).length;
        case 2:
          if (state?.duration == 0)
            errorMessages.duration = 'This field is required';
          dispatch(setErrorMessageAction(errorMessages));
          return !Object.values(errorMessages).filter(
            (el: string) => el && el.length > 0,
          ).length;
        case 3:
          if (state?.body_parts?.length == 0)
            errorMessages.body_parts = 'This field is required';
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
  const handelNext = useCallback(() => {    
    if (exerciseValidationChackHandle(selectedStepIndex)) {
      setSelectedStepIndex(selectedStepIndex + 1);
    }
  }, [selectedStepIndex, state]);

  const handelPrevius = useCallback(() => {
    setSelectedStepIndex(selectedStepIndex - 1);
  }, [selectedStepIndex]);

  const handleCreateExercise = useCallback(() => {
    if (user) {
      setLoader(true);
      const payload = {
        creator: user.id,
        title: state?.title,
        level: state?.level,
        video: state?.media && state?.media?.[0]?.url ? state?.media[0].url : '',
        time: parseInt((state?.duration || 0)?.toString()),
        description: state?.description ?? '',
        body_parts: state?.body_parts?.map(el => {
          return el.id;
        }),
        equipments: state?.equipments?.map(el => {
          return el.id;
        }),
        size: state?.media ? state?.media[0].size : '16:9',
      };
      dispatch(
        createExercise(payload, () => {
          navigation.goBack();
          dispatch(getMyExercisesList());
          setLoader(false);
          // dispatch(setState({}));
          dispatch(delState({}));
        }),
      );
    }
  }, [state, user]);

  const handleEditExercise = useCallback(() => {
    setLoader(true);
    if (user)
      dispatch(
        editExerciseAction(
          selectedExercise.id,
          {
            title: state?.title,
            level: state?.level,
            video: state?.media ? state?.media[0].url : '',
            time: parseInt(state?.duration ?? '0'),
            description: state?.description,
            body_parts: state?.body_parts?.map(el => {
              return el.id;
            }),
            equipments: state?.equipments?.map(el => {
              return el.id;
            }),
            size: state?.media ? state?.media[0].size : '16:9',
          },
          status => {
            if (status === 'success') {
              dispatch(getMyExercisesList());
              //@ts-ignore
              navigation.goBack();
              setLoader(false);
              dispatch(delState({}));
              // dispatch(setState({}));
            }
          },
        ),
      );
  }, [selectedExercise, user, state]);
  const actionModalCancleHandle = useCallback(() => {
    setActionModalVisibility(false);
  }, []);
  const handleGoBack = useCallback(() => {
    setActionModalVisibility(false);
    navigation.goBack();
    dispatch(delState({}));
    // dispatch(setState({}));
  }, []);
  return {
    t,
    handleBackIconPress,
    staticData,
    selectedStepIndex,
    state,
    dispatch,
    handelPrevius,
    handelNext,
    handleCreateExercise,
    loader,
    selectedExercise,
    handleEditExercise,
    actionModalVisibility,
    handleGoBack,
    actionModalCancleHandle,
  };
};
