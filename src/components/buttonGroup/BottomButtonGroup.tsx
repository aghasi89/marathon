import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './BottomButtonGroup.style';

interface IButtonGroup {
  firstTitle: string;
  secondTitle: string,
  onFirstButtonPress: () => void,
  onSecondButtonPress: () => void,
  firstTitleColor: any,
  secondTitleColor: any
}

export default function BottomButtonGroup(props: IButtonGroup) {
  const {
    firstTitle,
    secondTitle,
    onFirstButtonPress,
    onSecondButtonPress,
    firstTitleColor,
    secondTitleColor } = props
  return (
    <View style={styles.bottomContainer}>
      <TouchableOpacity
        onPress={onFirstButtonPress}
        style={styles.textContainer}>
        <Text style={[styles.text, { color: firstTitleColor }]}>
          {firstTitle}
        </Text>
      </TouchableOpacity>
      <View style={styles.line}></View>
      <TouchableOpacity
        onPress={onSecondButtonPress}
        style={styles.textContainer}>
        <Text style={[styles.text, { color: secondTitleColor }]}>
          {secondTitle}
        </Text>
      </TouchableOpacity>

    </View>
  );
};
