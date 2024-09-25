import React, {MutableRefObject, useState} from 'react';
import {View, ViewStyle, Text, Pressable, Image} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import VideoPlayerComponent, {
  IVideoControls,
} from '../../../../../../components/videoPlayers/videoPlayer/videoPlayer';
import YoutubeVideoPlayer from '../../../../../../components/videoPlayers/youtubePlayer/youtubePlayer';
import {
  gardenGlow,
  primaryBlue,
  red,
} from '../../../../../../assets/styles/colors.styles';
import Icons from '../../../../../../assets/icons/svg';
import {mediaSizeStyle} from '../../../../../../assets/styles/global.styles';
import {IFeedMediaItem, IFeedTypes} from '../../../../../../types/types';
import styles from './MediaComponent.style';
import {YoutubeIframeRef} from 'react-native-youtube-iframe';
import {useSelector} from 'react-redux';
import {createFeedStateSelector} from '../../../../../../store/selectors/create-feed-selector';
import {calcWidth} from '../../../../../../assets/dimensions';

type Props = {
  containerStyle?: ViewStyle;
  videoContainerStyle?: ViewStyle | ViewStyle[];
  onImagePress?: (imageUrl?: string) => void;
  type?: IFeedTypes;
  mediaList?: IFeedMediaItem[];
  liveDuration?: string;
  autoplay?: boolean;
  playIconShow?: boolean;
  muted?: boolean;
  calories?: number;
  protein?: number;
  fat?: number;
  carbs?: number;
  prepTime?: number;
  smallCard?: boolean;
  onPlayerStateChange?: (state: string, controls?: string) => void;
  youtubePlayerRef?: MutableRefObject<YoutubeIframeRef | null>;
  playerControls?: (controls: IVideoControls) => void;
  videoTitle?: string;
  iconsShow?: boolean;
};

const MediaComponent: React.VFC<Props> = ({
  containerStyle,
  onImagePress,
  liveDuration,
  type,
  mediaList,
  autoplay,
  playIconShow,
  muted,
  calories,
  carbs,
  fat,
  prepTime,
  protein,
  onPlayerStateChange,
  youtubePlayerRef,
  videoContainerStyle,
  playerControls,
  videoTitle,
  iconsShow = true,
}) => {
  const state = useSelector(createFeedStateSelector);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [hideDots, setHideDots] = useState<boolean>(false);
  const [videoControls, setVidoControls] = useState<IVideoControls>();
  const stylesSize = {
    ...mediaSizeStyle({type: mediaList?.[0]?.size ?? '16:9'}),
  };
  const onIndexChange = (index: number) => {
    setHideDots(false);
    setSelectedIndex(index);
    videoControls?.pause();
  };
  const getPlayerState = (
    status?: 'playing' | 'pause',
    controls?: 'show' | 'hide',
  ) => {
    setHideDots(status === 'playing' || controls === 'show');
  };
  const renderIcon = () => {
    switch (type) {
      case 'article':
        return <Icons.Articles {...styles.iconStyle} />;
      case 'recipe':
        return <Icons.Recipe fill={gardenGlow} {...styles.iconStyle} />;
      case 'package':
        return (
          <Icons.FeedCardPacksIcon fill={primaryBlue} {...styles.iconStyle} />
        );
      case 'live':
        return (
          <View style={styles.liveIconContainer}>
            <Icons.Live fill={red} {...styles.iconStyle} />
            <Text style={styles.liveDurationText}>{liveDuration}</Text>
          </View>
        );
      case 'workout':
        return <Icons.Dumbbells fill={primaryBlue} {...styles.iconStyle} />;
      default:
        return null;
    }
  };
  const renderItem = ({
    item: media,
    index,
  }: {
    item: IFeedMediaItem;
    index: number;
  }): React.JSX.Element => {
    switch (media?.type) {
      case 'image':
        return (
          <Pressable
            onPress={() => onImagePress && onImagePress(media?.url)}
            style={containerStyle}>
            <Image
              style={[
                styles.imageStyle,
                {...mediaSizeStyle({type: media?.size})},
              ]}
              source={{uri: media?.url}}
            />
            {type !== 'live' ? (
              <View style={styles.iconContainer}>{renderIcon()}</View>
            ) : (
              renderIcon()
            )}
          </Pressable>
        );
      case 'video':
        return (
          <VideoPlayerComponent
            autoplay={autoplay && selectedIndex === index}
            videoUrl={media?.url}
            videoControls={controls => {
              playerControls && playerControls(controls);
              setVidoControls(controls);
            }}
            thumbnail={media?.thumbnail}
            containerStyle={
              media?.inProgress
                ? {
                    ...mediaSizeStyle({type: media?.size}),
                    paddingTop: 40,
                    height: 150,
                  }
                : {...mediaSizeStyle({type: media?.size, paddingSize: undefined, isVideo: true})}
            }
            inProgress={media?.inProgress}
            lastStep={true}
            progress={media?.uploadingProgress}
            playIconShow={playIconShow}
            iconsShow={iconsShow}
            iconsData={{
              calories,
              carbs,
              fat,
              liveDuration,
              mediaType: media?.type,
              prepTime,
              protein,
              type,
            }}
            onStateChange={getPlayerState}
            videoTitle={videoTitle}
            uploadingProgress={state.uploadingProgress}
            compressingProgress={state.compressingProgress}
          />
        );
      case 'videoLink':
        return (
          <YoutubeVideoPlayer
            muted={muted}
            youtubePlayerRef={youtubePlayerRef}
            onPlayerStateChange={onPlayerStateChange}
            autoplay={autoplay}
            videoId={media?.url}
            containerStyle={videoContainerStyle}
            iconsData={{
              calories,
              carbs,
              fat,
              liveDuration,
              prepTime,
              protein,
              type,
            }}
            iconsShow={iconsShow}
          />
        );
      default:
        return <></>;
    }
  };
  return (
    <View style={{flex: 1}}>
      {(mediaList || []).length > 1 ? (
        <>
          <Carousel
            width={Number(stylesSize.width)}
            height={Number(stylesSize.height)}
            data={mediaList || []}
            renderItem={renderItem}
            defaultIndex={0}
            onSnapToItem={onIndexChange}
            panGestureHandlerProps={{activeOffsetX: [-15, 15]}}
            loop={(mediaList || []).length > 1}
          />
          {!hideDots && (mediaList || []).length > 1 && (
            <View style={styles.dotsContainer}>
              {[...Array(mediaList?.length)].map((_, index) => (
                <View
                  key={index}
                  style={
                    selectedIndex !== index
                      ? styles.dotItem
                      : styles.dotItemSelected
                  }
                />
              ))}
            </View>
          )}
        </>
      ) : (
        renderItem({item: (mediaList || [])?.[0], index: 0})
      )}
      {!mediaList?.length &&
        (state.compressingProgress || state.uploadingProgress) && (
          <VideoPlayerComponent
            containerStyle={{
              ...mediaSizeStyle({type: '16:9'}),
              paddingTop: 40,
              height: 150,
            }}
            inProgress={true}
            lastStep={true}
            uploadingProgress={state.uploadingProgress}
            compressingProgress={state.compressingProgress}
          />
        )}
    </View>
  );
};
export default MediaComponent;
