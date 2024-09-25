/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {formFieldGrey} from '../../assets/styles/colors.styles';
import Icons from '../../assets/icons/svg/index';
import {IProgramDay} from '../../store/reducers/programs-reducer';
import Toaster from '../toester/Toester';
import styles from './ProgramDaysSheet.style';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  list: IProgramDay[];
  height?: number;
  onPressPlus: () => void;
};

const ProgramDaysSheet: React.FC<Props> = ({
  isVisible,
  onClose,
  list,
  height,
  onPressPlus,
}) => {
  const week: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <Toaster
      height={height ?? calcHeight(300)}
      isVisible={isVisible}
      onClose={onClose}
      Screen={
        <View style={styles.listContainer}>
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
            {list.map((element, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity key={index} style={styles.circles}>
                    <Text style={styles.countText}>{index + 1}</Text>
                  </TouchableOpacity>
                  <View style={styles.toDoListContainer}>
                    {element.nutritions?.length > 0 && (
                      <View style={styles.toDoListItemNutrition}></View>
                    )}
                    {(element.workouts?.activities.length > 0 ||
                      element.workouts?.workouts.length > 0) && (
                      <View style={styles.toDoListItemWorkouts}></View>
                    )}
                    {element.edits?.length > 0 && (
                      <View style={styles.toDoListItem}></View>
                    )}
                    {element.files?.length > 0 && (
                      <View style={styles.toDoListItem}></View>
                    )}
                    {element.rest && <View style={styles.toDoListItem}></View>}
                  </View>
                </View>
              );
            })}
            <TouchableOpacity style={styles.circleDashed} onPress={onPressPlus}>
              <Icons.Plus
                width={calcWidth(13)}
                height={calcHeight(13)}
                fill={formFieldGrey}
              />
            </TouchableOpacity>
          </View>
        </View>
      }
    />
  );
};
export default ProgramDaysSheet;
