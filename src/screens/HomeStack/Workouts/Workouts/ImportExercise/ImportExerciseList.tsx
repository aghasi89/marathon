import React from 'react';
import {ScrollView} from 'react-native';
import RecentInfoCard from '../../../../../components/recentInfoCard/RecentInfoCard';
import { IExercise } from '../../../../../types/types';
import styles from './ImportExercise.style';

const ImportExerciseList: React.FC<any> = props => {
  return (
    <ScrollView style={styles.container}>
      {props.exerciseList.map((exercise: IExercise, index: number) => {
        return (
          <RecentInfoCard
            key={index}
            info={{
              title: exercise.name,
                  imageUrl: exercise.videoUrl,
                  amount: `${exercise.kcal} kcal`,
                  count:exercise.time,
                  tags:exercise.tags
            }}
            isDisabled={false}
            isSubmited={props.checkIsSubmited(exercise.id)}
            onPress={() => props.onPress(index)}
            onPressCheck={() => {
              props.addExercise(exercise);
            }}
            onLongPress={() => {}}
          />
        );
      })}
    </ScrollView>
  );
};
export default ImportExerciseList;
