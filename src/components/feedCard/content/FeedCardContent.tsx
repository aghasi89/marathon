import React, { MutableRefObject } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { YoutubeIframeRef } from 'react-native-youtube-iframe';
import MediaComponent from '../../../screens/FeedStack/Feed/AboutFeed/components/MediaComponent/MediaComponent';
import {
  IVideoControls,
} from '../../videoPlayers/videoPlayer/videoPlayer';
import { WorkoutLevel } from '../../../types/enums';
import {
  IFeedMultiItem,
  IFeedTypes,
} from '../../../types/types';
import FeedCardContentButtonsGroup from './buttonsGroup/FeedCardContentButtonsGroup';
import FeedCardContentText from './contentText/FeedCardContentText';
import FeedCardTrainingInfo from './trainingInfo/FeedCardTrainingInfo';
import styles from './FeedCardContent.style';

type Props = {
  description?: string;
  hashtags?: IFeedMultiItem[];
  onHehashtagPress?: (index: number) => void;
  trainingType?: 'individual' | 'groupe';
  userCount?: number;
  placeCount?: number;
  startDate?: string;
  duration?: string;
  price?: string;
  isJoined?: boolean;
  joinButtonPress: () => void;
  openChannelButtonPress: () => void;
  isOwner?: boolean;
  availablePlacesExist?: boolean;
  openGroupeButtonPress: () => void;
  openChatButtonPress: () => void;
  type: IFeedTypes;
  liveDuration?: string;
  calories?: number;
  protein?: number;
  fat?: number;
  carbs?: number;
  prepTime?: number;
  videoTitle?: string;
  videoContainerStyle?: ViewStyle;
  onStartWorkoutButtonPress?: () => void;
  workoutLevel?: WorkoutLevel;
  workoutInfo?: string;
  buttonLoading?: boolean;
  autoplay?: boolean;
  playerControls?: (controls: IVideoControls) => void;
  onPlayerStateChange?: (currentStatus?: 'playing' | 'pause' | string, currentControls?: 'show' | 'hide') => void;
  muted?: boolean;
  youtubePlayerRef?: MutableRefObject<YoutubeIframeRef | null>;
  onNavigationPress?: () => void;
  mediaList?: IFeedMultiItem[];
  isExpired?: boolean
};
const FeedCardContent: React.FC<Props> = ({
  description,
  hashtags,
  onHehashtagPress,
  trainingType,
  placeCount,
  userCount,
  startDate,
  duration,
  price,
  isJoined,
  joinButtonPress,
  openChannelButtonPress,
  isOwner,
  availablePlacesExist,
  openGroupeButtonPress,
  openChatButtonPress,
  type,
  liveDuration,
  calories,
  protein,
  fat,
  carbs,
  prepTime,
  videoTitle,
  videoContainerStyle,
  onStartWorkoutButtonPress,
  workoutLevel,
  workoutInfo,
  buttonLoading,
  autoplay,
  onPlayerStateChange,
  playerControls,
  muted,
  youtubePlayerRef,
  onNavigationPress,
  mediaList,
  isExpired
}) => {
  return (
    <View style={styles.container}>
      {(description || hashtags) && (
        <FeedCardContentText
          onPress={onNavigationPress}
          numberOfLines={2}
          description={description}
          hashtags={hashtags}
          onHehashtagPress={index =>
            onHehashtagPress && onHehashtagPress(index)
          }
        />
      )}
      {<MediaComponent
        onPlayerStateChange={onPlayerStateChange}
        videoTitle={videoTitle}
        autoplay={autoplay}
        mediaList={mediaList}
        calories={calories}
        carbs={carbs}
        fat={fat}
        protein={protein}
        prepTime={prepTime}
        muted={muted}
        videoContainerStyle={videoContainerStyle}
        youtubePlayerRef={youtubePlayerRef}
        liveDuration={liveDuration}
        type={type}
        playerControls={playerControls}
      />}
      {(type === 'workout' || type === 'package' || type === 'live') && (
        <Pressable onPress={onNavigationPress}>
          <FeedCardTrainingInfo
            workoutLevel={workoutLevel}
            workoutInfo={workoutInfo}
            type={type}
            trainingType={trainingType}
            duration={duration}
            price={price}
            isOwner={isOwner ?? false}
            startDate={startDate}
            groupeMembersMaxCount={placeCount}
            joinMembersCount={userCount}
            containerStyle={styles.traningInfoContainer}
          />
          <FeedCardContentButtonsGroup
            isLoading={buttonLoading}
            isWorkout={type === 'workout'}
            onStartWorkoutButtonPress={onStartWorkoutButtonPress}
            isJoined={isJoined ?? false}
            isOwner={isOwner ?? false}
            availablePlacesExist={availablePlacesExist ?? false}
            joinButtonPress={joinButtonPress}
            openChannelButtonPress={openChannelButtonPress}
            openChatButtonPress={openChatButtonPress}
            openGroupeButtonPress={openGroupeButtonPress}
            containerStyle={styles.buttonsGroupContainer}
            isExpired={isExpired}
          />
        </Pressable>
      )}
    </View>
  );
};
export default FeedCardContent;
