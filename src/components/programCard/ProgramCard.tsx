import React from 'react';
import {View, Image, Text} from 'react-native';
import Icons from '../../assets/icons/svg/index';
import styles from './ProgramCard.style';
type Props = {
  programName: string;
  userCount: number;
  time: string;
  image: string;
};
const ProgramCard: React.FC<Props> = ({
  programName,
  userCount,
  time,
  image,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>{programName}</Text>
        <View style={styles.textIconContainer}>
          <Icons.UserIcon />
          <Text style={styles.textCount}>{userCount}</Text>
          <Icons.Edit />
          <Text style={styles.textTime}>{time}</Text>
        </View>
      </View>
      <Image source={{uri: image}} style={styles.image} />
    </View>
  );
};
export default ProgramCard;
