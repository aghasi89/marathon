import * as React from 'react';
import {View, Text, ViewStyle, TouchableOpacity} from 'react-native';
import Icons from '../../../../../assets/icons/svg';
import {primaryGrey} from '../../../../../assets/styles/colors.styles';
import styles from './Header.style';

type Props = {
  title?: string;
  leftIconPressHandler: () => void;
  containerStyle?: ViewStyle;
  rightIcon?: React.ReactNode;
  rightText?: string;
  leftIcon?: boolean;
};

const HeaderComponent: React.VFC<Props> = ({
  containerStyle,
  title,
  leftIconPressHandler,
  rightIcon,
  rightText,
  leftIcon = true,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {leftIcon && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={leftIconPressHandler}>
          <Icons.ArrowIcon fill={primaryGrey} />
        </TouchableOpacity>
      )}
      <View
        style={[
          styles.titleContainer,
          !rightIcon ? styles.titleAlign : styles.titleAlignWithIcon,
        ]}>
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
      {rightIcon && (
        <View style={styles.rightContainer}>
          {rightIcon}
          <Text style={styles.rightText}>{rightText}</Text>
        </View>
      )}
    </View>
  );
};

export default HeaderComponent;
