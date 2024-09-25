import React, { ReactNode } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import DefaultButton from './default/DefaultButton';
import OutLineButton from './outline/OutLineButton';
type Props = {
  type: 'outline' | 'default';
  title?: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  Icon?: ReactNode;
  disable?: boolean;
  textStyle?: TextStyle | TextStyle[];
  rightIcon?: ReactNode;
  shadow?:boolean
};
export const PrimeryButton: React.FC<Props> = ({
  type,
  title,
  onPress,
  style,
  Icon,
  disable,
  textStyle,
  rightIcon,
  shadow
}) => {
  if (type === 'default') {
    return (
      <DefaultButton
        shadow={shadow}  
        title={title}
        onPress={onPress}
        style={style}
        Icon={Icon}
        rightIcon={rightIcon}
        disable={disable}
        textStyle={textStyle}
      />
    );
  } else if (type == 'outline') {
    return (
      <OutLineButton
        title={title}
        onPress={onPress}
        style={style}
        Icon={Icon}
        disable={disable}
        textStyle={textStyle}
        rightIcon={rightIcon}
      />
    );
  } else {
    return null
  }
};
