import {ReactNode} from 'react';
import {View, ViewStyle, TextInput, Pressable} from 'react-native';
import {
  primaryBlack,
  primaryBlue,
} from '../../../../../assets/styles/colors.styles';
import styles from './SelectInputComponent.style';

type Props = {
  conatienStyle?: ViewStyle | ViewStyle[];
  buttonIcon?: ReactNode;
  disabled?: boolean;
  value?: string;
  placeholder?: string;
  leftIcon?: ReactNode;
  onButtonPress: () => void;
  isInvalid?:boolean
};

const SelectInputComponent: React.VFC<Props> = ({
  conatienStyle,
  disabled,
  buttonIcon,
  placeholder,
  leftIcon,
  onButtonPress,
  value,
  isInvalid
}) => {
  return (
    <View style={conatienStyle}>
      <Pressable onPress={onButtonPress} style={[styles.contentContainer,!isInvalid?styles.borderColor:styles.borderColorInvalid]}>
        {leftIcon}
        <View
          style={styles.inputContainer}
          pointerEvents={disabled ? 'none' : undefined}>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={disabled ? primaryBlue : primaryBlack}
            value={value}
          />
        </View>
        <View  style={styles.button}>
          {buttonIcon}
        </View>
      </Pressable>
    </View>
  );
};

export default SelectInputComponent;
