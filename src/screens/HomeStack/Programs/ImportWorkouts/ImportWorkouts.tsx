import React, {useCallback, useMemo, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Icons from '../../../../assets/icons/svg/index';
import {
  primaryBlack,
  primaryBlue,
} from '../../../../assets/styles/colors.styles';
import MainHeader from '../../../../components/headers/mainHeader/MainHeader';
import TabNavigationHeader from '../../../../components/headers/tabNavigationHeader/TabNavigationHeader';
import TabBadges from '../../../../components/TabBadges/TabBadges';
import MultiSelectSelectedChips from '../../../../components/multiSelect/MultiSelectSelectedChips';
import BottomBar from '../../../../components/bottomBar/BottomBar';
import VideoInfoCard from '../../../../components/videoInfoCard/VideoInfoCard';
import {IExecise} from '../../../../store/reducers/execises-reducer';
import {IWorkout} from '../../../../store/reducers/workout-reducer';
import ImportExerciseList from '../../Workouts/Workouts/ImportExercise/ImportExerciseList';
import ImportWorkoutList from '../../Workouts/Workouts/ImportWorkoutList/ImportWorkoutList';
import ImportsHook from './ImportWorkouts-hook';
import styles from './ImportWorkouts.style';

const chiprGroupItems = [
  {
    title: 'Exercises',
    icon: <Icons.Trainer fill={primaryBlack} />,
    selectedIcon: <Icons.Trainer fill={primaryBlue} />,
  },
  {
    title: 'Workouts',
    icon: <Icons.Trainer fill={primaryBlack} />,
    selectedIcon: <Icons.Trainer fill={primaryBlue} />,
  },
];
type Props = {navigation: any};
const ImportWorkouts: React.FC<Props> = ({navigation}) => {
  const {
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
    leftIconPress,
    onImportWorkout,
    navigateFilterWorkout,
  } = ImportsHook(navigation);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheetIndex, setSheetIndex] = useState<number>(0);
  const snapPoints = useMemo(() => ['15%', '50%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

  const renderComponent = () => {
    switch (index) {
      case 0:
        return (
          <ImportExerciseList
            exerciseList={exerciseList}
            onPress={index => {
              navigation.navigate('ImportExerciseDetail', {
                index: index,
              });
            }}
            addExercise={(exercise: IExecise) => addExercise(exercise)}
            checkIsSubmited={(id: number) => checkIsSubmitedExercise(id)}
          />
        );
      case 1:
        return (
          <ImportWorkoutList
            workoutList={workoutList}
            onPress={index => {
              navigation.navigate('ImportExerciseDetail', {
                index: index,
              });
            }}
            addWorkout={(workout: IWorkout) => addWorkout(workout)}
            checkIsSubmited={(id: number) => checkIsSubmitedWorkout(id)}
          />
        );
    }
  };
  const renderBottomBarComponent = () => {
    switch (index) {
      case 0:
        return (
          <BottomSheetScrollView showsVerticalScrollIndicator={false}>
            {state.submitedWorkouts.exercises.map((element, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.9}
                  onPress={() => {}}
                  style={styles.workoutItem}>
                  <VideoInfoCard
                    image={element.imageUrl}
                    title={element.title}
                    time={element.count}
                    deleteVisable={true}
                    onPressDelete={() => {
                      checkIsSubmitedExercise(element.id);
                      addExercise(element);
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </BottomSheetScrollView>
        );
      case 1:
        return (
          <BottomSheetScrollView showsVerticalScrollIndicator={false}>
            {state.submitedWorkouts.workouts.map((element, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.9}
                  onPress={() => {}}
                  style={styles.workoutItem}>
                  <VideoInfoCard
                    image={element.imageUrl}
                    title={element.title}
                    time={element.count}
                    deleteVisable={true}
                    onPressDelete={() => {
                      checkIsSubmitedWorkout(element.id);
                      addWorkout(element);
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </BottomSheetScrollView>
        );
      default:
    }
  };
  const count =
    state.submitedWorkouts.exercises.length +
    state.submitedWorkouts.workouts.length;

  return (
    <View style={styles.container}>
      <MainHeader
        title={'Add Workouts'}
        search={true}
        open={isFocus}
        onFocus={() => setIsfocus(true)}
        onBlur={() => setIsfocus(false)}
        onChangeText={filterText}
        inputValue={searchText}
        leftComponent={
          <TouchableOpacity onPress={navigateFilterWorkout}>
            <Icons.Filter fill={primaryBlack} />
          </TouchableOpacity>
        }
        leftIcon={true}
        leftIconPress={leftIconPress}
      />
      <TabNavigationHeader
        data={chiprGroupItems}
        index={index}
        setIndex={value => {
          setIndex(value);
        }}
      />
      {selectedData.length > 0 ? (
        <View style={styles.item}>
          <MultiSelectSelectedChips list={selectedData} onDelete={deleteItem} />
        </View>
      ) : (
        <TabBadges data={badges} index={indexTab} setIndex={setIndexTab} />
      )}
      {renderComponent()}
      <BottomSheet
        ref={bottomSheetRef}
        index={sheetIndex}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <BottomBar
          count={count}
          onImport={onImportWorkout}
          onPressMenu={() => {
            handleSheetChanges(sheetIndex ? 0 : 1);
          }}
          buttonType={sheetIndex ? 'close' : 'menu'}
          isAddToDay
          dayIndex={dayIndex + 1}
        />
        {renderBottomBarComponent()}
      </BottomSheet>
    </View>
  );
};
export default ImportWorkouts;
