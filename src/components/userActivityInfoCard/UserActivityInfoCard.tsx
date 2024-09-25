import React from 'react';
import {View, Text, ViewStyle} from 'react-native';
import styles from './UserActivityInfoCard.style';

type Props = {
    date:string,
    value:string,
    containerStyle?:ViewStyle
};
const UserActivityInfoCard: React.FC<Props> = ({
    date,
    value,
    containerStyle
}) => {
  return (
    <View style={[styles.container,containerStyle]}>
      <View style={styles.title}>
        <Text style={styles.text}>{date}</Text>
        <Text style={styles.text}>{value}</Text>
      </View>
    </View>
  );
};

export default UserActivityInfoCard;
