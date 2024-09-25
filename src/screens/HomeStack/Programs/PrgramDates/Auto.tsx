import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Icons from '../../../../assets/icons/svg/index';
import {
  formFieldGrey,
  primaryBlue,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import ProgramDatesHook from './ProgramDates-hook';
import styles from './ProgramDates.style';

type Props = {navigation: any};
const Auto: React.FC<Props> = ({navigation}) => {
  const {
    week,
    startDay,
    setStartDay,
    endDay,
    setEndDay,
    state,
    addDays,
    checkIsSubmitedDay,
    clearAll,
  } = ProgramDatesHook(navigation);

  return (
    <View style={styles.contentContainer}>
      <View style={styles.listContainer}>
        {week.map((item, i) => {
          return (
            <TouchableOpacity key={i} style={[styles.weekCircles]}>
              <Text style={styles.countText}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.startEndContainer}>
        <TouchableOpacity style={styles.start} onPress={clearAll}>
          <Icons.Article />
          <Text
            style={[
              styles.title,
              {
                color: startDay ? formFieldGrey : primaryBlue,
              },
            ]}>
            {startDay ? 'Day ' + startDay : 'Start Day'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.start}>
          <Icons.Article />
          <Text
            style={[
              styles.title,
              {
                color: startDay ? primaryBlue : formFieldGrey,
              },
            ]}>
            {endDay ? 'Day ' + endDay : 'End Day'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.weekContainer}>
        {week.map((item, index) => {
          return (
            <Text key={index} style={styles.countText}>
              {item}
            </Text>
          );
        })}
      </View>
      <ScrollView contentContainerStyle={styles.daysContainer}>
        {state.days.map((element, index) => {
          return (
            <View
              key={index}
              style={
                startDay === index + 1 || endDay === index + 1
                  ? styles.circlesOutline
                  : styles.circles
              }>
              <TouchableOpacity
                onPress={() => {
                  startDay ? setEndDay(index + 1) : setStartDay(index + 1);
                  addDays();
                }}
                style={
                  checkIsSubmitedDay(element.id)
                    ? styles.circlesInner
                    : startDay === index + 1 || endDay === index + 1
                    ? styles.circlesInner
                    : styles.circles
                }>
                <Text
                  style={[
                    styles.countText,
                    {
                      color:
                        startDay === index + 1 ||
                        endDay === index + 1 ||
                        checkIsSubmitedDay(element.id)
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
      </ScrollView>
    </View>
  );
};
export default Auto;
