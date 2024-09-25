import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {formFieldGrey} from '../../assets/styles/colors.styles';
import Icons from '../../assets/icons/svg/index';
import styles from './VideoinfoCard.style';

type Props = {
  image: string;
  title: string;
  time: string;
  deleteVisable: boolean;
  onPressDelete?: () => void;
};

const VideoInfoCard: React.FC<Props> = ({
  image,
  title,
  time,
  deleteVisable,
  onPressDelete,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Image source={{uri: image}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>{title}</Text>
          <Text style={styles.textTime}>{time}</Text>
        </View>
      </View>
      {deleteVisable && (
        <TouchableOpacity onPress={onPressDelete} style={styles.icon}>
          <Icons.Close fill={formFieldGrey} />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default VideoInfoCard;
