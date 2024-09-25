import * as React from 'react';
import { Pressable, Text, View, ScrollView } from 'react-native';
import {
  lightPeriwinkle,
  red,
  robinEggBlue,
} from '../../../../../../../assets/styles/colors.styles';
import SliderComponent from '../../../../../../../components/sliderComponent/SliderComponent';
import ExerciseItemCard from '../../../../../Feed/AboutFeed/components/ExerciseItemCard/ExerciseItemCard';
import Icons from '../../../../../../../assets/icons/svg';
import { formatTimeDuration } from '../../../../../../../utils/formatTimeDuration';
import hook from './ManyVideosWorkoutSecondStep.hook';
import styles from './ManyVideosWorkoutSecondStep.style';

const ManyVideosWorkoutSecondStep: React.FC = () => {
  const {
    t,
    state,
    plusButtonPressHandle,
    exerciseSelectHandle,
    handleChangeRestTime,
    execisePressHandle
  } = hook();
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        overScrollMode="never">
        {!!!state.selectedExercises?.length && (
          <View style={styles.messageContainer}>
            <Text
              style={[
                styles.messageText,
                {
                  color: !!!state.errorMessages?.exercises?.length
                    ? lightPeriwinkle
                    : red,
                },
              ]}>
              {t('pleaseSelectExercise')}
            </Text>
          </View>
        )}
        {state?.selectedExercises?.map((item, index) => (
          <View key={index}>
            <View style={styles.padding}>
              <SliderComponent
                sliderValue={item.rest_time}
                lable={t('restTime')}
                value={item?.rest_time?.toString() ?? '0'}
                minCount={0}
                maxCount={120}
                progressCount={0}
                onValueChange={value => handleChangeRestTime(value, index)}
              />
            </View>
            <ExerciseItemCard
              onPress={() => {
                execisePressHandle(item)
              }
              }
              url={item.url}
              time={item.time}
              name={item.name}
              closeIconPress={() => exerciseSelectHandle(item)}
              containerStyle={styles.exerciseItemContainer}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.plusButtonContainer}>
        <Pressable
          style={[
            styles.plusButton,
            {
              borderColor: !!!state.errorMessages?.exercises?.length
                ? robinEggBlue
                : red,
            },
          ]}
          onPress={plusButtonPressHandle}>
          <Icons.Plus {...styles.plusIcon} />
        </Pressable>
      </View>
    </View>
  );
};
export default ManyVideosWorkoutSecondStep;
