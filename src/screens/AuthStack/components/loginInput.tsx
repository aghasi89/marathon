import React from 'react';
import { View, TextInput, TouchableOpacity, ViewStyle } from 'react-native';
import styles from './loginInput.styles';
import { borderGrey, lighBlack, red } from '../../../assets/styles/colors.styles';

type Props = {
  value: string;
  onChangeValue: (value: string) => void;
  secureTextEntry?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  leftIcon?: any;
  rightIcon?: any;
  placeholderText?: string;
  valid?: boolean;
  onPressRightIcon?: () => void;
  style: ViewStyle | ViewStyle[],
  editable?: boolean,
  multiline?: boolean,
  type?: string
};

const LoginInput: React.FC<Props> = ({
  value,
  secureTextEntry,
  onChangeValue,
  onFocus,
  onBlur,
  rightIcon,
  leftIcon,
  placeholderText,
  valid,
  onPressRightIcon,
  style,
  editable,
  multiline,
  type
}) => {

  return (
    <View style={[styles.container, style, { borderColor: valid ? red : borderGrey }]}>
      {leftIcon && <TouchableOpacity style={styles.icons}>{leftIcon}</TouchableOpacity>}
      <TextInput
        //@ts-ignore
        keyboardType={type ? type : 'default'}
        value={value}
        onChangeText={onChangeValue}
        editable={editable}
        style={styles.textInpuContainer}
        onFocus={onFocus}
        onBlur={onBlur}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        placeholder={placeholderText}
        placeholderTextColor={lighBlack}
      />
      <TouchableOpacity style={styles.icons} onPress={onPressRightIcon}>
        {rightIcon}
      </TouchableOpacity>
    </View>
  );
};
export default LoginInput;
