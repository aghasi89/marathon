import {useRoute, useNavigation} from '@react-navigation/native';
import {useEffect, useState, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {programDaySelector} from '../../../../store/selectors/programs-selector';
import CreateWorkoutsReducer from './CreateWorkouts-reducer';

export default props => {
  const {state, dispatchState} = CreateWorkoutsReducer();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string>('1');
  const [valueNumber, setValueNumber] = useState<string>('');
  const navigation = useNavigation();
  const route = useRoute<any>();
  const exerciseList = route.params?.exerciseList ?? [];
  const workoutList = route.params?.workoutList ?? [];
  const playIndex = route.params?.playIndex ?? null;
  const dayIndex = route.params?.dayIndex ?? null;
  const activityList = route.params?.activityList ?? [];
  const days = useSelector(programDaySelector);
  const dayTitles: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  useEffect(() => {
    if (
      exerciseList.length > 0 ||
      workoutList.length > 0 ||
      activityList.length > 0
    ) {
      switch (playIndex) {
        case 0:
          dispatchState({
            type: 'SET_ACTIVITY',
            payload: {
              activityList: activityList,
            },
          });
          break;
        case 1:
          dispatchState({
            type: 'SET_WORKOUT',
            payload: {exerciseList: exerciseList, workoutList: workoutList},
          });
          break;
        default:
          break;
      }
    }
  }, [playIndex]);

  const deleteExercise = (index: number) => {
    let list = [...state.workout.exerciseList];
    list.splice(index, 1);
    dispatchState({
      type: 'SET_WORKOUT',
      payload: {...state.workout, exerciseList: list},
    });
  };
  const deleteWorkout = (index: number) => {
    let list = [...state.workout.workoutList];
    list.splice(index, 1);
    dispatchState({
      type: 'SET_WORKOUT',
      payload: {...state.workout, workoutList: list},
    });
  };
  const deleteActivity = (index: number) => {
    let list = [...state.activity.activityList];
    list.splice(index, 1);
    dispatchState({
      type: 'SET_ACTIVITY',
      payload: {...state.activity, activityList: list},
    });
  };

  const leftIconPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const navigateActivity = useCallback(() => {
    navigation.navigate('ImportActivity', {
      playIndex: 0,
      dayIndex: dayIndex,
    });
  }, [navigation, dayIndex]);
  const navigateWorkout = useCallback(() => {
    navigation.navigate('ImportWorkouts', {
      playIndex: 1,
      dayIndex: dayIndex,
    });
  }, [navigation, dayIndex]);

  return {
    state,
    dispatchState,
    isOpen,
    setIsOpen,
    selectedText,
    setSelectedText,
    valueNumber,
    setValueNumber,
    days,
    dayTitles,
    deleteExercise,
    deleteWorkout,
    deleteActivity,
    dayIndex,
    leftIconPress,
    navigateActivity,
    navigateWorkout,
  };
};
