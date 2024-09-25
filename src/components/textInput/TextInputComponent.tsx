import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import Icons from '../../assets/icons/svg/index';
import { formFieldGrey } from '../../assets/styles/colors.styles';
import styles from './TextInputComponent.style';

interface ITextInput {
  value: string;
  onChangetext: (value: string) => void;
  onBlur?: void;
  onFocus?: void;
  close: () => void;
  rightIcon?: boolean;
}
export default function TextInputComponent(props: ITextInput) {
  const {value, onChangetext, close, rightIcon} = props;
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        style={styles.textInput}
        onChangeText={value => {
          onChangetext(value);
        }}
        multiline={true}
      />
      {rightIcon && (
        <TouchableOpacity
          onPress={() => {
            close();
          }}>
          <Icons.Close fill={formFieldGrey} />
        </TouchableOpacity>
      )}
    </View>
  );
}
