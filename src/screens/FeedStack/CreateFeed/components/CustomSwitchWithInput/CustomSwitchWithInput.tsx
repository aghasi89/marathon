import React from 'react';
import {
  Text,
  View,
  ViewStyle,
  KeyboardTypeOptions,
  TextStyle,
} from 'react-native';
//@ts-ignore
import SwitchSelector from 'react-native-switch-selector';
import {
  primaryWhite,
  aliceBlueBackground,
  lightSteelBlue,
} from '../../../../../assets/styles/colors.styles';
import { calcHeight } from '../../../../../assets/dimensions';
import InputComponent from '../InputComponent/InputComponent';
import styles from './CustomSwitchWithInput.style';

type Props = {
  containerStyle?: ViewStyle | ViewStyle[];
  title?: string;
  icon?: React.ReactNode;
  onChangeValue?: (value: string) => void;
  inputType?: KeyboardTypeOptions;
  inputValue?: string;
  onSwitchPress?: (value: string) => void;
  switchOptions?: {
    label: string;
    value: string;
  }[];
  disabled?: boolean;
  inputRightIcon?: React.ReactNode;
  isInvalid?: boolean;
  initial?: number;
  errorMessage?: string;
  inputShow?: boolean;
  switchShow?: boolean;
  titleStyle?: TextStyle;
};

const CustomSwitchWithInput: React.VFC<Props> = ({
  containerStyle,
  title,
  icon,
  onChangeValue,
  inputType,
  inputValue,
  onSwitchPress,
  switchOptions,
  disabled,
  inputRightIcon,
  isInvalid,
  initial,
  errorMessage,
  inputShow = true,
  switchShow = true,
  titleStyle,
}) => {
  const touchableProps = {
    hitSlop: { top: 10, bottom: 10, left: 10, right: 10 }, // Increase the hitSlop to make the touchable area bigger
  };
  return (
    <View style={containerStyle}>
      <View style={[styles.container]}>
        {title && (
          <View style={styles.titleContainer}>
            {icon}
            <Text style={!titleStyle ? styles.titleText : titleStyle}>
              {title}
            </Text>
          </View>
        )}
        <View style={styles.inputAndSwitchContainer}>
          {inputShow && (
            <InputComponent
              isInvalid={isInvalid}
              onChange={onChangeValue}
              value={inputValue}
              inputType={inputType}
              inputStyle={styles.inputStyle}
              containerStyle={styles.inputContainerStyle}
              disabled={disabled}
              rightIcon={inputRightIcon}
            />
          )}
          {switchShow && (
            <SwitchSelector
              touchableProps={touchableProps}
              onPress={onSwitchPress}
              options={switchOptions}
              buttonColor={primaryWhite}
              backgroundColor={aliceBlueBackground}
              borderColor={aliceBlueBackground}
              textColor={lightSteelBlue}
              hasPadding
              height={calcHeight(35)}
              fontSize={calcHeight(10)}
              style={styles.switchContainer}
              initial={initial ?? 0}
              selectedTextStyle={styles.switchSelectedText}
            />
          )}
        </View>
      </View>
      <View style={styles.inputAndErrorContainer}>
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
      </View>
    </View>
  );
};
export default CustomSwitchWithInput;
