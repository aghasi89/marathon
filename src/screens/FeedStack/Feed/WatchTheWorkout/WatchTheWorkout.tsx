import React from 'react';
import {View, Pressable, ScrollView, Text, Image} from 'react-native';
import VideoPlayerComponent from '../../../../components/videoPlayers/videoPlayer/videoPlayer';
import {primaryWhite} from '../../../../assets/styles/colors.styles';
import {mediaSizeStyle} from '../../../../assets/styles/global.styles';
import Icons from '../../../../assets/icons/svg';
import {downloadMediaFromBunny} from '../../../../utils/bunny.net';
import StepperButtonsComponent from '../components/StepperButtonsComponent/StepperButtonsComponent';
import ExerciseItemCard from '../AboutFeed/components/ExerciseItemCard/ExerciseItemCard';
import WorkoutTimersComponent from './components/WorkoutTimersComponent/WorkoutTimersComponent';
import WorkoutProgress from './components/WorkoutProgress/WorkoutProgress';
import hook from './WatchTheWorkout.hook';
import styles from './WatchTheWorkout.style';

const WatchTheWorkout: React.FC = () => {
  const {
    t,
    backIconPressHandle,
    selectedFeed,
    workoutInfo,
    stepperButtonsPressHandle,
    onVideoStateChange,
  } = hook();

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backIconTouchContainer}
        onPress={backIconPressHandle}>
        <Icons.ArrowIcon fill={primaryWhite} />
      </Pressable>
      <ScrollView overScrollMode="never" style={styles.scrollContainer}>
        <VideoPlayerComponent
          onStateChange={onVideoStateChange}
          showControls={false}
          showCover={
            !!workoutInfo.restStartedAt || workoutInfo.isWorkoutEnded
              ? true
              : false
          }
          cover={
            !workoutInfo.isWorkoutEnded ? (
              <View style={styles.restTimeContainer}>
                <Text style={styles.restTimeText}>{t('getReady')}</Text>
                <Text style={styles.restTimer}>
                  {workoutInfo.restRenderTime}
                </Text>
              </View>
            ) : (
              <Image
                resizeMode="cover"
                style={styles.congratulation}
                source={{uri: 'https://i.gifer.com/1rRk.gif'}}
              />
            )
          }
          containerStyle={{
            ...mediaSizeStyle({
              type:
                selectedFeed?.trainings &&
                (selectedFeed?.trainings[workoutInfo.selectedIndex]?.exercise
                  ?.size ??
                  '16:9'),
            }),
          }}
          autoplay={true}
          thumbnail={
            selectedFeed?.trainings &&
            selectedFeed?.trainings[workoutInfo.selectedIndex]?.exercise?.video
              ? downloadMediaFromBunny({
                  public_key:
                    selectedFeed?.trainings[workoutInfo.selectedIndex]?.exercise
                      ?.video ?? '',
                  mediaType: 'video',
                  aspectRatio:
                    selectedFeed?.trainings[workoutInfo.selectedIndex]?.exercise
                      ?.size,
                  userDir:
                    selectedFeed?.trainings[workoutInfo.selectedIndex]?.exercise
                      ?.creator,
                  imageDir: 'feed',
                })?.thumbnailURL
              : ''
          }
          videoUrl={
            selectedFeed?.trainings &&
            selectedFeed?.trainings[workoutInfo.selectedIndex]?.exercise?.video
              ? downloadMediaFromBunny({
                  public_key:
                    selectedFeed?.trainings[workoutInfo.selectedIndex]?.exercise
                      ?.video ?? '',
                  mediaType: 'video',
                  aspectRatio:
                    selectedFeed?.trainings[workoutInfo.selectedIndex]?.exercise
                      ?.size,
                  userDir:
                    selectedFeed?.trainings[workoutInfo.selectedIndex]?.exercise
                      ?.creator,
                  imageDir: 'feed',
                })?.url
              : ''
          }
        />
        <WorkoutProgress
          containerStyle={styles.progressContainer}
          progressStepsCount={selectedFeed?.trainings?.length ?? 0}
          selectedStepIndex={workoutInfo.selectedIndex}
        />
        <WorkoutTimersComponent
          containerStyle={styles.timerContainer}
          calories={workoutInfo.caloriesBurned}
          currentExseciseTimerValue={
            !workoutInfo.restStartedAt
              ? workoutInfo?.currentExerciseRenderTime
              : ''
          }
          elapsedValue={workoutInfo.workoutRenderTime}
        />
        <StepperButtonsComponent
          disabled={workoutInfo.isWorkoutEnded}
          containerStyle={styles.stepperButtonsContainer}
          onPress={stepperButtonsPressHandle}
        />
        {selectedFeed?.trainings &&
          workoutInfo.selectedIndex < selectedFeed?.trainings?.length - 1 && (
            <ExerciseItemCard
              hideCloseIcon={true}
              url={
                selectedFeed?.trainings &&
                selectedFeed?.trainings[workoutInfo.selectedIndex + 1]?.exercise
                  ?.video
                  ? downloadMediaFromBunny({
                      public_key:
                        selectedFeed?.trainings[workoutInfo.selectedIndex + 1]
                          ?.exercise?.video ?? '',
                      mediaType: 'video',
                      userDir:
                        selectedFeed?.trainings[workoutInfo.selectedIndex + 1]
                          ?.exercise?.creator,
                      imageDir: 'feed',
                    })?.thumbnailURL
                  : ''
              }
              time={
                selectedFeed?.trainings
                  ? selectedFeed?.trainings[workoutInfo.selectedIndex + 1]?.time
                  : ''
              }
              name={
                selectedFeed?.trainings
                  ? selectedFeed?.trainings[workoutInfo.selectedIndex + 1]
                      .exercise?.title
                  : ''
              }
              restTime={`${
                selectedFeed?.trainings
                  ? selectedFeed?.trainings[workoutInfo.selectedIndex]
                      ?.rest_time
                  : '0'
              } ${t('sec')}`}
              containerStyle={styles.exerciseItemContainer}
              onPress={() => {}}
            />
          )}
      </ScrollView>
    </View>
  );
};
export default WatchTheWorkout;
