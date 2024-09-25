import {useState, useCallback} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setDays} from '../../../../store/actions/program-action';
import {IProgramDay} from '../../../../store/reducers/programs-reducer';
import {
  programDaySelector,
  programDetailSelector,
} from '../../../../store/selectors/programs-selector';

export default () => {
  const [isOpenDaySheet, setIsOpenDaySheet] = useState<boolean>(false);
  const [isOpenEditSheet, setIsOpenEditSheet] = useState<boolean>(false);
  const [dayIndex, setDayIndex] = useState<number>(0);
  const [isOpenEditSheetToDo, setIsOpenEditSheetToDo] =
    useState<boolean>(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const programDetail = useSelector(programDetailSelector);
  const days = useSelector(programDaySelector);
  const dayTitles: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const route = useRoute<any>();
  const dailyDayIndex = route.params?.index ?? null;

  enum ToDoTypes {
    eat,
    play,
    edit,
    file,
    rest,
  }
  const addDay = () => {
    const day: IProgramDay = {
      nutritions: [],
      workouts: {workouts: [], activities: []},
      edits: [],
      files: [],
      rest: false,
    };
    dispatch(setDays([...days, day]));
  };

  const deleteDay = (dayIndex: number) => {
    let dayArray = [...days];
    dayArray.splice(dayIndex, 1);
    dispatch(setDays(dayArray));
  };

  const addWeek = () => {
    let week: IProgramDay[] = [];
    for (let i = 0; i < 7; i++) {
      const day: IProgramDay = {
        nutritions: [],
        workouts: {workouts: [], activities: []},
        edits: [],
        files: [],
        rest: false,
      };
      week.push(day);
    }
    dispatch(setDays([...days, ...week]));
  };

  const deleteWeek = (weekIndex, week) => {
    let array = [...days];
    array.splice(weekIndex * 7, week.length);
    dispatch(setDays(array));
  };

  const clearAll = () => {
    let array = [...days];
    array.map(item => {
      return (
        (item.nutritions = []),
        (item.workouts.workouts = []),
        (item.workouts.activities = []),
        (item.edits = []),
        (item.files = []),
        (item.rest = false)
      );
    });
  };

  const makeRestDay = (index: number) => {
    let array = [...days];
    array[index].rest = true;
    dispatch(setDays(array));
  };

  const onSelectNutrition = useCallback(() => {
    setIsOpenEditSheet(false);
    navigation.navigate('CreateNutritions', {dayIndex: dayIndex});
  }, [navigation, dayIndex]);

  const onSelectWorkout = useCallback(() => {
    setIsOpenEditSheet(false);
    navigation.navigate('CreateWorkouts', {dayIndex: dayIndex});
  }, [navigation, dayIndex]);

  const onSelectFiles = useCallback(() => {
    setIsOpenEditSheet(false);
    navigation.navigate('CreateFiles', {
      dayIndex: dayIndex,
      fileList: days[dayIndex].files,
    });
  }, [navigation, dayIndex]);

  const onSelectNotes = useCallback(() => {
    setIsOpenEditSheet(false);
    navigation.navigate('CreateNotes', {
      dayIndex: dayIndex,
      noteList: days[dayIndex].edits,
    });
  }, [navigation, dayIndex]);

  const onSelectRest = useCallback(() => {
    setIsOpenEditSheet(false);
    makeRestDay(dayIndex);
  }, [dayIndex]);

  const onSelectClearAll = useCallback(() => {
    setIsOpenEditSheet(false);
    clearAll();
  }, [dayIndex]);

  const onPlusNutrition = useCallback(
    index => {
      navigation.navigate('CreateNutritions', {
        dayIndex: index,
      });
    },
    [navigation, dayIndex],
  );
  const onPlusWorkouts = useCallback(
    index => {
      navigation.navigate('CreateWorkouts', {
        dayIndex: index,
      });
    },
    [navigation, dayIndex],
  );

  const onPlusFiles = useCallback(
    index => {
      navigation.navigate('CreateFiles', {
        dayIndex: index,
        fileList: days[dayIndex].files,
      });
    },
    [navigation, dayIndex, days],
  );
  const onPressDay = useCallback(
    index => {
      navigation.navigate('Daily', {index: index});
    },
    [navigation],
  );
  const onPressAdd = useCallback(
    index => {
      setIsOpenEditSheet(true);
      setDayIndex(index);
    },
    [isOpenEditSheet],
  );
  const leftIconPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    days,
    addDay,
    deleteDay,
    addWeek,
    deleteWeek,
    ToDoTypes,
    dayTitles,
    isOpenDaySheet,
    setIsOpenDaySheet,
    isOpenEditSheet,
    setIsOpenEditSheet,
    dispatch,
    onSelectNutrition,
    onSelectWorkout,
    onSelectFiles,
    onSelectNotes,
    onSelectRest,
    onSelectClearAll,
    setDayIndex,
    isOpenEditSheetToDo,
    setIsOpenEditSheetToDo,
    programDetail,
    onPlusFiles,
    dailyDayIndex,
    onPlusNutrition,
    onPlusWorkouts,
    onPressDay,
    leftIconPress,
    onPressAdd,
  };
};
