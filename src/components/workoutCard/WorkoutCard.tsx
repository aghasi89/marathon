import React from 'react';
import {View, Image, Text} from 'react-native';
import {backgroundBlue,primaryBlue} from '../../assets/styles/colors.styles';
import Icons from '../../assets/icons/svg/index';
import styles from './WorkoutCard.style';
import {ProgressCircle} from 'react-native-svg-charts';
type Props = {
  imageUrl: string;
  title: string;
  kcal: number;
  rightIcon: any;
  percent: number;
  restTime?: number;
  time: string;
  containerStyle?:React.CSSProperties;
};
const WorkoutCard: React.FC<Props> = ({
  imageUrl,
  title,
  kcal,
  rightIcon,
  percent,
  restTime,
  time,
  containerStyle,
}) => {
  return (
    <View style={containerStyle??styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.rowContainer}>
          <Image source={{uri: imageUrl}} style={styles.image} />
          <Text style={styles.textTitle}>{title}</Text>
        </View>
        {rightIcon}
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.rowContainer}>
          {restTime && (
            <Text style={styles.textRestTime}>
              {restTime}
              <Text style={styles.textTime}> / </Text>
            </Text>
          )}
          <Text style={styles.textTime}>{time}</Text>

          <Text style={styles.textKCal}>{kcal} kcal</Text>
        </View>

        {percent !== 100 ? (
          <ProgressCircle
            style={styles.progressStyle}
            progress={percent / 100}
            progressColor={primaryBlue}
            backgroundColor={backgroundBlue}
            strokeWidth={4}
          />
        ) : (
          <View style={styles.circle}>
            <Icons.Ceck />
          </View>
        )}
      </View>
    </View>
  );
};
export default WorkoutCard;
