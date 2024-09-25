import React, {ReactNode} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import SimpleGradientProgressbarView from 'react-native-simple-gradient-progressbar-view';
import {primaryBlue, primaryLightBlue} from '../../assets/styles/colors.styles';
import Icons from '../../assets/icons/svg';
import Check from '../check/Check';
import {styles} from './progressCard.styles';

type ICup = {
  isFull: boolean;
};

type Props = {
  title: string;
  progress?: number;
  icon: ReactNode;
  isSubmited?: boolean;
  isDoing?: boolean;
  kcal?: number;
  sumKcal?: number;
  isNutrition?: boolean;
  list?: string[];
  mesure?: string;
  text?: string;
  noteText?: string;
  cups?: Array<ICup>;
  onPressPlus?: () => void;
  onPressMinus?: () => void;
  files?: string[];
  isMarathonCard?: boolean;
  coachImageUrl?: string;
  marathonText?: string;
  coachName?: string;
  onPress?: () => void;
};

const ProgressCard: React.FC<Props> = ({
  title,
  progress,
  icon,
  isSubmited,
  isDoing,
  kcal,
  sumKcal,
  isNutrition,
  list,
  mesure,
  text,
  noteText,
  cups,
  files,
  onPressMinus,
  onPressPlus,
  isMarathonCard,
  coachImageUrl,
  marathonText,
  coachName,
  onPress,
}) => {
  const renderCup = (item: ICup) => {
    if (item.isFull === true) {
      return <Icons.CupFull />;
    }
    return <Icons.Cup />;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.topContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.iconContainer}>{icon}</View>
          <Text style={styles.title}>{title}</Text>
        </View>
        {isMarathonCard ? (
          <View>
            <Text style={styles.timeText}>25/30 days</Text>
          </View>
        ) : (
          <Check isSubmited={isSubmited} onPress={() => {}} isDoing={isDoing} />
        )}
      </View>
      {mesure ? (
        <View style={styles.mediumContainer}>
          <Text style={styles.timeText}>{mesure} kg</Text>
          <View style={styles.textContainer}>
            <Text style={styles.count}>{text}</Text>
          </View>
        </View>
      ) : noteText ? (
        <View style={styles.mediumContainer}>
          <Text style={styles.timeText}>{noteText}</Text>
        </View>
      ) : files?.length > 0 ? (
        <View style={styles.fileContainer}>
          {files?.map((item, i) => {
            return (
              <View key={i} style={styles.iconContainer}>
                <Icons.Files />
              </View>
            );
          })}
        </View>
      ) : cups ? (
        <View style={styles.mediumContainer}>
          <View style={styles.waterContainer}>
            {cups?.map((item, i) => {
              return (
                <View key={i} style={styles.cup}>
                  {renderCup(item)}
                </View>
              );
            })}
          </View>
          <View style={styles.plusContainer}>
            <TouchableOpacity onPress={onPressMinus}>
              <Text style={styles.plus}>{'-'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressPlus}>
              <Text style={styles.plus}>{'+'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : isMarathonCard ? (
        <View style={styles.marathonContainer}>
          <Image source={{uri: coachImageUrl}} style={styles.circleContainer} />
          <View style={styles.marathonText}>
            <Text style={styles.timeText}>{marathonText}</Text>
            <Text style={styles.timeText}>coach {coachName}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.bottomContainer}>
          <View style={styles.progressWithText}>
            <View style={styles.mediumContainer}>
              <Text style={styles.timeText}>
                {kcal}/{sumKcal} {isNutrition ? 'kcal' : 'min'}
              </Text>
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
          </View>
          <View style={styles.rowContainer}>
            {list &&
              list?.map((item: string, index: number) => {
                return (
                  <Image
                    key={index}
                    source={{uri: item}}
                    style={styles.circleContainer}
                  />
                );
              })}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};
export default ProgressCard;
