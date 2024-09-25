import * as React from 'react';
import { Pressable, Text, View, ViewStyle } from 'react-native';
import { primaryBlue } from '../../../../../assets/styles/colors.styles';
import styles from './ChipItem.style';


interface IProps {
  icon?: React.ReactNode;
  description?: string;
  onPress?: () => void;
  color?: string,
  containerStyle?: ViewStyle | ViewStyle[]
}
const ChipItem: React.FC<IProps> = props => {
  const { icon, description, onPress, color = primaryBlue, containerStyle } = props;

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, { borderColor: color }, containerStyle]}>
      <View style={styles.contentContainer}>
        {icon}
        {description && <Text numberOfLines={2} style={[styles.sectionText, { color: color }]}>{description}</Text>}
      </View>
    </Pressable>
  );
};

export default ChipItem;
