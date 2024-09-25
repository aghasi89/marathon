import * as React from 'react';
import {Pressable, Text, View, ViewStyle} from 'react-native';
import { useTranslation } from 'react-i18next';
import { primaryBlue } from '../../../../assets/styles/colors.styles';
import Icons from '../../../../assets/icons/svg';
import styles from './CheckboxWithLable.style';

type Props = {
  onPress?: (lable:string) => void;
  isSelected?: boolean;
  label?: string;
  containerStyle?:ViewStyle|ViewStyle[]
};
const CheckboxWithLabel: React.VFC<Props> = ({label, isSelected, onPress,containerStyle}) => {
  const {t} =useTranslation()
  return (
    <Pressable onPress={()=>onPress&&onPress(label??'')} style={[styles.container,containerStyle]}>
      <View style={styles.checkBox}>
        {isSelected&&<Icons.Check fill={primaryBlue} />}
      </View>
      {label && <Text style={styles.label}>{t(label)}</Text>}
    </Pressable>
  );
};
export default CheckboxWithLabel;
