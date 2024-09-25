import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './NotificationCard.style';

type Props = {
  imageUrl: string;
  title: string;
  name: string;
  onPress: () => void;
  date: string;
  unRead?: boolean;
};
const NotificationCard: React.FC<Props> = ({
  imageUrl,
  title,
  name,
  onPress,
  date,
  unRead,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress();
      }}>
      <View style={styles.rowContainer}>
        <Image source={{uri: imageUrl}} style={styles.image} />
        <View style={styles.textContainer}>
          <View style={styles.textRowContainer}>
            <Text style={styles.textName}>{name}</Text>
            <Text style={styles.textDate}>{date}</Text>
          </View>
          <Text style={styles.text}>{title}</Text>
        </View>
        {unRead && <View style={styles.icon}></View>}
      </View>
    </TouchableOpacity>
  );
};
export default NotificationCard;
