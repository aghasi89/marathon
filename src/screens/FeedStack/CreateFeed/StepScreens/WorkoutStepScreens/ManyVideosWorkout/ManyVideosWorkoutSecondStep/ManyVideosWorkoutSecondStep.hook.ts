import {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SheetManager} from 'react-native-actions-sheet';
import {IWorkoutSelectedMultiItem} from '../../../../../../../types/types';
import {setError} from '../../../../../../../store/actions/administrative-action';
import {
  editExerciseAction,
  getMyExercisesList,
} from '../../../../../../../store/actions/feed-action';
import {myExercisesListSelector} from '../../../../../../../store/selectors/feed-selector';
import {MainNavigationParamList} from '../../../../../../../navigation/MainNavigation';
import {downloadMediaFromBunny} from '../../../../../../../utils/bunny.net';
import {
  setErrorMessageAction,
  setSelectedExerciseItemAction,
  setSelectedExercisesAction,
} from '../../../../../../../store/actions/createFeed-action';
import {createFeedStateSelector} from '../../../../../../../store/selectors/create-feed-selector';
import {profileSelector} from '../../../../../../../store/selectors/profile-selector';

type Props = NativeStackScreenProps<MainNavigationParamList, 'CREATE_FEED'>;

export default () => {
  const navigation = useNavigation<Props['navigation']>();
  const user = useSelector(profileSelector);
  const state = useSelector(createFeedStateSelector);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const execisesList = useSelector(myExercisesListSelector);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getMyExercisesList());
    });
    dispatch(getMyExercisesList());
    return unsubscribe;
  }, []);

  const exerciseSelectHandle = useCallback(
    (selected?: IWorkoutSelectedMultiItem) => {
      let newList: IWorkoutSelectedMultiItem[] = state.selectedExercises
        ? [...state.selectedExercises]
        : [];
      const index = newList.findIndex(el => el.id === selected?.id);
      if (index >= 0) {
        newList.splice(index, 1);
      } else {
        if (selected) newList = newList ? [...newList, selected] : [selected];
      }
      dispatch(setSelectedExercisesAction(newList));
      !!state.errorMessages?.exercises?.length &&
        dispatch(
          setErrorMessageAction({...state.errorMessages, exercises: ''}),
        );
    },
    [state],
  );
  const exerciseCreateHandle = useCallback(() => {
    SheetManager.hide('exerciseListSheet');
    navigation.navigate('CREATE_EXERCISE');
  }, [state]);
  const handleChangeRestTime = useCallback(
    (value: number, selectedIndex: number) => {
      let newList = state.selectedExercises ? [...state.selectedExercises] : [];
      newList[selectedIndex].rest_time = `${Math.floor(value)}`;
      dispatch(setSelectedExercisesAction(newList));
    },
    [state],
  );
  const execisesListModalData = useMemo(() => {
    const data: IWorkoutSelectedMultiItem[] = execisesList?.map(item => {
      const media = downloadMediaFromBunny({
        public_key: item?.video ?? '',
        mediaType: 'video',
        userDir: user?.id,
        imageDir: 'feed',
      });
      return {
        name: item.title,
        url: media?.thumbnailURL ?? '',
        id: item.id,
        time: `${item.time}`,
        body_parts: item.body_parts,
        description: item.description ?? '',
        equipments: item.equipments,
        videoUrl: media?.url ?? '',
        title: item.title,
        level: item.level,
        rest_time: '10',
      };
    });
    return data ?? [];
  }, [execisesList]);
  const execisePressHandle = useCallback(
    (execise: IWorkoutSelectedMultiItem) => {
      dispatch(setSelectedExerciseItemAction(execise));
      SheetManager.show('changeExeciseSheet', {
        payload: {
          exercise: execise,
          onSave: (value: IWorkoutSelectedMultiItem) => {
            saveExeciseChangesHandle(value);
          },
        },
      });
    },
    [state],
  );
  const saveExeciseChangesHandle = useCallback(
    (value: IWorkoutSelectedMultiItem) => {
      value?.id !== undefined &&
        dispatch(
          editExerciseAction(
            value.id,
            {
              time: parseInt(value.time ?? '0'),
              equipments: value.equipments?.map(el => el.id),
              body_parts: value.body_parts?.map(el => el?.id),
            },
            status => {
              if (status === 'success') {
                const execisesList = state.selectedExercises
                  ? [...state.selectedExercises]
                  : [];
                const index = execisesList.findIndex(el => el.id === value.id);
                execisesList[index] = {
                  ...execisesList[index],
                  time: value.time,
                };
                dispatch(setSelectedExercisesAction(execisesList));
                SheetManager.hide('changeExeciseSheet');
              } else {
                dispatch(
                  setError({
                    buttonTitle: t('ok') ?? '',
                    text: t('somethingWrong'),
                    title: '',
                  }),
                );
              }
            },
          ),
        );
    },
    [state],
  );

  const plusButtonPressHandle = useCallback(() => {
    SheetManager.show('exerciseListSheet', {
      payload: {
        dataList: execisesListModalData,
        onSave: (value?: IWorkoutSelectedMultiItem[]) => {
          console.log(value);
          dispatch(setSelectedExercisesAction(value));
          !!state.errorMessages?.exercises?.length &&
            dispatch(
              setErrorMessageAction({...state.errorMessages, exercises: ''}),
            );
        },
        selectedList: state?.selectedExercises?.map(el => el.id),
        onPlusButtonPress: () => {
          exerciseCreateHandle();
        },
      },
    });
  }, [state, execisesListModalData]);
  return {
    t,
    state,
    plusButtonPressHandle,
    exerciseSelectHandle,
    handleChangeRestTime,
    execisePressHandle,
  };
};
