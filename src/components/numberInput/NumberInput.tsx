import React from 'react';
import {TextInput} from 'react-native';
import styles from './NumberInput.style';

type Props = {
  value: string;
  onChangeValue?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  editable?: boolean;
};
const NumberInput: React.FC<Props> = ({
  value,
  onChangeValue,
  onFocus,
  onBlur,
  editable,
}) => {
  return (
    <TextInput
      editable={editable}
      value={value}
      onChangeText={(value: string) => {
        onChangeValue(value);
      }}
      keyboardType="numeric"
      style={styles.textInpuContainer}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};
export default NumberInput;
