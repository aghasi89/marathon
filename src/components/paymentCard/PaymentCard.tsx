import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './PaymentCard.style';
type Props = {
  imageUrl: string;
  title: string;
  name: string;
  onPress: () => void;
  date: string;
  price: string;
};
const PaymentCard: React.FC<Props> = ({
  imageUrl,
  title,
  name,
  onPress,
  date,
  price,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress();
      }}>
      <Text style={styles.textDate}>{date}</Text>
      <View style={styles.textRowContainer}>
        <Image source={{uri: imageUrl}} style={styles.image} />
        <View>
          <Text style={styles.textName}>{name}</Text>
          <Text style={styles.textTitle}>{title}</Text>
        </View>
      </View>
      <Text style={styles.textPrice}>{price} $</Text>
    </TouchableOpacity>
  );
};
export default PaymentCard;
