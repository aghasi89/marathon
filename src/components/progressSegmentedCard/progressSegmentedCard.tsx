import React, {useMemo} from 'react';
import {View, Text} from 'react-native';
import SimpleGradientProgressbarView from 'react-native-simple-gradient-progressbar-view';
import {
  green,
  primaryBlue,
  primaryLightBlue,
  red,
} from '../../assets/styles/colors.styles';
import Icons from '../../assets/icons/svg';
import {styles} from './progressSegmentedCard.styles';
import {calcHeight, calcWidth} from '../../assets/dimensions';

type Props = {
  title: string;
  progress: number;
  weight: string;
  weightOne?: string;
  weightTwo?: string;
  weightThree?: string;
  isSegmented?: boolean;
  overWeight?: string;
};
const ProgressSegmentedCard: React.FC<Props> = ({
  title,
  progress,
  weight,
  weightOne,
  weightTwo,
  weightThree,
  isSegmented,
  overWeight,
}) => {
  const progressMarker = useMemo(() => {
    if (progress === 0.1 || progress === 0.6) {
      return progress * 100;
    }
    return progress * 100 - 3;
  }, [progress]);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>{weight}</Text>
      </View>
      {isSegmented ? (
        <>
          <View style={styles.mediumContainer}>
            <View style={styles.progressContainerSegmented}>
              <SimpleGradientProgressbarView
                style={styles.boxSegmented}
                fromColor={green}
                toColor={green}
                progress={progress < 0.25 ? progress * 4 : 1}
                maskedCorners={[1, 0, 1, 0]}
                cornerRadius={7.0}
              />
            </View>
            <View style={styles.progressContainerSegmentedMiddle}>
              <SimpleGradientProgressbarView
                style={styles.boxSegmented}
                fromColor={green}
                toColor={green}
                progress={progress < 0.5 ? (progress - 0.25) * 4 : 1}
                maskedCorners={[0, 0, 0, 0]}
              />
            </View>
            <View style={styles.progressContainerSegmentedRedMiddle}>
              <SimpleGradientProgressbarView
                style={styles.boxSegmented}
                fromColor={red}
                toColor={red}
                progress={progress < 0.75 ? (progress - 0.5) * 4 : 1}
                maskedCorners={[0, 0, 0, 0]}
              />
            </View>
            <View style={styles.progressContainerSegmentedRed}>
              <SimpleGradientProgressbarView
                style={styles.boxSegmented}
                fromColor={red}
                toColor={red}
                progress={progress < 1 ? (progress - 0.75) * 4 : 1}
                maskedCorners={[0, 1, 0, 1]}
                cornerRadius={7.0}
              />
            </View>
          </View>
          <View style={styles.bottomSegmented}>
            <Text style={styles.bottomText}>{overWeight}</Text>
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              marginLeft: `${progressMarker}%`,
            }}>
            <Icons.Polygon />
          </View>
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

      {/* )} */}
    </View>
  );
};
export default ProgressSegmentedCard;
