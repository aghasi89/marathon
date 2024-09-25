import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icons from '../../assets/icons/svg/index';
import styles from './Card.style';

type Props = {
  leftIcon: any;
  color: string;
  title: string;
  list?: string[];
  rightIcon: any;
  rightIconVisible: boolean;
  isFile: boolean;
  isEdit?: boolean;
  noteText?: string;
  onPressItem: () => void;
};
const Card: React.FC<Props> = ({
  leftIcon,
  color,
  title,
  list,
  rightIcon,
  rightIconVisible,
  isFile,
  isEdit,
  noteText,
  onPressItem,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.rowContainer}>
          {leftIcon}
          <Text style={[styles.textTitile, {color: color}]}>{title}</Text>
        </View>
        {rightIcon}
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.rowContainer}>
          {isEdit ? (
            <Text style={styles.text}>{noteText}</Text>
          ) : (
            list.map((item: string, index: number) => {
              return isFile ? (
                <View key={index} style={styles.circleContainer}>
                  <Icons.File />
                </View>
              ) : (
                <Image
                  key={index}
                  source={{uri: item}}
                  style={styles.circleContainer}
                />
              );
            })
          )}
        </View>
        {rightIconVisible && (
          <TouchableOpacity style={styles.iconContainer} onPress={onPressItem}>
            <Icons.Plus />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default Card;
