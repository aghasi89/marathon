import React from 'react';
import {View, Text} from 'react-native';
import SimpleGradientProgressbarView from 'react-native-simple-gradient-progressbar-view';
import {primaryBlue, primaryLightBlue} from '../../assets/styles/colors.styles';
import {styles} from './ProgressViewGradient.style';
import Icons from '../../assets/icons/svg/index';
type Props = {
  title: string;
  progress?: number;
  icon: any;
  startTitle: string;
  timeTitle: string;
  weightOne: string;
  weightTwo: string;
  weightThree: string;
  isProgress: boolean;
};
const ProgressViewGradientCard: React.FC<Props> = ({
  title,
  progress,
  icon,
  startTitle,
  timeTitle,
  weightOne,
  weightTwo,
  weightThree,
  isProgress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.iconContainer}>{icon}</View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Icons.EllipsisIcon />
      </View>
      <View style={styles.mediumContainer}>
        <Text style={styles.text}>{startTitle}</Text>
        <Text style={styles.timeText}>{timeTitle}</Text>
      </View>
      {isProgress && (
        <>
          <View style={styles.progressContainer}>
            <SimpleGradientProgressbarView
              style={styles.box}
              fromColor={primaryLightBlue}
              toColor={primaryBlue}
              progress={progress}
              maskedCorners={[1, 1, 1, 1]}
              cornerRadius={7.0}
            />
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.textKg}>{weightOne}</Text>
            <Text style={styles.blueTextKg}>{weightTwo}</Text>
            <Text style={styles.textKg}>{weightThree}</Text>
          </View>
        </>
      )}
    </View>
  );
};
export default ProgressViewGradientCard;
