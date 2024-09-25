import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './packCard.style';
import Icons from '../../assets/icons/svg/index';

type Props = {
  imageUrl?: string;
  title?: string;
  price?: number;
  onPress: () => void;
  startDate?: string;
  userCount?: string;
  type?: string;
  isFinished?: boolean;
  members?: number
};

const PackCard: React.FC<Props> = props => {
  const { imageUrl, title, price, onPress, startDate, userCount, type, members } = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{`${price} $`}</Text>
      </View>
      {imageUrl ? (
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: imageUrl }}
        />
      ) : (
        <Icons.User {...styles.image} />
      )}
      <View style={styles.content}>
        <View>
          <Text style={styles.textDate}>{startDate}</Text>
          <Text numberOfLines={1} style={styles.textName}>
            {title}
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.type}>{type}</Text>
          <Text style={styles.userCount}>{`${members}/${userCount}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default PackCard;
