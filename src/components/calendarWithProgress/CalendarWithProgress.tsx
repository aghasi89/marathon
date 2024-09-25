import React, {useMemo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import {CalendarList} from 'react-native-calendars';
import {
  primaryBlack,
  primaryWhite,
  lighBlack,
  backgroudGrayVeryLight,
} from '../../assets/styles/colors.styles';
import {calcHeight} from '../../assets/dimensions';
import { ProgressCircle } from 'react-native-svg-charts';
import Toaster from '../toester/Toester';
import styles from './CalendarWithProgress.styles';

type Props = {
  isVisible: boolean;
  measurments:Array<any>;
  maxValue:number;
  mesurmentKey:string;
  progressColor:string;
  excessColor:string;
  onDatePress:(value)=>void;
};
const CalendarWithProgress: React.FC<Props> = ({
  isVisible,
  measurments,
  maxValue,
  mesurmentKey,
  progressColor,
  excessColor,
  onDatePress
}) => {
  const _renderCalendar = useMemo(() => {
    return (
      <CalendarList
       dayComponent={({date}) => {               
        return (
          <TouchableOpacity style={styles.calendarItemContainer} onPress={()=>onDatePress(date)}>
            <Text style={[styles.dateText]}>{date?.day}</Text>
            {date&&
            <ProgressCircle
              style={styles.progressStyle}
              progress={measurments[date.day-1]?measurments[date.day-1][mesurmentKey]/maxValue:0}
              progressColor={
                measurments[date.day-1]&&measurments[date.day-1][mesurmentKey]-maxValue<0?progressColor:excessColor
              }
              backgroundColor={backgroudGrayVeryLight}
              strokeWidth={3}/>}
          </TouchableOpacity>
        );
      }}
        horizontal={true}
        hideArrows={false}
        pastScrollRange={50}
        futureScrollRange={12}
        hideExtraDays={true}
        calendarStyle={styles.calendarStyle}
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
  }, []);
  return (
    <Toaster
      height={calcHeight(800)}
      isVisible={isVisible}
      onClose={() => {}}
      Screen={
        <View style={styles.container}>
          <View style={styles.calendarConteiner}>{_renderCalendar}</View>
        </View>
      }
    />
  );
};
export default CalendarWithProgress;
