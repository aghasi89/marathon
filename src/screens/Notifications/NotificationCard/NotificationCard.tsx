import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './NotificationCard.style';
import Icons from '../../../assets/icons/svg/index'
import { lightPeriwinkles, primaryBlue, primaryWhite, robinEggBlue } from '../../../assets/styles/colors.styles';

interface IProps {
  notoficationTypeText: string,
  imageUrl?: string,
  feedImageUrl?: string,
  name: string,
  date: string,
  onPress: () => void,
  is_reed: boolean
}

const NotificationCard: React.FC<IProps> = (props) => {

  const { notoficationTypeText, imageUrl, name, date, onPress, is_reed, feedImageUrl } = props

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: is_reed ? primaryWhite : robinEggBlue }]}
      onPress={() => {
        onPress();
      }}>
      <View style={styles.rowContainer}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.image]}>
            <Icons.UserIcon width={'100%'} height={'100%'} />
          </View>
        )}
        <View style={styles.textContainer}>
          <View style={styles.textRowContainer}>
            <Text style={styles.textName}>{name}</Text>
            <Text style={[styles.textDate, { color: is_reed ? lightPeriwinkles : primaryBlue }]}>{date}</Text>
          </View>
          <Text style={styles.text}>{notoficationTypeText}</Text>
        </View>
        <Image
          source={{ uri: feedImageUrl }}
          style={styles.feedContainer}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};
export default NotificationCard;
