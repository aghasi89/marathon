import React, {MutableRefObject, useEffect, useState} from 'react';
import {View, ViewStyle} from 'react-native';
import YoutubePlayer, {YoutubeIframeRef} from 'react-native-youtube-iframe';
import {calcHeight} from '../../../assets/dimensions';
import FeedTypeIcons from '../../feedCard/feedTypeIcons/FeedTypeIcons';
import {IFeedTypes} from '../../../types/types';

type Props = {
  videoId?: string;
  containerStyle?: ViewStyle|ViewStyle[];
  autoplay?: boolean;
  smallCard?: boolean;
  onPlayerStateChange?: (curr: string) => void;
  muted?: boolean;
  youtubePlayerRef?: MutableRefObject<YoutubeIframeRef | null>;
  iconsShow?: boolean;
  iconsData?: {
    type?: IFeedTypes;
    liveDuration?: string;
    calories?: number;
    protein?: number;
    fat?: number;
    carbs?: number;
    prepTime?: number;
  };
};

const YoutubeVideoPlayer: React.FC<Props> = ({
  videoId,
  containerStyle,
  autoplay,
  smallCard,
  onPlayerStateChange,
  muted = true,
  youtubePlayerRef,
  iconsData,
  iconsShow,
}) => {
  const [showControls,setShowControls] = useState<boolean>(false)
  const [isPlaying,setIsPlaying] = useState<boolean>()
  useEffect(()=>{
    setIsPlaying(autoplay)
    autoplay&&setShowControls(true)
  },[autoplay])
  const onConainerPress=()=>{
    setShowControls(true)
    setIsPlaying(true)
  }
  return (
    <View style={containerStyle}>
      <YoutubePlayer
        onChangeState={onPlayerStateChange}
        height={smallCard ? calcHeight(130) : 220}
        videoId={videoId}
        play={isPlaying ?? false}
        mute={muted}
        allowWebViewZoom={false}
        ref={youtubePlayerRef}
      />
      {!autoplay && iconsShow &&!showControls&& (
        <FeedTypeIcons
          onPress={onConainerPress}
          type={iconsData?.type}
          prepTime={iconsData?.prepTime}
          calories={iconsData?.calories}
          carbs={iconsData?.carbs}
          fat={iconsData?.fat}
          liveDuration={iconsData?.liveDuration}
          protein={iconsData?.protein}
        />
      )}
    </View>
  );
};
export default YoutubeVideoPlayer;
