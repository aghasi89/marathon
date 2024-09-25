import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import styles from './TextWithIcon.style';

interface ITextWithIcon {
  icon: any,
  text: String
  textStyle?:ViewStyle,
}

export default function TextWithIcon(props: ITextWithIcon) {
  const { icon, text,textStyle} = props
  return (
    <View style={styles.container}>
      {icon}
      <Text style={textStyle?textStyle:styles.text}>{text}</Text>
    </View>
  );
};
