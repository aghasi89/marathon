import React from 'react';
import { ActivityIndicator, View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { primaryWhite } from '../../../../assets/styles/colors.styles';
import Icons from '../../../../assets/icons/svg';
import { PrimeryButton } from '../../../buttons';
import styles from './FeedCardContentButtonsGroup.style';

type Props = {
  isJoined?: boolean;
  joinButtonPress: () => void;
  openChannelButtonPress: () => void;
  isOwner?: boolean;
  availablePlacesExist?: boolean;
  openGroupeButtonPress: () => void;
  openChatButtonPress: () => void;
  containerStyle?: ViewStyle;
  isWorkout?: boolean;
  onStartWorkoutButtonPress?: () => void
  isLoading?: boolean;
  isExpired?: boolean
};
const FeedCardContentButtonsGroup: React.FC<Props> = ({
  isJoined,
  joinButtonPress,
  openChannelButtonPress,
  isOwner,
  availablePlacesExist,
  openGroupeButtonPress,
  openChatButtonPress,
  containerStyle,
  isWorkout,
  onStartWorkoutButtonPress,
  isLoading,
  isExpired
}) => {
  const { t } = useTranslation();

  return (
    <View style={[styles.container, containerStyle]}>
      {isWorkout ? (
        <PrimeryButton
          shadow={false}
          type="default"
          onPress={() => onStartWorkoutButtonPress && onStartWorkoutButtonPress()}
          title={t('startWorkout') ?? ''}
          style={styles.defaultButton}
          textStyle={styles.defaultButtonText}
        />
      ) : (
        <>
          {(availablePlacesExist || isJoined || isOwner) && !isExpired ? (
            <PrimeryButton
              shadow={false}
              type="default"
              onPress={() =>
                !isJoined && !isOwner
                  ? joinButtonPress()
                  : openChannelButtonPress()
              }
              title={
                !isLoading ? !isJoined && !isOwner ? t('join') ?? '' : t('openChannel') ?? '' : undefined
              }
              style={[styles.defaultButton, !isJoined ? styles.buttonMargin : {}]}
              textStyle={styles.defaultButtonText}
              Icon={isLoading && <ActivityIndicator size={'small'} color={primaryWhite} />}
            />
          ) : (
            <PrimeryButton
              type="outline"
              onPress={() => { }}
              disable={true}
              title={t('subscriptionFinished') ?? ''}
              style={styles.outlineButton}
              textStyle={styles.outlineButtonText}
            />
          )}
          {!isJoined && <PrimeryButton
            type="outline"
            Icon={
              isOwner ? (
                <Icons.FeedGroupTraningIcon {...styles.iconStyle} />
              ) : (
                <Icons.ChatIcon {...styles.iconStyle} />
              )
            }
            onPress={() =>
              isOwner ? openGroupeButtonPress() : openChatButtonPress()
            }
            style={styles.smallButton}
          />}
        </>
      )}
    </View>
  );
};
export default FeedCardContentButtonsGroup;
