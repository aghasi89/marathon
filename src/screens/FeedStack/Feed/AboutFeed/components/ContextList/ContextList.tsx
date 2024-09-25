import React from 'react';
import {View, ViewStyle, Image} from 'react-native';
import {RichEditor} from 'react-native-pell-rich-editor';
import VideoPlayerComponent from '../../../../../../components/videoPlayers/videoPlayer/videoPlayer';
import YoutubeVideoPlayer from '../../../../../../components/videoPlayers/youtubePlayer/youtubePlayer';
import {mediaSizeStyle} from '../../../../../../assets/styles/global.styles';
import {IFeedMediaItem} from '../../../../../../types/types';
import styles from './ContextList.style';

type Props = {
  containerStyle?: ViewStyle;
  context?: IFeedMediaItem[];
};

const ContextList: React.VFC<Props> = ({containerStyle, context}) => {
  const _renderItem = (contextItem?: IFeedMediaItem, index?: number) => {
    switch (contextItem?.type) {
      case 'image':
        return (
          <View key={index} style={styles.rowContainer}>
            <Image
              style={[
                styles.imageStyle,
                {...mediaSizeStyle({type: contextItem.size ?? '16:9'})},
              ]}
              source={{uri: contextItem?.value}}
            />
          </View>
        );
      case 'text':
        return (
          <View key={index} style={[styles.rowContainer]}>
            <RichEditor
              initialContentHTML={contextItem.value}
              androidHardwareAccelerationDisabled={true}
              disabled
            />
          </View>
        );
      case 'video':
        return (
          <View
            key={index}
            style={[
              styles.rowContainer,
              {...mediaSizeStyle({type: contextItem.size ?? '16:9'})},
            ]}>
            <VideoPlayerComponent
              key={index}
              videoUrl={contextItem?.value}
              thumbnail={contextItem?.thumbnail}
              containerStyle={{
                ...mediaSizeStyle({type: contextItem.size ?? '16:9'}),
              }}
              inProgress={contextItem.inProgress}
              progress={contextItem.uploadingProgress}
            />
          </View>
        );
      case 'videoLink':
        return (
          <View
            key={index}
            style={[
              styles.rowContainer,
              {...mediaSizeStyle({type: contextItem.size ?? '16:9'})},
            ]}>
            <YoutubeVideoPlayer videoId={contextItem?.value} />
          </View>
        );
      default:
        return null;
    }
  };

  return <View style={containerStyle}>{context?.map(_renderItem)}</View>;
};
export default ContextList;
