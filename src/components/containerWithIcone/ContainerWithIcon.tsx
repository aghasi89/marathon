import React from 'react';
import {View, Text, TouchableOpacity, ViewStyle} from 'react-native';
import Icons from '../../assets/icons/svg/index';
import {primaryBlack, primaryWhite} from '../../assets/styles/colors.styles';
import styles from './ContainerWithIcon.style';
type Props = {
  containerStyle?: ViewStyle;
  value: string | JSX.Element;
  textStyle?: ViewStyle;
  styleGenegalContainer:ViewStyle,
  onClose:()=>void
};
const ContainerWithIcon: React.FC<Props> = ({
  containerStyle,
  value,
  textStyle,
  styleGenegalContainer,
  onClose
}) => {
  return (
    <View style={styleGenegalContainer}>
      {typeof value === 'string' ? (
        <View
          style={[
            styles.containerWithText,
            containerStyle ?? styles.containerDefaultStyles,
          ]}>
          <Text style={[styles.text, textStyle]}>{value}</Text>
          <TouchableOpacity style={styles.IconTouch} onPress={()=>onClose()}>
            <Icons.Close fill={primaryWhite} {...styles.iconeStyle} />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={[
            styles.container,
            containerStyle ?? styles.containerDefaultStyles,
          ]}>
          {value}
          <TouchableOpacity style={styles.IconTouch} onPress={()=>onClose()}>
            <Icons.Close fill={primaryBlack} {...styles.iconeStyle} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default ContainerWithIcon;
