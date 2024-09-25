import React, {useEffect, useRef, useState} from 'react';
import {Pressable, View, ViewStyle} from 'react-native';
import WebView from 'react-native-webview';
import {useTranslation} from 'react-i18next';
import {calcHeight} from '../../../assets/dimensions';
import {IFeedMediaTypes, IFeedTypes} from '../../../types/types';
import Icons from '../../../assets/icons/svg';
import FeedTypeIcons from '../../feedCard/feedTypeIcons/FeedTypeIcons';
import ProgressBar from '../../progressBar/ProgressBar';
import HtmlContent from './player';
import styles from './videoPlayer.style';

type Props = {
  videoUrl?: string;
  videoTitle?: string;
  thumbnail?: string;
  containerStyle?: ViewStyle | ViewStyle[];
  paddingSize?: number;
  getVideoDuration?: (duration: number) => void;
  onStateChange?: (
    currentStatus?: 'playing' | 'pause',
    currentControls?: 'show' | 'hide',
  ) => void;
  onMuteChange?: (current: 'mute' | 'unmute') => void;
  autoplay?: boolean;
  showControls?: boolean;
  animatedThumbnail?: string;
  cover?: React.ReactNode;
  showCover?: boolean;
  videoControls?: (controls: IVideoControls) => void;
  smallCard?: boolean;
  muted?: boolean;
  iconsShow?: boolean;
  iconsData?: {
    type?: IFeedTypes;
    mediaType?: IFeedMediaTypes;
    liveDuration?: string;
    calories?: number;
    protein?: number;
    fat?: number;
    carbs?: number;
    prepTime?: number;
  };
  inProgress?: boolean;
  progress?: number;
  playIconShow?: boolean;
  compressingProgress?: number;
  uploadingProgress?: number;
  lastStep?: boolean;
};
export interface IVideoControls {
  play: () => void;
  pause: () => void;
}
type messageDateType = {
  nativeEvent: {
    data: string;
  };
};
enum messageTypes {
  duration = 'duration',
  state = 'state',
  mute = 'mute',
  controls = 'controls',
}
const VideoPlayerComponent: React.FC<Props> = ({
  videoUrl,
  videoTitle,
  thumbnail,
  containerStyle,
  paddingSize,
  getVideoDuration,
  showControls,
  autoplay = false,
  animatedThumbnail,
  cover,
  showCover,
  onStateChange,
  videoControls,
  smallCard,
  muted,
  onMuteChange,
  iconsData,
  iconsShow,
  inProgress,
  progress,
  playIconShow = true,
  uploadingProgress,
  compressingProgress,
  lastStep=false
}) => {
  const webviewRef = useRef<WebView>(null);
  const {t} = useTranslation();
  const [controlsShow, setControlsShow] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const onMessage = ({nativeEvent}: messageDateType) => {
    const [type, value] = nativeEvent.data.split(':');
    switch (type) {
      case messageTypes.duration:
        getVideoDuration && getVideoDuration(Math.floor(Number(value)));
        break;
      case messageTypes.state:
        if (value === 'playing') {
          setIsPlaying(true);
          onStateChange && onStateChange(value, controlsShow ? 'show' : 'hide');
        } else if (value === 'pause') {
          onStateChange && onStateChange(value, controlsShow ? 'show' : 'hide');
          setIsPlaying(false);
        }
        break;
      case messageTypes.mute:
        if (value === 'mute' || value === 'unmute')
          onMuteChange && onMuteChange(value);
        break;
      case messageTypes.controls:
        if (value === 'show') {
          onStateChange &&
            onStateChange(isPlaying ? 'playing' : 'pause', 'show');
          setControlsShow(true);
        } else {
          onStateChange &&
            onStateChange(isPlaying ? 'playing' : 'pause', 'hide');
          setControlsShow(false);
        }
        break;
      default:
        break;
    }
  };

  function onPlay() {
    if (webviewRef.current) {
      webviewRef.current.injectJavaScript(`
    (function() {
      mainVideo.play();
    })();
  `);
    }
  }

  function onPause() {
    if (webviewRef.current) {
      webviewRef.current.injectJavaScript(`
    (function() {
      mainVideo.pause();
    })();
  `);
    }
  }
  function onContainerPress() {
    if (webviewRef.current) {
      setControlsShow(true);
      webviewRef.current.injectJavaScript(`
      showControls()
  `);
    }
  }
  function onPlayContainerPress() {
    onContainerPress();
    onPlay();
  }
  useEffect(() => {
    videoControls && videoControls({play: onPlay, pause: onPause});
  }, []);
  return (
    <>
      {!inProgress ? (
        <View
          style={[{height: smallCard ? calcHeight(130) : 230}, containerStyle]}>
          <WebView
            setBuiltInZoomControls={false}
            scalesPageToFit={false}
            ref={webviewRef}
            style={[
              styles.videoSize,
              {height: calcHeight(230)},
              containerStyle,
            ]}
            allowsFullscreenVideo={true}
            onMessage={onMessage}
            source={{
              html: HtmlContent(
                videoUrl,
                autoplay ? animatedThumbnail : thumbnail,
                autoplay,
                showControls,
                muted,
              ),
            }}
            scrollEnabled={false}
            originWhitelist={['*']}
            allowsInlineMediaPlayback={true}
            useWebView2
          />
          {/* {!autoplay && iconsShow && !controlsShow && (
            <FeedTypeIcons
              onPress={onContainerPress}
              type={iconsData?.type}
              prepTime={iconsData?.prepTime}
              calories={iconsData?.calories}
              carbs={iconsData?.carbs}
              fat={iconsData?.fat}
              liveDuration={iconsData?.liveDuration}
              protein={iconsData?.protein}
            />
          )} */}
          {showCover && (
            <View
              style={[
                styles.absolutContainer,
                styles.coverContainerBackground,
              ]}>
              {cover}
            </View>
          )}
          {/* {playIconShow&&!autoplay && !controlsShow && (
            <Pressable
              onPress={onPlayContainerPress}
              style={[styles.absolutContainer,styles.playContainerBackground, containerStyle]}>
              <View style={styles.playIconContainer}>
                <Icons.Play {...styles.playIcon} />
              </View>
            </Pressable>
          )} */}
        </View>
      ) : (
        <View
          style={[
            {height: smallCard ? calcHeight(130) : 230},
            !lastStep && styles.absolutContainer,
            !lastStep && styles.containerInProgress,
            containerStyle,
          ]}>
          <View style={styles.progressContainer}>
            <View style={styles.logo}>
              <Icons.Marathon />
            </View>
            <ProgressBar
              textStyle={styles.progressText}
              // text={`... ${t('uploadingVideo')} ${progress ?? 0}%`}
              text={
                compressingProgress === 100 && uploadingProgress === 100
                  ? `... PROCESING ${progress ?? 0}%`
                  : compressingProgress === 100
                  ? `... UPLOADING ${uploadingProgress ?? 0}%`
                  : `... COMPRESSING ${compressingProgress ?? 0}%`
              }
              progress={
                compressingProgress === 100 && uploadingProgress === 100
                  ? progress ?? 0
                  : compressingProgress === 100
                  ? uploadingProgress ?? 0
                  : compressingProgress ?? 0
              }
              // progress={progress ?? 0}
            />
          </View>
        </View>
      )}
    </>
  );
};
export default VideoPlayerComponent;
