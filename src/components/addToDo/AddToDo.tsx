import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './AddToDo.styles';
import Icons from '../../assets/icons/svg';
import {borderStyle} from '../../assets/styles/global.styles';
import {
  backgroundBlue,
  formFieldGrey,
  green,
  primaryBlue,
  red,
} from '../../assets/styles/colors.styles';

enum ToDoTypes {
  eat,
  play,
  file,
  edit,
  size,
  live,
  rest,
}
type ListType = {
  type: ToDoTypes;
  select?: () => void;
  isActive: boolean;
};
type Props = {
  date: Date;
  list: ListType[];
  borderStyleType?: 'default' | 'dashed';
  onPressAddButton?: () => void;
};
const AddToDo: React.FC<Props> = ({
  list,
  borderStyleType,
  onPressAddButton,
}) => {
  const renderToDoType = (item: ListType) => {
    switch (item.type) {
      case ToDoTypes.eat:
        return (
          <>
            {item.isActive && (
              <View style={styles.icon}>
                <Icons.CheckIcon fill={'#15C5AE'} />
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
              <Icons.Nutrition />
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
              <Icons.Trainer />
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
        <View style={styles.dateStyles}>
          <Text style={styles.dayText}>1</Text>
          <Text style={styles.monthText}>Mon</Text>
        </View>
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
        <TouchableOpacity style={styles.addButton} onPress={onPressAddButton}>
          <Icons.Plus height={23} width={23} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AddToDo;
