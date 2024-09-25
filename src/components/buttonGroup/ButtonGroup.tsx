import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {formFieldGrey} from '../../assets/styles/colors.styles';
import styles from './BottomButtonGroup.style';
import Icons from '../../assets/icons/svg/index';

interface IButtonGroup {
  firstTitle: string;
  secondTitle: string;
  onFirstButtonPress: () => void;
  onSecondButtonPress: () => void;
  firstTitleColor: any;
  secondTitleColor: any;
}

export default function ButtonGroup(props: IButtonGroup) {
  const {
    firstTitle,
    secondTitle,
    onFirstButtonPress,
    onSecondButtonPress,
    firstTitleColor,
    secondTitleColor,
  } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onFirstButtonPress}
        style={styles.textContainer}>
        <Icons.ImportUp fill={formFieldGrey} />
        <Text style={[styles.text, {color: firstTitleColor}]}>
          {firstTitle}
        </Text>
      </TouchableOpacity>
      <View style={styles.line}></View>
      <TouchableOpacity
        onPress={onSecondButtonPress}
        style={styles.textContainer}>
        <Icons.Youtube fill={formFieldGrey} />
        <Text style={[styles.text, {color: secondTitleColor}]}>
          {secondTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
