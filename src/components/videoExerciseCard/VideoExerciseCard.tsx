import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {formFieldGrey} from '../../assets/styles/colors.styles';
import Icons from '../../assets/icons/svg/index';
import styles from './VideoExerciseCard.style';
type Props = {
  image: string;
  title: string;
  time: string;
  restTime?: string;
  setCount?: number;
  exerciseCount: number;
  onPressDelete: () => void;
  onPressCopy: () => void;
};
const VideoExerciseCard: React.FC<Props> = ({
  image,
  title,
  time,
  restTime,
  setCount,
  exerciseCount,
  onPressDelete,
  onPressCopy,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRowContainer}>
        <Text style={styles.textTitle}>{exerciseCount} Exercise</Text>
        <View style={styles.row}>
          <TouchableOpacity>
            <Icons.DuplicateIcon fill={formFieldGrey} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.close} onPress={onPressDelete}>
            <Icons.Close fill={formFieldGrey} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <Image source={{uri: image}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>{title}</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.textTime}>{time}</Text>
            {setCount && <Text style={styles.textTime}>Set x {setCount}</Text>}
            {restTime && <Text style={styles.textTime}>Rest {restTime}</Text>}
          </View>
        </View>
      </View>
    </View>
  );
};
export default VideoExerciseCard;
