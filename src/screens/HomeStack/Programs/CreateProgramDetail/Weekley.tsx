import React, {useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Icons from '../../../../assets/icons/svg/index';
import {
  formFieldGrey,
  primaryBlack,
} from '../../../../assets/styles/colors.styles';
import {calcHeight} from '../../../../assets/dimensions';
import AddToDoProgram from '../../../../components/addToDo/AddToDoProgram';
import OutLineButton from '../../../../components/buttons/outline/OutLineButton';
import EditSheet from '../../../../components/editSheet/EditSheet';
import ProgramDaysSheet from '../../../../components/ProgramCalendar/ProgramDaysSheet';
import styles from './CreateProgramDetail.style';
import CreateProgramDetailHook from './CreateProgramDetail-hook';

type Props = {navigation: any};
const Weekley: React.FC<Props> = ({navigation}) => {
  const {
    days,
    addWeek,
    dayTitles,
    isOpenDaySheet,
    isOpenEditSheet,
    setIsOpenEditSheet,
    setIsOpenDaySheet,
    deleteWeek,
    onSelectNutrition,
    onSelectWorkout,
    onSelectFiles,
    onSelectNotes,
    onSelectRest,
    onSelectClearAll,
    onPressDay,
    onPressAdd,
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
  const weeks = useMemo(() => {
    let i = 0;
    let result: any[] = [];
    for (i = 0; i < days.length; i += 7) {
      result.push(days.slice(i, i + 7));
    }
    return result;
  }, [days]);

  return (
    <View style={styles.itemsContainer}>
      {weeks.map((week, weekIndex) => {
        return (
          <View key={weekIndex} style={styles.weekContainer}>
            <View style={styles.topRowContainer}>
              <Text style={styles.title}>{weekIndex + 1} week</Text>
              <View style={styles.row}>
                <TouchableOpacity>
                  <Icons.DuplicateIcon
                    fill={formFieldGrey}
                    onPress={() => {}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.close}
                  onPress={() => {
                    deleteWeek(weekIndex, week);
                  }}>
                  <Icons.DeleteIcon fill={formFieldGrey} />
                </TouchableOpacity>
              </View>
            </View>
            <BottomSheetScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.progressCard}>
              {week.map((day, i) => {
                return (
                  <View key={weekIndex + '_index_' + i} style={styles.toDoItem}>
                    <AddToDoProgram
                      dayIndex={7 * weekIndex + i + 1}
                      date={dayTitles[i]}
                      day={day}
                      borderStyleType={'dashed'}
                      onPressAddButton={() => onPressAdd(7 * weekIndex + i)}
                      onPressDay={() => onPressDay(7 * weekIndex + i)}
                      disable={day.rest ? true : false}
                    />
                  </View>
                );
              })}
            </BottomSheetScrollView>
          </View>
        );
      })}
      <OutLineButton
        title="add week"
        onPress={() => setIsOpenDaySheet(true)}
        style={styles.outlineButtonStyle}
        textStyle={styles.outlineButtonText}
      />
      <ProgramDaysSheet
        isVisible={isOpenDaySheet}
        onClose={() => setIsOpenDaySheet(false)}
        list={days}
        onPressPlus={addWeek}
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
export default Weekley;
