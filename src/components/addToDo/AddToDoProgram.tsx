import React, {useMemo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icons from '../../assets/icons/svg';
import {borderStyle} from '../../assets/styles/global.styles';
import {
  backgroundBlue,
  formFieldGrey,
  green,
  primaryBlue,
  red,
} from '../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {IProgramDay} from '../../store/reducers/programs-reducer';
import styles from './AddToDo.styles';

enum ToDoTypes {
  eat,
  play,
  edit,
  file,
  rest,
  size,
  live,
}
type ListType = {
  type: ToDoTypes;
  select?: () => void;
  isActive: boolean;
};

type Props = {
  date: string;
  borderStyleType?: 'default' | 'dashed';
  onPressAddButton?: () => void;
  dayIndex: number;
  day: IProgramDay;
  disable?: boolean;
  onPressDay?: () => void;
};

const AddToDoProgram: React.FC<Props> = ({
  date,
  borderStyleType,
  onPressAddButton,
  dayIndex,
  day,
  disable,
  onPressDay,
}) => {
  const renderToDoType = (item: ListType) => {
    switch (item.type) {
      case ToDoTypes.eat:
        return (
          <>
            {item.isActive && (
              <View style={styles.icon}>
                <Icons.CheckIcon fill={green} />
              </View>
            )}
            <View
              style={[
                styles.types,
                {
                  borderColor: item.isActive ? green : backgroundBlue,
                  borderWidth: item.isActive ? 2 : 1,
                },
              ]}>
              <Icons.Nutrition fill={green} />
            </View>
          </>
        );
      case ToDoTypes.edit:
        return (
          <>
            {item.isActive && (
              <View style={styles.icon}>
                <Icons.CheckIcon fill={formFieldGrey} />
              </View>
            )}
            <View
              style={[
                styles.types,
                {
                  borderWidth: item.isActive ? 2 : 1,
                },
              ]}>
              <Icons.NotesEdit />
            </View>
          </>
        );
      case ToDoTypes.play:
        return (
          <>
            {item.isActive && (
              <View style={styles.icon}>
                <Icons.CheckIcon fill={primaryBlue} />
              </View>
            )}
            <View
              style={[
                styles.types,
                {
                  borderColor: item.isActive ? primaryBlue : backgroundBlue,
                  borderWidth: item.isActive ? 2 : 1,
                },
              ]}>
              <Icons.Trainer fill={primaryBlue} />
            </View>
          </>
        );
      case ToDoTypes.file:
        return (
          <>
            {item.isActive && (
              <View style={styles.icon}>
                <Icons.CheckIcon fill={formFieldGrey} />
              </View>
            )}
            <View
              style={[
                styles.types,
                {
                  borderWidth: item.isActive ? 2 : 1,
                },
              ]}>
              <Icons.File />
            </View>
          </>
        );
      case ToDoTypes.size:
        return (
          <>
            {item.isActive && (
              <View style={styles.icon}>
                <Icons.CheckIcon fill={formFieldGrey} />
              </View>
            )}
            <View
              style={[
                styles.types,
                {
                  borderWidth: item.isActive ? 2 : 1,
                },
              ]}>
              <Icons.HeightLine />
            </View>
          </>
        );
      case ToDoTypes.live:
        return (
          <>
            {item.isActive && (
              <View style={styles.icon}>
                <Icons.CheckIcon fill={red} />
              </View>
            )}
            <View
              style={[
                styles.types,
                {
                  borderColor: item.isActive ? red : backgroundBlue,
                  borderWidth: item.isActive ? 2 : 1,
                },
              ]}>
              <Icons.Live />
            </View>
          </>
        );
      case ToDoTypes.rest:
        return (
          <>
            {item.isActive && (
              <View style={styles.icon}>
                <Icons.CheckIcon fill={formFieldGrey} />
              </View>
            )}
            <View
              style={[
                styles.types,
                {
                  borderWidth: item.isActive ? 2 : 1,
                },
              ]}>
              <Icons.Rest />
            </View>
          </>
        );
      default:
        break;
    }
  };
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
      dayItem.workouts.activities.length > 0 ||
      dayItem.workouts.workouts.length > 0
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
    dayItem.edits,
    dayItem.files,
    dayItem.rest,
  ]);
  return (
    <View>
      <View
        style={[
          styles.container,
          {
            ...borderStyle({
              size: 25,
              type: borderStyleType ? borderStyleType : 'default',
            }),
          },
        ]}>
        <TouchableOpacity style={styles.dateStyles} onPress={onPressDay}>
          <Text style={styles.dayText}>{dayIndex}</Text>
          <Text style={styles.dayText}>{date}</Text>
        </TouchableOpacity>
        <View>
          {list.map((element, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={element.select}
                style={styles.touch}>
                {renderToDoType(element)}
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          disabled={disable}
          style={styles.addButton}
          onPress={onPressAddButton}>
          <Icons.Plus height={calcHeight(23)} width={calcWidth(23)} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AddToDoProgram;
