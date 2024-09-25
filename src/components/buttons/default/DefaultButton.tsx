import React, { ReactNode } from 'react';
import { Text, ViewStyle, TouchableOpacity, TextStyle } from 'react-native';
import styles from './DefaultButton.styles';
type Props = {
  title?: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  Icon?: any;
  disable?: boolean;
  textStyle?: TextStyle | TextStyle[];
  rightIcon?: ReactNode;
  shadow?:boolean
};
const DefaultButton: React.FC<Props> = ({
  title,
  onPress,
  style,
  Icon,
  disable,
  textStyle,
  rightIcon,
  shadow=true
}) => {
  return (
    <TouchableOpacity
      disabled={disable ? disable : false}
      style={[
        styles.container,
        shadow?styles.shadow:null,
        style,
        {
          opacity: disable ? 0.4 : 1,
        },
      ]}
      onPress={onPress}>
      {Icon}
      <Text style={[styles.text, textStyle]}>{title}</Text>
      {rightIcon}
    </TouchableOpacity>
  );
};
export default DefaultButton;
