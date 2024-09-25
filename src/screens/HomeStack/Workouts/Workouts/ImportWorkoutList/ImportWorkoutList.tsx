import React from 'react';
import {ScrollView} from 'react-native';
import RecentInfoCard from '../../../../../components/recentInfoCard/RecentInfoCard';
import {IWorkout} from '../../../../../store/reducers/workout-reducer';
import styles from './ImportWorkoutList.style';

const ImportWorkoutList: React.FC<any> = props => {
  return (
    <ScrollView style={styles.container}>
      {props.workoutList.map((workout: IWorkout, index: number) => {
        return (
          <RecentInfoCard
            key={index}
            info={{
              title: workout.title,
              imageUrl: workout.imageUrl,
              amount: workout.amount,
              count: workout.count,
              saleType: workout.saleType,
              type: workout.type,
            }}
            isDisabled={false}
            isSubmited={props.checkIsSubmited(workout.id)}
            onPress={() => props.onPress(index)}
            onPressCheck={() => {
              props.addWorkout(workout);
            }}
            onLongPress={() => {}}
          />
        );
      })}
    </ScrollView>
  );
};
export default ImportWorkoutList;
