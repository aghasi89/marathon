import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  Image,
  Pressable,
} from 'react-native';
import {primaryBlack} from '../../../assets/styles/colors.styles';
import Icons from '../../../assets/icons/svg';
import styles from './HeaderWithUserInfo.styles';

type Props = {
  rightComponent?: JSX.Element;
  rightComponentStyle?: ViewStyle;
  leftIcon?: boolean;
  leftIconPress?: () => void;
  image?: string;
  imageAlt?: JSX.Element;
  title?: string;
  subText?: string;
  subTextColor?: string;
  onPressToNavigate?: () => void;
};
const HeaderWithUserInfo: React.FC<Props> = ({
  rightComponent,
  rightComponentStyle,
  leftIcon,
  leftIconPress,
  image,
  imageAlt,
  title,
  subText,
  subTextColor,
  onPressToNavigate,
}) => {
  return (
    <View style={styles.container}>
      {leftIcon ? (
        <TouchableOpacity style={styles.arrowButton} onPress={leftIconPress}>
          <Icons.ArrowIcon fill={primaryBlack} />
        </TouchableOpacity>
      ) : (
        <View style={styles.leftIconAltView} />
      )}
      <Pressable onPress={onPressToNavigate} style={styles.userInfoContainer}>
        <View style={styles.imageContainer}>
          {image ? (
            <Image style={styles.imageStyle} source={{uri: image}} />
          ) : (
            imageAlt
          )}
        </View>
        <View style={styles.infoTextsContainer}>
          <Text style={styles.titleText}>{title ?? ''}</Text>
          {subText && (
            <Text
              style={[styles.subText, {color: subTextColor ?? primaryBlack}]}>
              {subText ?? ''}
            </Text>
          )}
        </View>
      </Pressable>
      <View style={[styles.rightComponent, rightComponentStyle]}>
        {rightComponent}
      </View>
    </View>
  );
};

export default HeaderWithUserInfo;
