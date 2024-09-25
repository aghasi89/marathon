import React from 'react';
import {View} from 'react-native';
import {formFieldGrey} from '../../../../assets/styles/colors.styles';
import MealPlan from '../../../../components/mealPlan/MealPlan';
import MealCard from '../../../../components/mealCard/MealCard';
import {IExecise} from '../../../../store/reducers/execises-reducer';
import {IWorkout} from '../../../../store/reducers/workout-reducer';
import styles from './CreateWorkouts.style';

type Props = {
  navigate: () => void;
  exercises: Array<IExecise>;
  workouts: Array<IWorkout>;
  deleteExercise: (value) => void;
  deleteWorkout: (value) => void;
  selectedText: string;
  valueNumber: string;
  setSelectedText: (value: string) => void;
  setValueNumber: (value: string) => void;
  caloreis: number;
  time: string;
  title: string;
  count: string;
};
const SelectedWorkouts: React.FC<Props> = ({
  navigate,
  exercises,
  workouts,
  deleteExercise,
  deleteWorkout,
  selectedText,
  valueNumber,
  setSelectedText,
  setValueNumber,
  caloreis,
  title,
  time,
  count,
}) => {
  const list = [
    {
      value: '1',
      lable: 'Time (min)',
      image: {
        uri: 'https://c8.alamy.com/zooms/9/4d76e5d5579640bcb9300af816a2c771/2acmw09.jpg',
      },
    },
    {
      value: '2',
      lable: 'Distance (km)',
      image: {
        uri: 'https://c8.alamy.com/zooms/9/4d76e5d5579640bcb9300af816a2c771/2acmw09.jpg',
      },
    },
  ];

  return (
    <View style={styles.container}>
      <MealPlan
        title={title}
        caloreis={caloreis}
        time={time}
        onPress={navigate}
      />
      {(exercises.length !== 0 || workouts.length !== 0) && (
        <View style={styles.mealContainer}>
          {exercises.map(
            (exercise: {imageUrl: string; title: string}, index: number) => {
              return (
                <View key={index} style={styles.mealItem}>
                  <MealCard
                    imageUrl={exercise.imageUrl}
                    title={exercise.title}
                    selectedTypesList={list}
                    selectedTypeText={selectedText}
                    setSelectedTypeText={value => {
                      setSelectedText(value);
                    }}
                    valueNumber={valueNumber}
                    onChangeNumberValue={(val: string) => {
                      setValueNumber(val);
                    }}
                    kcalSize={250}
                    kcalSizeStyle={{color: formFieldGrey}}
                    onClose={() => deleteExercise(index)}
                    isDropDown
                    count={count}
                    time={time}
                  />
                </View>
              );
            },
          )}
          {workouts.map((workout, index) => {
            return (
              <View key={index} style={styles.mealItem}>
                <MealCard
                  imageUrl={workout.imageUrl}
                  title={workout.title}
                  selectedTypesList={list}
                  selectedTypeText={selectedText}
                  setSelectedTypeText={value => {
                    setSelectedText(value);
                  }}
                  valueNumber={valueNumber}
                  onChangeNumberValue={(val: string) => {
                    setValueNumber(val);
                  }}
                  kcalSize={250}
                  kcalSizeStyle={{color: formFieldGrey}}
                  onClose={() => deleteWorkout(index)}
                />
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};
export default SelectedWorkouts;
