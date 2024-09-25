import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {
  green,
  primaryBlack,
  primaryBlue,
} from '../../../../assets/styles/colors.styles';
import Icons from '../../../../assets/icons/svg/index';
import {calcHeight} from '../../../../assets/dimensions';
import OutLineButton from '../../../../components/buttons/outline/OutLineButton';
import EditSheet from '../../../../components/editSheet/EditSheet';
import ProgramDays from '../../../../components/programDays/ProgramDays';
import MainHeader from '../../../../components/headers/mainHeader/MainHeader';
import TimelineItem from './TimelineItem';
import CreateProgramDetailHook from './CreateProgramDetail-hook';
import styles from './CreateProgramDetail.style';

type Props = {navigation: any};
const Daily: React.FC<Props> = ({navigation}) => {
  const {
    days,
    deleteDay,
    ToDoTypes,
    isOpenEditSheet,
    setIsOpenEditSheet,
    onSelectNutrition,
    onSelectWorkout,
    onSelectFiles,
    onSelectNotes,
    onSelectRest,
    onSelectClearAll,
    isOpenEditSheetToDo,
    setIsOpenEditSheetToDo,
    programDetail,
    onPlusFiles,
    dailyDayIndex,
    onPlusNutrition,
    onPlusWorkouts,
    leftIconPress,
  } = CreateProgramDetailHook();

  const editSheetToDo = [
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

  const editSheet = [
    {
      title: 'Edit',
      onSelect: () => {
        setIsOpenEditSheet(false);
      },
      Icon: <Icons.Edit />,
    },
    {
      title: 'Duplicate',
      onSelect: () => {
        setIsOpenEditSheet(false);
      },
      Icon: <Icons.DuplicateIcon fill={primaryBlack} />,
    },
    {
      title: 'Bookmark',
      onSelect: () => {
        setIsOpenEditSheet(false);
      },
      Icon: <Icons.BookmarkIcon fill={primaryBlack} />,
    },
    {
      title: 'Delete',
      onSelect: () => {
        setIsOpenEditSheet(false);
      },
      Icon: <Icons.DeleteIcon fill={primaryBlack} />,
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
    <View style={styles.dailyContainer}>
      <MainHeader
        leftIconPress={leftIconPress}
        leftIcon={true}
        title={programDetail.title}
        leftComponent={
          <Icons.EllipsisIcon
            fill={primaryBlack}
            style={styles.iconStyle}
            onPress={() => setIsOpenEditSheet(true)}
          />
        }
      />
      <ScrollView contentContainerStyle={styles.itemsContainer}>
        <ProgramDays days={days} dayIndex={dailyDayIndex} />
        <View style={styles.dayContainer}>
          <TimelineItem
            onPressPlusNutrition={() => onPlusNutrition(dailyDayIndex)}
            onPressPlusWorkouts={() => onPlusWorkouts(dailyDayIndex)}
            onPressPlusFiles={() => onPlusFiles(dailyDayIndex)}
            day={days[dailyDayIndex]}
            onDeleteDay={() => deleteDay(dailyDayIndex)}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
          />
        </View>
        <OutLineButton
          title="add"
          onPress={() => {
            setIsOpenEditSheetToDo(true);
          }}
          style={styles.outlineButtonStyle}
          textStyle={styles.outlineButtonText}
        />
        <EditSheet
          isVisible={isOpenEditSheetToDo}
          height={calcHeight(489)}
          onClose={() => setIsOpenEditSheetToDo(false)}
          list={editSheetToDo}
        />
        <EditSheet
          isVisible={isOpenEditSheet}
          height={calcHeight(400)}
          onClose={() => setIsOpenEditSheet(false)}
          list={editSheet}
        />
      </ScrollView>
    </View>
  );
};
export default Daily;
