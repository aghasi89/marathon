import React from 'react';
import { Text, ViewStyle, TouchableOpacity, TextStyle, View } from 'react-native';
import styles from './OutLineButton.styles';
type Props = {
  title?: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  Icon?: any;
  disable?: boolean;
  textStyle?: TextStyle | TextStyle[];
  rightIcon?: any
};
const OutLineButton: React.FC<Props> = ({
  title,
  onPress,
  style,
  Icon,
  disable,
  textStyle,
  rightIcon
}) => {
  return (
    <TouchableOpacity
      disabled={disable}
      style={[styles.container, style]}
      onPress={onPress}>
      {Icon}
      {title ? <Text style={[styles.text, textStyle]}>{title}</Text> : null}
      {
        rightIcon && <View style={styles.rightIcon}>
          {rightIcon}
        </View>
      }
    </TouchableOpacity>
  );
};
export default OutLineButton;
