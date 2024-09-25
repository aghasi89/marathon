import * as React from 'react';
import {Pressable, Text, View} from 'react-native';
import Icons from '../../../../assets/icons/svg';
import HeaderComponent from '../components/Header/Header';
import hook from './SelectWorkoutTypeScreen.hook';
import styles from './SelectWorkoutTypeScreen.style';

const SelectWorkoutTypeScreen: React.FC = () => {
  const {t, workoutTypeSelectHandle, backIconPressHandle} = hook();
  return (
    <View style={styles.container}>
      <HeaderComponent
        title={t('createWorkout') ?? ''}
        leftIconPressHandler={backIconPressHandle}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{t('chooseWorkoutType')}</Text>
      </View>
      <View style={styles.buttonsGeneralContainer}>
        <View style={styles.buttonAndTitleContainer}>
          <Pressable
            style={[styles.buttonContainer, styles.singleVideoButton]}
            onPress={() => workoutTypeSelectHandle('singleVideo')}>
            <Icons.SingleVideoIcon />
          </Pressable>
          <View style={styles.buttonTitleConatiner}>
            <Text style={styles.buttonTitle}>{t('oneWorkoutVideo')}</Text>
          </View>
        </View>
        <View style={styles.buttonAndTitleContainer}>
          <Pressable
            style={[styles.buttonContainer, styles.manyVideosButton]}
            onPress={() => workoutTypeSelectHandle('manyVideos')}>
            <Icons.ManyVideosIcon />
          </Pressable>
          <View style={styles.buttonTitleConatiner}>
            <Text style={styles.buttonTitle}>{t('seriesOfExercises')}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default SelectWorkoutTypeScreen;
