import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {calcHeight} from '../../../../assets/dimensions';
import Icons from '../../../../assets/icons/svg/index';
import {primaryBlack} from '../../../../assets/styles/colors.styles';
import EditSheet from '../../../../components/editSheet/EditSheet';
import MainHeader from '../../../../components/headers/mainHeader/MainHeader';
import ProgramDays from '../../../../components/programDays/ProgramDays';
import CreateWorkoutsHook from './CreateWorkouts-hook';
import styles from './CreateWorkouts.style';
import SelectedActivities from './SelectedActivities';
import SelectedWorkouts from './SelectedWorkouts';

type Props = {navigation: any};
const CreateWorkouts: React.FC<Props> = ({navigation}) => {
  const {
    state,
    isOpen,
    setIsOpen,
    deleteExercise,
    deleteWorkout,
    deleteActivity,
    selectedText,
    setSelectedText,
    valueNumber,
    setValueNumber,
    days,
    dayIndex,
    leftIconPress,
    navigateActivity,
    navigateWorkout,
  } = CreateWorkoutsHook(navigation);

  const editSheet = [
    {
      title: 'Discard changes',
      onSelect: () => {
        setIsOpen(false);
      },
      Icon: <Icons.Close fill={primaryBlack} />,
    },
    {
      title: 'Save changes',
      onSelect: () => {
        setIsOpen(false);
      },
      Icon: <Icons.CheckIcon fill={primaryBlack} />,
    },
  ];
  return (
    <View style={styles.container}>
      <MainHeader
        leftIconPress={leftIconPress}
        leftIcon={true}
        title={'Workout'}
        leftComponentStyle={styles.leftComponentStyle}
        leftComponent={
          <Icons.EllipsisIcon
            fill={primaryBlack}
            style={styles.iconStyle}
            onPress={() => setIsOpen(true)}
          />
        }
      />
      <View style={styles.content}>
        <ProgramDays days={days} dayIndex={dayIndex} />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total</Text>
          <View style={styles.totalKcalContainer}>
            {state.valueMin != 0 && (
              <Text style={styles.totalKcal}>{state.valueMin} min</Text>
            )}
            <Text style={styles.totalKcal}>{state.valueKcal} kcal</Text>
            <Icons.HeightLine />
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View>
            <SelectedActivities
              navigate={navigateActivity}
              deleteActivity={deleteActivity}
              activities={state.activity.activityList}
              selectedText={selectedText}
              valueNumber={valueNumber}
              setSelectedText={val => setSelectedText(val)}
              setValueNumber={val => setValueNumber(val)}
              caloreis={0}
              time={'0'}
              title="Activity"
            />
            <SelectedWorkouts
              navigate={navigateWorkout}
              exercises={state.workout.exerciseList}
              workouts={state.workout.workoutList}
              deleteExercise={deleteExercise}
              deleteWorkout={deleteWorkout}
              selectedText={selectedText}
              valueNumber={valueNumber}
              setSelectedText={val => setSelectedText(val)}
              setValueNumber={val => setValueNumber(val)}
              caloreis={0}
              time={'0'}
              title="Workout"
              count="20"
            />
          </View>
        </ScrollView>
      </View>
      <EditSheet
        isVisible={isOpen}
        height={calcHeight(220)}
        onClose={() => setIsOpen(false)}
        list={editSheet}
      />
    </View>
  );
};

export default CreateWorkouts;
