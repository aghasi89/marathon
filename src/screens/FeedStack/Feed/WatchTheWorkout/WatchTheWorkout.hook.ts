import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {selectedFeedSelector} from '../../../../store/selectors/feed-selector';
import {getFeedByIdAction} from '../../../../store/actions/feed-action';
import {MainNavigationParamList} from '../../../../navigation/MainNavigation';
import {workoutStartSound} from '../../../../utils/sounds';

type IWorkoutInfo = {
  selectedIndex: number;
  workoutStartedAt?: Date;
  workoutRenderTime?: string;
  paused?: boolean;
  pauseStartedAt?: Date;
  pauseTotalDuration?: number;
  workoutBurningCaloriesCount?: number;
  caloriesBurned?: number;
  workoutTotalDuration?: number;
  restStartedAt?: Date;
  restRenderTime?: string;
  currentExerciseRestTime?: number;
  currentExercisePassedRestTime?: number;
  passedRestTimeTotalDuration?: number;
  currentExerciseStartAt?: Date;
  currentExerciseDuration?: number;
  currentExerciseRenderTime?: string;
  currentExercisePauseStartAt?: Date;
  currentExercisePauseDuration?: number;
  isWorkoutEnded?: boolean;
};

type Props = NativeStackScreenProps<MainNavigationParamList, 'WATCH_WORKOUT'>;

