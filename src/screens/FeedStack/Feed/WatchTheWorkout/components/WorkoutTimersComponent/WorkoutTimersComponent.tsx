import React from 'react';
import {View, Text, ViewStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import styles from './WorkoutTimersComponent.style';

type Props = {
  containerStyle?: ViewStyle | ViewStyle[];
  elapsedValue?: string;
  currentExseciseTimerValue?: string;
  calories?:number
};

const WorkoutTimersComponent: React.VFC<Props> = ({
  containerStyle,
  currentExseciseTimerValue,
  elapsedValue,
  calories
}) => {
  const {t} = useTranslation();
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{t('elapsed')}</Text>
        <Text style={styles.text}>{elapsedValue}</Text>
      </View>
      <Text style={styles.currentExsecise}>{currentExseciseTimerValue}</Text>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{t('kcal')}</Text>
        <Text style={styles.text}>{calories}</Text>
      </View>
    </View>
  );
};
export default WorkoutTimersComponent;
