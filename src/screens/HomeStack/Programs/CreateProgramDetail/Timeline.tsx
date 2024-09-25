import React from 'react';
import {Text, View} from 'react-native';
import {
  green,
  primaryBlack,
  primaryBlue,
} from '../../../../assets/styles/colors.styles';
import Icons from '../../../../assets/icons/svg/index';
import {calcHeight} from '../../../../assets/dimensions';
import OutLineButton from '../../../../components/buttons/outline/OutLineButton';
import EditSheet from '../../../../components/editSheet/EditSheet';
import ProgramDaysSheet from '../../../../components/ProgramCalendar/ProgramDaysSheet';
import styles from './CreateProgramDetail.style';
import CreateProgramDetailHook from './CreateProgramDetail-hook';
import TimelineItem from './TimelineItem';

type Props = {navigation: any};
const Timeline: React.FC<Props> = ({navigation}) => {
  const {
    days,
    dayTitles,
    ToDoTypes,
    addDay,
    deleteDay,
    isOpenDaySheet,
    setIsOpenDaySheet,
    onSelectNutrition,
    onSelectWorkout,
    onSelectFiles,
    onSelectNotes,
    onSelectRest,
    onSelectClearAll,
    onPlusNutrition,
    onPlusWorkouts,
    onPlusFiles,
    onPressDay,
    onPressAdd,
    isOpenEditSheet,
    setIsOpenEditSheet,
  } = CreateProgramDetailHook();

  const editSheet = [
    {
      title: 'Nutrition',
      onSelect: onSelectNutrition,
      Icon: <Icons.Nutrition fill={primaryBlack} />,
    },
    {
      title: 'Workout',
      onSelect: onSelectWorkout,
      Icon: <Icons.Trainer fill={primaryBlack} />,
    },
    {
      title: 'Notes',
      onSelect: onSelectNotes,
      Icon: <Icons.NotesEdit fill={primaryBlack} />,
    },
    {
      title: 'Files',
      onSelect: onSelectFiles,
      Icon: <Icons.File fill={primaryBlack} />,
    },
    {
      title: 'Make Rest Day',
      onSelect: onSelectRest,
      Icon: <Icons.Rest fill={primaryBlack} />,
    },
    {
      title: 'Clear All',
      onSelect: onSelectClearAll,
      Icon: <Icons.DeleteBlackIcon fill={primaryBlack} />,
    },
  ];
  const leftIcon = type => {
    return (
      <View style={styles.leftIcon}>
        {type === ToDoTypes.eat ? (
          <Icons.Apple fill={green} />
        ) : type === ToDoTypes.play ? (
          <Icons.Trainer fill={primaryBlue} />
        ) : type === ToDoTypes.edit ? (
          <Icons.NotesEdit fill={primaryBlue} />
        ) : (
          <Icons.File fill={primaryBlue} />
        )}
      </View>
    );
  };
  const rightIcon = type => {
    return (
      <Text style={styles.rightText}>
        {type === ToDoTypes.eat ? '0 kcal' : '60 min'}
      </Text>
    );
  };
  return (
    <View style={styles.itemsContainer}>
      {days.map((day, index) => {
        return (
          <View key={index} style={styles.dayContainer}>
            <TimelineItem
              onPressDay={() => onPressDay(index)}
              onPressPlusNutrition={() => onPlusNutrition(index)}
              onPressPlusWorkouts={() => onPlusWorkouts(index)}
              onPressPlusFiles={() => onPlusFiles(index)}
              index={index + 1}
              title={dayTitles[index % 7]}
              day={day}
              onPress={() => onPressAdd(index)}
              onDeleteDay={() => deleteDay(index)}
              leftIcon={leftIcon}
              rightIcon={rightIcon}
            />
          </View>
        );
      })}
      <OutLineButton
        title="add day"
        onPress={() => setIsOpenDaySheet(true)}
        style={styles.outlineButtonStyle}
        textStyle={styles.outlineButtonText}
      />
      <ProgramDaysSheet
        isVisible={isOpenDaySheet}
        onClose={() => setIsOpenDaySheet(false)}
        list={days}
        onPressPlus={addDay}
      />
      <EditSheet
        isVisible={isOpenEditSheet}
        height={calcHeight(489)}
        onClose={() => setIsOpenEditSheet(false)}
        list={editSheet}
      />
    </View>
  );
};
export default Timeline;