export default () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const selectedFeed = useSelector(selectedFeedSelector);
  const [isPlaying,setIsPlaying] = useState<'playing' | 'pause'>('pause')
  let workoutTimer = useRef<any>(null);
  const [workoutInfo, setWorkoutInfo] = useState<IWorkoutInfo>({
    selectedIndex: 0,
    workoutStartedAt: new Date(),
    paused: false,
    pauseStartedAt: undefined,
  });
  const id = route?.params?.id;

  useEffect(() => {
    if (!selectedFeed && id) {
      dispatch(getFeedByIdAction({id, type: 'feed'}));
    } else {
      setWorkoutInfo(curr => ({
        ...curr,
        workoutBurningCaloriesCount: selectedFeed?.calorie,
        workoutTotalDuration:
          selectedFeed?.trainings &&
          selectedFeed?.trainings
            .map(el => el.exercise?.time ?? 0)
            ?.reduce((acc, value) => (acc ?? 0) + (value ?? 0)),
        restStartedAt:
          selectedFeed?.trainings &&
          !!selectedFeed?.trainings[curr.selectedIndex].rest_time
            ? new Date()
            : undefined,
        restRenderTime:
          selectedFeed.trainings &&
          formatDuration(
            parseInt(
              selectedFeed.trainings[curr.selectedIndex].rest_time ?? '0',
            ),
          ),
        currentExerciseDuration:
          selectedFeed.trainings &&
          selectedFeed.trainings[curr.selectedIndex].exercise?.time,
        currentExerciseRestTime:
          selectedFeed.trainings &&
          parseInt(selectedFeed.trainings[curr.selectedIndex].rest_time ?? '0'),
      }));
    }
    if (selectedFeed) {
      workoutTimer.current = setInterval(calcWorkoutDuration, 700);
    }
    return () => {
      if (!!workoutTimer.current) {
        clearInterval(workoutTimer.current);
        setWorkoutInfo({selectedIndex: 0});
      }
    };
  }, [selectedFeed]);
  useEffect(() => {
    if (
      workoutInfo.currentExerciseRenderTime === '00:00' &&
      !workoutInfo.restStartedAt
    ) {
      stepperButtonsPressHandle('next');
    }
  }, [workoutInfo.currentExerciseRenderTime]);
  const backIconPressHandle = useCallback(() => {
    navigation.goBack();
  }, []);

  const calcWorkoutDuration = useCallback(() => {
    setWorkoutInfo(curr => {
      (curr.restRenderTime === '00:03' ||
        (selectedFeed.trainings &&
          curr.selectedIndex < selectedFeed.trainings.length - 1 &&
          curr.currentExerciseRenderTime === '00:04')) &&
        !curr.paused &&
        workoutStartSound.play() &&
        workoutStartSound.setVolume(1);
      if (curr.isWorkoutEnded && !!workoutTimer.current) {
        clearInterval(workoutTimer.current);
      }
      return {
        ...curr,
        workoutRenderTime:
          curr.paused || curr.isWorkoutEnded
            ? curr.workoutRenderTime
            : formatDuration(
                calcDiff(curr.workoutStartedAt) -
                  (curr.pauseTotalDuration ?? 0),
              ),
        caloriesBurned:
          curr.paused || !!curr.restStartedAt || curr.isWorkoutEnded
            ? curr.caloriesBurned
            : calcBurnedCalories(
                curr.workoutBurningCaloriesCount,
                curr.workoutTotalDuration,
                calcDiff(curr.workoutStartedAt) -
                  (curr.pauseTotalDuration ?? 0) -
                  (curr.passedRestTimeTotalDuration ?? 0),
              ),
        currentExercisePassedRestTime: curr.restStartedAt
          ? calcDiff(curr.restStartedAt)
          : undefined,
        passedRestTimeTotalDuration: curr.restStartedAt
          ? calcDiff(curr.restStartedAt) -
            (curr.currentExercisePassedRestTime ?? 0) +
            (curr.passedRestTimeTotalDuration ?? 0)
          : curr.passedRestTimeTotalDuration,
        restStartedAt:
          (curr.currentExerciseRestTime ?? 0) - calcDiff(curr.restStartedAt) >=
          0
            ? curr.restStartedAt
            : undefined,
        restRenderTime: formatDuration(
          (curr.currentExerciseRestTime ?? 0) - calcDiff(curr.restStartedAt),
        ),
        currentExerciseStartAt:
          !!!curr.restStartedAt && !!!curr.currentExerciseStartAt
            ? new Date()
            : curr.currentExerciseStartAt,
        currentExerciseRenderTime:
          !curr.paused && !curr.isWorkoutEnded
            ? formatDuration(
                (curr.currentExerciseDuration ?? 0) -
                  calcDiff(curr.currentExerciseStartAt) +
                  (curr.currentExercisePauseDuration ?? 0),
              )
            : curr.currentExerciseRenderTime,
      };
    });
  }, [workoutInfo, selectedFeed]);

  const stepperButtonsPressHandle = useCallback(
    (action: 'previous' | 'next') => {
      setWorkoutInfo(curr => {
        if (action === 'next') {
          if (
            selectedFeed?.trainings?.length &&
            curr.selectedIndex < selectedFeed?.trainings?.length - 1
          ) {
            return {
              ...curr,
              selectedIndex: curr.selectedIndex + 1,
              restStartedAt:
                selectedFeed?.trainings &&
                !!selectedFeed?.trainings[curr.selectedIndex + 1].rest_time
                  ? new Date()
                  : undefined,
              currentExerciseStartAt: undefined,
              currentExerciseDuration:
                selectedFeed.trainings &&
                selectedFeed.trainings[curr.selectedIndex + 1].exercise?.time,
              currentExercisePauseStartAt: undefined,
              currentExercisePauseDuration: undefined,
            };
          } else {
            return {
              ...curr,
              selectedIndex: curr.selectedIndex,
              isWorkoutEnded:
                curr.currentExerciseRenderTime === '00:00' && true,
            };
          }
        } else {
          if (curr.selectedIndex > 0) {
            return {
              ...curr,
              selectedIndex: curr.selectedIndex - 1,
              restStartedAt:
                selectedFeed?.trainings &&
                !!selectedFeed?.trainings[curr.selectedIndex - 1].rest_time
                  ? new Date()
                  : undefined,
              currentExerciseStartAt: undefined,
              currentExerciseDuration:
                selectedFeed.trainings &&
                selectedFeed.trainings[curr.selectedIndex - 1].exercise?.time,
              currentExercisePauseStartAt: undefined,
              currentExercisePauseDuration: undefined,
            };
          }
          return {...curr, selectedIndex: curr.selectedIndex};
        }
      });
    },
    [selectedFeed, workoutInfo],
  );
  const calcBurnedCalories = (
    calories?: number,
    time?: number,
    startTime?: number,
  ) => {
    if (calories) {
      const burnedCalories = Math.floor(
        (calories / (time ?? 0)) * (startTime ?? 0),
      );
      return burnedCalories > calories ? calories : burnedCalories;
    } else {
      return 0;
    }
  };
  const formatDuration = (time?: number) => {
    if (time) {
      const min = Math.floor(time / 60);
      const sec = Math.floor(time % 60);
      return `${min > 0 ? (min < 10 ? `0${min}` : `${min}`) : '00'}:${
        sec > 0 ? (sec < 10 ? `0${sec}` : `${sec}`) : '00'
      }`;
    }
  };
  const onVideoStateChange = useCallback(
    (status?: 'playing' | 'pause',controls?:'show'|'hide') => {
      status&&setIsPlaying(status)
      setWorkoutInfo(curr => {
        if (status === 'pause'&&isPlaying!==status) {
          return {
            ...curr,
            paused: true,
            pauseStartedAt: new Date(),
            currentExercisePauseStartAt: new Date(),
          };
        } else if(status === 'playing'&&isPlaying!==status) {
          return {
            ...curr,
            pauseTotalDuration:
              (curr.pauseTotalDuration ?? 0) + calcDiff(curr.pauseStartedAt),
            currentExercisePauseDuration:
              (curr.currentExercisePauseDuration ?? 0) +
              calcDiff(curr.currentExercisePauseStartAt),
            paused: false,
            pauseStartedAt: undefined,
          };
        }
        return curr
      });
    },
    [workoutInfo,isPlaying],
  );

  const calcDiff = (startTime?: Date) => {
    return moment().diff(startTime) / 1000;
  };
  return {
    t,
    backIconPressHandle,
    selectedFeed,
    stepperButtonsPressHandle,
    workoutInfo,
    onVideoStateChange,
  };
};
