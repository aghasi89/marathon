import * as React from 'react';
import {Image, View, ViewStyle, Text, Pressable} from 'react-native';
import { formatTimeDuration } from '../../../../../../utils/formatTimeDuration';
import Icons from '../../../../../../assets/icons/svg';
import styles from './ExerciseItemCard.style';

type Props = {
  name?: string;
  url?: string;
  time?: string;
  restTime?: string;
  containerStyle?: ViewStyle | ViewStyle[];
  closeIconPress?: () => void;
  hideCloseIcon?: boolean;
  onPress?:()=>void
};

const ExerciseItemCard: React.VFC<Props> = ({
  name,
  time,
  containerStyle,
  restTime,
  url,
  closeIconPress,
  hideCloseIcon,
  onPress
}) => {
  return (
    <Pressable onPress = {onPress} style={[styles.container, containerStyle]}>
      {!hideCloseIcon && (
        <Pressable
          onPress={closeIconPress}
          style={styles.closeIconTouchContainer}>
          <Icons.Close {...styles.closeIcon} />
        </Pressable>
      )}
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: url}} />
        <View style={styles.playIconContainer}>
          <View style={styles.playIconBackground}>
            <Icons.Play {...styles.playIcon} />
          </View>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{name ?? ''}</Text>
        <View style={styles.timesContainer}>
          {!!time && (
            <View style={styles.timeItemContainer}>
              <Icons.Hourglass {...styles.hourglassIcon} />
              <Text style={styles.time}>{formatTimeDuration(time)}</Text>
            </View>
          )}
          {!!restTime && (
            <View style={styles.timeItemContainer}>
              <Icons.RestIcon />
              <Text style={styles.time}>{formatTimeDuration(restTime)}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};
export default ExerciseItemCard;
