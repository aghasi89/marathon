import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  formFieldGrey,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import styles from './ProgramDates.style';
import ProgramDatesHook from './ProgramDates-hook';

type Props = {navigation: any};
const Manual: React.FC<Props> = ({navigation}) => {
  const {week, state, addDay, checkIsSubmitedDay} =
    ProgramDatesHook(navigation);

  return (
    <View style={styles.contentContainerManual}>
      <View style={styles.weekContainer}>
        {week.map((item, index) => {
          return (
            <Text key={index} style={styles.countText}>
              {item}
            </Text>
          );
        })}
      </View>
      <View style={styles.daysContainer}>
        {state.days.map((element, index) => {
          return (
            <View key={index} style={styles.circles}>
              <TouchableOpacity
                key={index}
                style={
                  checkIsSubmitedDay(element.id)
                    ? styles.circlesInner
                    : styles.circles
                }
                onPress={() => addDay(element)}>
                <Text
                  style={[
                    styles.countText,
                    {
                      color: checkIsSubmitedDay(element.id)
                        ? primaryWhite
                        : formFieldGrey,
                    },
                  ]}>
                  {index + 1}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};
export default Manual;
