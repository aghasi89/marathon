import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './DashBoardItem.style';
type Props = {
  icon: any;
  title: string;
  description: string;
  onPress: () => void;
};
const DashBoardItem: React.FC<Props> = ({
  title,
  icon,
  description,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default DashBoardItem;
