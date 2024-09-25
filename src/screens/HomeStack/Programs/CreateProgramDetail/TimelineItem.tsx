import React, {useMemo} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Icons from '../../../../assets/icons/svg/index';
import {
  formFieldGrey,
  green,
  primaryBlue,
} from '../../../../assets/styles/colors.styles';
import Card from '../../../../components/card/Card';
import {IProgramDay} from '../../../../store/reducers/programs-reducer';
import styles from './CreateProgramDetail.style';

enum ToDoTypes {
  eat,
  play,
  edit,
  file,
  rest,
}
type ListType = {
  type: ToDoTypes;
  select?: () => void;
  isActive: boolean;
};
type Props = {
  day: IProgramDay;
  onPress?: () => void;
  onDeleteDay: () => void;
  leftIcon: (type) => JSX.Element;
  rightIcon: (type) => JSX.Element;
  index?: number;
  title?: string;
  onPressDay?: () => void;
  onPressPlusNutrition: () => void;
  onPressPlusWorkouts: () => void;
  onPressPlusFiles: () => void;
};
const TimelineItem: React.FC<Props> = ({
  day,
  onPress,
  onDeleteDay,
  leftIcon,
  rightIcon,
  index,
  title,
  onPressPlusNutrition,
  onPressPlusWorkouts,
  onPressPlusFiles,
  onPressDay,
}) => {
  const dayItem = day;
  const list: ListType[] = useMemo(() => {
    const result: ListType[] = [];
    if (dayItem.nutritions.length > 0) {
      result.push({
        isActive: false,
        type: ToDoTypes.eat,
      });
    }
    if (
      dayItem.workouts.workouts.length > 0 ||
      dayItem.workouts.activities.length > 0
    ) {
      result.push({
        isActive: false,
        type: ToDoTypes.play,
      });
    }
    if (dayItem.edits.length > 0) {
      result.push({
        isActive: false,
        type: ToDoTypes.edit,
      });
    }
    if (dayItem.files.length > 0) {
      result.push({
        isActive: false,
        type: ToDoTypes.file,
      });
    }
    if (dayItem.rest) {
      result.push({
        isActive: false,
        type: ToDoTypes.rest,
      });
    }
    return result;
  }, [
    dayItem.nutritions,
    dayItem.workouts,
    dayItem.files,
    dayItem.edits,
    dayItem.rest,
  ]);

  return (
    <View>
      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.weekDayItem} onPress={onPressDay}>
          <Text style={styles.title}>{index}</Text>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          {onPress && (
            <TouchableOpacity onPress={onPress}>
              <Icons.Plus fill={formFieldGrey} />
            </TouchableOpacity>
          )}
          {list.length > 0 && (
            <>
              <TouchableOpacity style={styles.close} onPress={() => {}}>
                <Icons.DuplicateIcon fill={formFieldGrey} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.close} onPress={onDeleteDay}>
                <Icons.DeleteIcon fill={formFieldGrey} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      {list.map((item, index) => {
        return (
          <View key={index} style={styles.weekDayItemTimeline}>
            {item.type === ToDoTypes.rest ? (
              <View style={styles.timelineRest}>
                <Icons.Rest />
              </View>
            ) : (
              <Card
                onPressItem={
                  item.type === ToDoTypes.eat
                    ? onPressPlusNutrition
                    : item.type === ToDoTypes.play
                    ? onPressPlusWorkouts
                    : // : item.type === ToDoTypes.file
                      onPressPlusFiles
                }
                title={
                  item.type === ToDoTypes.eat
                    ? 'Nutritions'
                    : item.type === ToDoTypes.play
                    ? 'Workouts'
                    : item.type === ToDoTypes.file
                    ? 'Files'
                    : 'Notes'
                }
                leftIcon={leftIcon(item.type)}
                color={
                  item.type === ToDoTypes.eat
                    ? green
                    : item.type === ToDoTypes.play
                    ? primaryBlue
                    : formFieldGrey
                }
                rightIcon={
                  (item.type === ToDoTypes.eat ||
                    item.type === ToDoTypes.play) &&
                  rightIcon(item.type)
                }
                rightIconVisible={item.type === ToDoTypes.edit ? false : true}
                list={
                  item.type === ToDoTypes.edit
                    ? []
                    : [
                        'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
                        'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
                        'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
                      ]
                }
                isFile={item.type === ToDoTypes.file ? true : false}
                isEdit={item.type === ToDoTypes.edit ? true : false}
                noteText="Lorem Ipsum is simply dummy text of the printing and typesetting industry..."
              />
            )}
          </View>
        );
      })}
    </View>
  );
};
export default TimelineItem;
