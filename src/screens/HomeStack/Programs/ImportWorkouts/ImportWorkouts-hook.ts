import {useRoute, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IExecise} from '../../../../store/reducers/execises-reducer';
import {IWorkout} from '../../../../store/reducers/workout-reducer';
import {
  execiseSelectedFilterListSelector,
  exerciseListSelector,
} from '../../../../store/selectors/execise-selector';
import {
  workoutListSelector,
  workoutSelectedFilterListSelector,
} from '../../../../store/selectors/workout-selector';
import {setExerciseSelectedFilterList} from '../../../../store/actions/exercises-action';
import {setWorkoutSelectedFilterList} from '../../../../store/actions/workout-action';
import {programDaySelector} from '../../../../store/selectors/programs-selector';
import {setDays} from '../../../../store/actions/program-action';
import {activityListSelector} from '../../../../store/selectors/activity-selector';
import {IActivity} from '../../../../store/reducers/activity-reducer';
import ImportWorkout from './ImportWorkouts-reducer';

export default props => {
  const {state, dispatchState} = ImportWorkout();
  const [value, setValue] = useState<number>(0);
  const [isOpenedEditSheet, setIsOpenedEditSheet] = useState<boolean>(false);
  const [isFocus, setIsfocus] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>();
  const [index, setIndex] = useState<number>(0);
  const [indexTab, setIndexTab] = useState<number>(0);
  const [selectedData, setSelectedData] = useState<Array<any>>([]);
  const badges = [
    {
      title: 'Recent',
    },
    {
      title: 'Library',
    },
    {
      title: 'Bookmarks',
    },
  ];
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const dayIndex = route.params?.dayIndex ?? null;
  const playIndex = route.params?.playIndex ?? null;
  const activityIndex = route.params?.index ?? null;

  const days = useSelector(programDaySelector);

  const checkIsSubmitedExercise = (id: number) => {
    for (let i = 0; i < state.submitedWorkouts.exercises.length; i++) {
      const submitedExercise = state.submitedWorkouts.exercises[i];
      if (submitedExercise.id == id) {
        return true;
      }
    }
    return false;
  };
  const checkIsSubmitedWorkout = (id: number) => {
    for (let i = 0; i < state.submitedWorkouts.workouts.length; i++) {
      const submitedWorkout = state.submitedWorkouts.workouts[i];
      if (submitedWorkout.id == id) {
        return true;
      }
    }
    return false;
  };

  const addExercise = (exercise: IExecise) => {
    if (!checkIsSubmitedExercise(exercise.id)) {
      dispatchState({
        type: 'SET_ADD_EXERCISE',
        payload: [...state.submitedWorkouts.exercises, exercise],
      });
    } else {
      let array = [...state.submitedWorkouts.exercises];
      const findIndex = array.findIndex(element => {
        return element.id == exercise.id;
      });
      array.splice(findIndex, 1);
      dispatchState({type: 'SET_ADD_EXERCISE', payload: array});
    }
  };

  const addWorkout = (workout: IWorkout) => {
    if (!checkIsSubmitedWorkout(workout.id)) {
      dispatchState({
        type: 'SET_ADD_WORKOUT',
        payload: [...state.submitedWorkouts.workouts, workout],
      });
    } else {
      let array = [...state.submitedWorkouts.workouts];
      const findIndex = array.findIndex(element => {
        return element.id == workout.id;
      });
      array.splice(findIndex, 1);
      dispatchState({
        type: 'SET_ADD_WORKOUT',
        payload: array,
      });
    }
  };
  const checkIsSubmitedActivity = (id: number) => {
    for (let i = 0; i < state.submitedActivities.length; i++) {
      const submitedActivity = state.submitedActivities[i];
      if (submitedActivity.id == id) {
        return true;
      }
    }
    return false;
  };
  const addActivity = (activity: IActivity) => {
    if (!checkIsSubmitedActivity(activity.id)) {
      dispatchState({
        type: 'SET_ADD_ACTIVITY',
        payload: [...state.submitedActivities, activity],
      });
    } else {
      let array = [...state.submitedActivities];
      const findIndex = array.findIndex(element => {
        return element.id == activity.id;
      });
      array.splice(findIndex, 1);
      dispatchState({
        type: 'SET_ADD_ACTIVITY',
        payload: array,
      });
    }
  };

  const filterText = text => {
    setSearchText(text);
  };

  const exerciseList = useSelector(exerciseListSelector);
  const workoutList = useSelector(workoutListSelector);
  const activityList = useSelector(activityListSelector);
  const exerciseSelectedFilterList = useSelector(
    execiseSelectedFilterListSelector,
  );
  const workoutSelectedFilterList = useSelector(
    workoutSelectedFilterListSelector,
  );

  const selectedFilterList: any = () => {
    switch (index) {
      case 0:
        return exerciseSelectedFilterList;
      case 1:
        return workoutSelectedFilterList;
      default:
        break;
    }
  };
  useEffect(() => {
    setSelectedData(selectedFilterList());
  }, [index, selectedFilterList]);

  const deleteItem = (value: any) => {
    for (let i = 0; i < selectedData.length; i++) {
      if (selectedData[i].id === value.id) {
        let list = [...selectedData];
        list.splice(i, 1);
        switch (index) {
          case 0:
            dispatch(setExerciseSelectedFilterList(list));
            break;
          case 1:
            dispatch(setWorkoutSelectedFilterList(list));
            break;
          default:
            break;
        }
      }
    }
  };

  const importWorkouts = () => {
    let array = [...days];
    if (playIndex === 0) {
      array[dayIndex].workouts = {
        ...array[dayIndex].workouts,
        activities: [
          ...array[dayIndex].workouts.activities,
          state.submitedActivities,
        ],
      };
    } else {
      array[dayIndex].workouts = {
        ...array[dayIndex].workouts,
        workouts: [
          ...array[dayIndex].workouts.workouts,
          state.submitedWorkouts,
        ],
      };
    }
    dispatch(setDays(array));
  };

  const leftIconPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const navigateFilterWorkout = useCallback(() => {
    navigation.navigate('FilterWorkout', {index: index});
  }, [navigation, index]);

  const onImportActivity = () => {
    importWorkouts();
    navigation.navigate('CreateWorkouts', {
      activityList: state.submitedActivities,
      dayIndex: dayIndex,
      playIndex: playIndex,
    });
  };

  const onImportWorkout = () => {
    importWorkouts();
    navigation.navigate('CreateWorkouts', {
      exerciseList: state.submitedWorkouts.exercises,
      workoutList: state.submitedWorkouts.workouts,
      dayIndex: dayIndex,
      playIndex: playIndex,
    });
  };

  return {
    badges,
    state,
    selectedData,
    deleteItem,
    index,
    setIndex,
    isFocus,
    setIsfocus,
    searchText,
    filterText,
    indexTab,
    setIndexTab,
    dayIndex,
    exerciseList,
    workoutList,
    checkIsSubmitedExercise,
    checkIsSubmitedWorkout,
    addExercise,
    addWorkout,
    importWorkouts,
    playIndex,
    activityList,
    checkIsSubmitedActivity,
    addActivity,
    leftIconPress,
    onImportActivity,
    value,
    setValue,
    isOpenedEditSheet,
    setIsOpenedEditSheet,
    activityIndex,
    onImportWorkout,
    navigateFilterWorkout,
  };
};
