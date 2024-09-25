import React from 'react';
import {View, Image, Text} from 'react-native';
import styles from './ConnectUserCard.style';
type Props = {
  image: string;
  title: string;
};
const ConnectUserCard: React.FC<Props> = ({image, title}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};
export default ConnectUserCard;
