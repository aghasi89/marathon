import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icons from '../../../../assets/icons/svg';
import { WorkoutLevel } from '../../../../types/enums';
import { IFeedTypes } from '../../../../types/types';
import styles from './FeedCardTrainingInfo.style';

type Props = {
  trainingType?: 'individual' | 'groupe';
  type?: IFeedTypes;
  groupeMembersMaxCount?: number;
  joinMembersCount?: number;
  startDate?: string;
  duration?: string;
  price?: string;
  containerStyle?: ViewStyle;
  workoutLevel?: WorkoutLevel;
  workoutInfo?: string;
  isOwner?: boolean
};
const FeedCardTrainingInfo: React.FC<Props> = ({
  trainingType,
  groupeMembersMaxCount,
  joinMembersCount,
  startDate,
  duration,
  price,
  type,
  containerStyle,
  workoutLevel,
  workoutInfo,
  isOwner
}) => {
  const { t } = useTranslation();
  return (
    <View style={[styles.container, containerStyle]}>
      {type === 'workout' ? (
        <>
          <View style={styles.infoListItem}>
            <Icons.Clock {...styles.iconStyle} />
            <Text style={styles.infoText}>{duration}</Text>
          </View>
          {workoutInfo && (
            <View style={styles.infoListItem}>
              <Icons.Trainer {...styles.iconStyle} />
              <Text style={styles.infoText}>{workoutInfo}</Text>
            </View>
          )}
          <View style={styles.infoListItem}>
            {workoutLevel === WorkoutLevel.Beginner ? (
              <Icons.BegginerLevel {...styles.iconStyle} />
            ) : workoutLevel === WorkoutLevel.Intermediate ? (
              <Icons.IntermediadLevel {...styles.iconStyle} />
            ) : workoutLevel === WorkoutLevel.Advanced ? (
              <Icons.AdvancedLevel {...styles.iconStyle} />
            ) : null}
            <Text style={styles.infoText}>{t(`${workoutLevel ?? ''}`)}</Text>
          </View>
        </>
      ) : (
        <>
          <View style={styles.infoListItem}>
            {trainingType === 'individual' ? <Icons.Person {...styles.iconStyle} /> : <Icons.FeedGroupTraningIcon {...styles.iconStyle} />}
            <Text style={styles.infoText}>{!isOwner&&trainingType === 'individual'? t('individual') : `${joinMembersCount ?? 0
              }/${groupeMembersMaxCount}`}</Text>
          </View>
          <View style={styles.infoListItem}>
            <Icons.FeedCalendarIcon {...styles.iconStyle} />
            <Text style={styles.infoText}>{startDate ?? '-'}</Text>
          </View>
          <View style={styles.infoListItem}>
            {type !== 'live' ? (
              <Icons.Hourglass {...styles.iconStyle} />
            ) : (
              <Icons.Clock {...styles.iconStyle} />
            )}
            <Text style={styles.infoText}>{duration ?? '-'}</Text>
          </View>

          <View style={styles.infoListItem}>
            <Icons.Price {...styles.iconStyle} />
            <Text style={styles.infoText}>{price ?? '-'}</Text>
          </View>
        </>
      )}
    </View>
  );
};
export default FeedCardTrainingInfo;
