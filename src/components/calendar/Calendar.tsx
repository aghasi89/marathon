import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {CalendarList} from 'react-native-calendars';
import moment from 'moment';
import Icons from '../../assets/icons/svg/index';
import {
  primaryBlue,
  primaryBlack,
  primaryWhite,
  lightBlue,
  primaryGrey,
  lighBlack,
} from '../../assets/styles/colors.styles';
import OutLineButton from '../buttons/outline/OutLineButton';
import {calcHeight} from '../../assets/dimensions';
import BottomButtonGroup from '../buttonGroup/BottomButtonGroup';
import Toaster from '../toester/Toester';
import {getCalendarDates} from './utils';
import styles from './Calendar.styles';

type Props = {
  isVisible: boolean;
  onCancle: () => void;
  onApplay: (arr: string[]) => void;
};
const CalendarComponent: React.FC<Props> = ({
  isVisible,
  onCancle,
  onApplay,
}) => {
  const [filteredDates, setFilteredDates] = useState<string[]>([]);
  const [curent] = useState(filteredDates[0]);
  const _onPress = (day: any) => {
    let tmp: string[] = [];
    if (!filteredDates) {
      tmp.push(day.dateString);
      setFilteredDates(tmp);
    } else {
      const index: number = filteredDates.indexOf(day);
      if (index == -1) {
        if (filteredDates.length == 0) {
          tmp = [day.dateString, day.dateString];
        } else {
          if (moment(filteredDates[0]).diff(filteredDates[1], 'days') == 0) {
            if (
              moment(filteredDates[0]).diff(moment(day.dateString), 'days') <= 0
            ) {
              tmp = [filteredDates[0], day.dateString];
            } else {
              tmp = [day.dateString, filteredDates[0]];
            }
          } else {
            tmp = [day.dateString, day.dateString];
          }
        }
      } else {
        tmp = [day.dateString, undefined];
      }
      let formatedDate = formatStartAndEndData(tmp[0], tmp[1]);
      setFilteredDates([...tmp, ...formatedDate]);
    }
  };
  const formatStartAndEndData = (startDate: string, endDate: string) => {
    let start = moment(startDate).format('LLL');
    let end = moment(endDate).format('LLL');
    start = start.slice(0, start.indexOf(','));
    end = end.slice(0, end.indexOf(','));
    if (start === end || end === undefined) {
      return [start];
    }
    return [start, end];
  };
  const _renderCalendar = useMemo(() => {
    let newDates: {[key: string]: any} = {};
    let current = '';
    if (filteredDates) {
      current = filteredDates[0];
      if (filteredDates.length >= 2) {
        newDates = getCalendarDates(
          filteredDates[0],
          filteredDates[1],
          lightBlue,
        );
      } else {
        newDates = {
          [filteredDates[0]]: {
            color: primaryBlack,
            startingDay: true,
            selected: true,
            textColor: primaryWhite,
          },
        };
      }
    }
    if (curent) {
      current = curent;
    }
    return (
      <CalendarList
        horizontal={true}
        hideArrows={false}
        pastScrollRange={50}
        futureScrollRange={12}
        hideExtraDays={false}
        onDayPress={_onPress}
        markingType="period"
        markedDates={newDates}
        current={current}
        key={'calndar-' + current}
        calendarStyle={{backgroundColor: primaryWhite}}
        theme={{
          dayTextColor: primaryBlack,
          calendarBackground: primaryWhite,
          monthTextColor: primaryBlack,
          textSectionTitleColor: lighBlack,
          // @ts-ignore
          'stylesheet.calendar.header': {
            header: {
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            },
          },
        }}
        renderArrow={direction => {
          if (direction === 'left') {
            return (
              <View style={styles.arrowsConteiner}>
                <Text style={styles.arrows}> {'<'} </Text>
              </View>
            );
          }
          return (
            <View style={styles.arrowsConteiner}>
              <Text style={styles.arrows}> {'>'} </Text>
            </View>
          );
        }}
      />
    );
  }, [filteredDates, curent]);
  return (
    <Toaster
      height={calcHeight(660)}
      isVisible={isVisible}
      onClose={() => {}}
      Screen={
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.startAndEndDayButtonsConteiner}>
              <View style={styles.daysButtonConteiner}>
                <Text style={styles.buttonTitle}>Start Date</Text>
                <OutLineButton
                  disable={true}
                  textStyle={
                    !filteredDates[2] ? styles.buttonTextIsActive : undefined
                  }
                  style={
                    !filteredDates[2] ? styles.buttonIsActive : styles.button
                  }
                  title={filteredDates[2] ? filteredDates[2] : 'Select Day'}
                  onPress={() => {}}
                  Icon={
                    <Icons.Apple
                      fill={!filteredDates[2] ? primaryBlue : primaryGrey}
                    />
                  }
                />
              </View>
              <View style={styles.daysButtonConteiner}>
                <Text style={styles.buttonTitle}>End Date</Text>
                <OutLineButton
                  disable={true}
                  textStyle={
                    filteredDates[2] ? styles.buttonTextIsActive : undefined
                  }
                  style={
                    filteredDates[2] ? styles.buttonIsActive : styles.button
                  }
                  title={filteredDates[3] ? filteredDates[3] : 'Select Day'}
                  onPress={() => {}}
                  Icon={
                    <Icons.Apple
                      fill={filteredDates[2] ? primaryBlue : primaryGrey}
                    />
                  }
                />
              </View>
            </View>
          </View>
          <View style={styles.calendarConteiner}>{_renderCalendar}</View>
          <View style={styles.bottomButtonsStyle}>
            <BottomButtonGroup
              firstTitle="Cancel"
              secondTitle="Apply"
              onFirstButtonPress={() => {
                onCancle();
              }}
              onSecondButtonPress={() => {
                onApplay(filteredDates);
              }}
              firstTitleColor={primaryBlack}
              secondTitleColor={primaryBlue}
            />
          </View>
        </View>
      }
    />
  );
};
export default CalendarComponent;
