import React from 'react';
import {ScrollView, TouchableOpacity, Text, View} from 'react-native';
import {
  inputBorder,
  primaryBlack,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import {IProgramDay} from '../../store/reducers/programs-reducer';
import Icons from "../../assets/icons/svg";
import styles from './ProgramDays.style';

type Props = {
  days: Array<IProgramDay>;
  dayIndex: number;
};

const ProgramDays: React.FC<any> = ({days, dayIndex}) => {
  const dayTitles: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {days.map((day, index) => {
          return (
          <View key={index} style={styles.dayContainer}>
            <TouchableOpacity
              style={
                index === dayIndex ? styles.selectedItem : styles.itemContainer
              }>
              <Text
                style={[
                  styles.dayTitle,
                  {color: index === dayIndex ? primaryWhite : inputBorder},
                ]}>
                {dayTitles[index % 7].toUpperCase()}
              </Text>
              <Text
                style={[
                  styles.day,
                  {color: index === dayIndex ? primaryWhite : primaryBlack},
                ]}>
                {index + 1}
              </Text>
            </TouchableOpacity>
            <View style={styles.dotsContainer}>
            {day.isToDoExist&&(
               day.isToDoExist?.toDo1?.exist&&<View style={styles.toDoGreenBorder}></View>||
               day.isToDoExist?.toDo1?.ended&&<View style={styles.toDoGreenBackground}></View>
               )}
            {day.isToDoExist&&(day.isToDoExist?.toDo2?.exist&&<View style={styles.toDoBlueBorder}></View>||
               day.isToDoExist?.toDo2?.ended&&<View style={styles.toDoBlueBackground}></View>)}
            {day.isToDoExist&&( day.isToDoExist?.toDo3&&
               <View style={styles.toDoPlusIcon}>
                <Icons.PlusDot fill={primaryWhite} />
               </View>
                )}
            </View>
          </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ProgramDays;
