import * as React from 'react';
import {
  View,
  TextInput,
  ViewStyle,
  KeyboardTypeOptions,
  TextStyle,
  Pressable,
  Text,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  TextInputProps
} from 'react-native';
import {lightSteelBlue} from '../../../../../assets/styles/colors.styles';
import Icons from '../../../../../assets/icons/svg';
import styles from './InputComponent.style';

type Props = {
  onChange?: (text: string) => void;
  value?: string;
  placeholder?: string;
  containerStyle?: ViewStyle | ViewStyle[];
  placeholderTextColor?: string,
  icon?: React.ReactNode;
  inputType?: KeyboardTypeOptions;
  inputStyle?: ViewStyle | TextStyle|ViewStyle[]|TextStyle[];
  disabled?: boolean;
  multiline?: boolean;
  closeIconPress?: () => void;
  closeIconAvailability?: boolean;
  label?: string;
  rightIcon?: React.ReactNode;
  isInvalid?: boolean;
  autoFocus?: boolean;
  forwardedRef?: any;
  labelStyle?: TextStyle;
  textAlignVertical?:"center" | "auto" | "top" | "bottom" | undefined
  onFocus?:(e:NativeSyntheticEvent<TextInputFocusEventData>)=>void
  onSubmitEditing?:(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void
};

const InputComponent: React.VFC<Props&Omit<TextInputProps,'onChange'>> = ({
  onChange,
  value,
  placeholder,
  containerStyle,
  icon,
  inputType,
  inputStyle,
  disabled,
  multiline,
  closeIconPress,
  closeIconAvailability,
  label,
  rightIcon,
  isInvalid,
  autoFocus,
  forwardedRef,
  labelStyle,
  textAlignVertical='center',
  onFocus,
  onSubmitEditing,
  placeholderTextColor,
  ...props
}) => {
  return (
    <View>
      <View style={styles.labelContainer}>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      </View>
      <View
        style={[
          styles.container,
          containerStyle,
          !isInvalid ? styles.borderColor : styles.borderColorInvalid,
        ]}
        pointerEvents={disabled ? 'none' : undefined}>
        {icon}
        <TextInput
          onSubmitEditing={onSubmitEditing}
          ref={forwardedRef}
          autoFocus={autoFocus}
          textAlignVertical={textAlignVertical}
          onChangeText={onChange}
          value={value}
          placeholder={placeholder}
          style={[styles.input, inputStyle]}
          placeholderTextColor={placeholderTextColor ? placeholderTextColor : lightSteelBlue}
          keyboardType={inputType}
          multiline={multiline}
          onFocus={onFocus}
          {...props}
        />
        {(closeIconAvailability || rightIcon) &&
          (closeIconAvailability ? (
            <Pressable
              onPress={closeIconPress}
              style={styles.closeIconContainer}>
              <Icons.Close {...styles.closeIcon} />
            </Pressable>
          ) : (
            rightIcon
          ))}
      </View>
    </View>
  );
};
export default InputComponent;
