import React, { MutableRefObject } from 'react';
import { View, ViewStyle } from 'react-native';
import { IVideoControls } from '../videoPlayers/videoPlayer/videoPlayer';
import { IFeedCardData, IFeedTypes } from '../../types/types';
import FeedCardHeader from './header/FeedCardHeader';
import FeedCardFooter from './footer/FeedCardFooter';
import FeedCardContent from './content/FeedCardContent';
import styles from './FeedCard.style';
import { YoutubeIframeRef } from 'react-native-youtube-iframe';

type Props = {
  followButtonPress?: () => void;
  threeDotsIconPress: (id?: number) => void;
  commentIconPress: (id?: number) => void;
  energyIconPress: (actionType: 'press' | 'longPress') => void;
  shareIconPress: (data: IFeedCardData) => void;
  bookmarkIconPress?: () => void;
  onHehashtagPress?: (index: number) => void;
  joinButtonPress: () => void;
  navigateUserPage: (id?: number) => void;
  openChannelButtonPress: () => void;
  openGroupeButtonPress: () => void;
  openChatButtonPress: () => void;
  onCardPress: (id?: number, type?: IFeedTypes) => void;
  onStartWorkoutButtonPress?: (item: IFeedCardData) => void;
  customStyle?: {
    cardContainerStyle?: ViewStyle;
    videoContainerStyle?: ViewStyle;
  };
  data: IFeedCardData;
  buttonLoading?: boolean;
  autoplay?: boolean;
  followButtonShow?: boolean;
  playerControls?: (controls: IVideoControls) => void;
  onPlayerStateChange?: (currentStatus?: 'playing' | 'pause' | string, currentControls?: 'show' | 'hide') => void;
  muted?: boolean;
  youtubePlayerRef?: MutableRefObject<YoutubeIframeRef | null>;
};
const FeedCard: React.FC<Props> = ({
  onCardPress,
  followButtonPress,
  navigateUserPage,
  threeDotsIconPress,
  commentIconPress,
  energyIconPress,
  shareIconPress,
  bookmarkIconPress,
  onHehashtagPress,
  joinButtonPress,
  openChannelButtonPress,
  openGroupeButtonPress,
  openChatButtonPress,
  onStartWorkoutButtonPress,
  playerControls,
  onPlayerStateChange,
  customStyle,
  data,
  buttonLoading,
  autoplay,
  followButtonShow,
  muted,
  youtubePlayerRef,
}) => {
  return (
    <View style={[styles.container, customStyle?.cardContainerStyle]}>
      <FeedCardHeader
        onContainerPress={() => onCardPress(data.id, data.type)}
        followButtonPress={followButtonPress}
        navigateUserPage={() => navigateUserPage(data.creatorId)}
        threeDotsIconPress={() => threeDotsIconPress(data.id)}
        feedDate={data.feedDate}
        userName={data.userName}
        followButtonShow={followButtonShow}
        am_i_follow={data.am_i_follow}
        imageURL={data.userImage}
        creatorId={data.creatorId}
      />
      <FeedCardContent
        onNavigationPress={() => onCardPress(data.id, data.type)}
        muted={muted}
        youtubePlayerRef={youtubePlayerRef}
        playerControls={playerControls}
        onPlayerStateChange={onPlayerStateChange}
        autoplay={autoplay}
        buttonLoading={buttonLoading}
        workoutInfo={data.workoutInfo}
        workoutLevel={data.workoutLevel}
        onStartWorkoutButtonPress={() =>
          onStartWorkoutButtonPress && onStartWorkoutButtonPress(data)
        }
        description={data.description}
        hashtags={data.hashtags}
        onHehashtagPress={index =>
          onHehashtagPress && onHehashtagPress(index)
        }
        duration={data.duration}
        placeCount={data.placeCount}
        trainingType={data.trainingType}
        price={data.price}
        startDate={data.startDate}
        userCount={data.userCount}
        joinButtonPress={joinButtonPress}
        openChannelButtonPress={openChannelButtonPress}
        openChatButtonPress={openChatButtonPress}
        openGroupeButtonPress={openGroupeButtonPress}
        availablePlacesExist={data.availablePlacesExist}
        isJoined={data.isJoined}
        isOwner={data.isOwner}
        type={data.type}
        liveDuration={data.liveDuration}
        calories={data.recipe?.calories}
        carbs={data.recipe?.carbs}
        fat={data.recipe?.fat}
        prepTime={data.recipe?.prepTime}
        protein={data.recipe?.protein}
        videoContainerStyle={customStyle?.videoContainerStyle}
        videoTitle={data.videoTitle}
        mediaList={data.mediaList}
        isExpired={data.isExpired}
      />
      <FeedCardFooter
        onContainerPress={() => onCardPress(data.id, data.type)}
        commentsCount={data.commentsCount}
        isLiked={data.isLiked}
        likesCount={data.likesCount}
        commentIconPress={() => commentIconPress(data?.id)}
        energyIconPress={energyIconPress}
        shareIconPress={() => shareIconPress(data)}
        isBookmarked={data.isBookmarked}
        bookmarkIconPress={bookmarkIconPress ?? undefined}
      />
    </View>
  );
};
export default FeedCard;
