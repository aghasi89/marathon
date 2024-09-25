import React from 'react';
import {View, Text, ViewStyle, Pressable} from 'react-native';
import Icons from '../../../../../../assets/icons/svg';
import styles from './AddCardWithoutContent.style';

type Props = {
  title: string;
  children: React.ReactNode;
  customStyles?: {
    container?: ViewStyle|ViewStyle[]|undefined;
    childrenContainer?: ViewStyle|ViewStyle[];
  };
  onCloseIconPress?:()=>void,
  closeIconExist?:boolean
};

const AddCardWithoutContent: React.VFC<Props> = ({
  title,
  children,
  customStyles,
  onCloseIconPress,
  closeIconExist=true
}) => {
  return (
    <View style={[styles.container, customStyles?.container]}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Pressable onPress={onCloseIconPress}>
          {closeIconExist&&<Icons.Close {...styles.closeIconStyle} />}
        </Pressable>
      </View>
      <View style={[styles.child,customStyles?.childrenContainer]}>{children}</View>
    </View>
  );
};

export default AddCardWithoutContent;
