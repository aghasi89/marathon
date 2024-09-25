import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Icons from '../../../../../../assets/icons/svg/index';
import {primaryBlue} from '../../../../../../assets/styles/colors.styles';
import {styles} from './CustomAudioPlayer.style';

const audioRecorderPlayer = new AudioRecorderPlayer();
interface Props {
  deleteVoiceMessage: () => void;
  uri: string;
}
const CustomAudioPlayer = (props: Props) => {
  const {deleteVoiceMessage, uri} = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    audioRecorderPlayer.setSubscriptionDuration(0.1);
    audioRecorderPlayer.addPlayBackListener(e => {
      setDuration(e.duration);
      setProgress(e.currentPosition);
    });

    return () => {
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
    };
  }, []);
  const handleTogglePlayback = async () => {
    try {
      if (isPlaying) {
        await audioRecorderPlayer.pausePlayer();
      } else {
        if (progress === duration) {
          await audioRecorderPlayer.startPlayer(uri);
          setProgress(0);
        } else {
          await audioRecorderPlayer.seekToPlayer(progress);
          await audioRecorderPlayer.startPlayer();
        }
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.log('Error toggling playback:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleTogglePlayback}>
        {isPlaying ? (
          <Icons.PauseCircle {...styles.icon} fill={primaryBlue} />
        ) : (
          <Icons.PlayIcon {...styles.icon} fill={primaryBlue} />
        )}
      </TouchableOpacity>
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${(progress / duration) * 100}%`,
            },
          ]}
        />
      </View>
      <TouchableOpacity onPress={deleteVoiceMessage}>
        <Icons.DeleteIcon fill={primaryBlue} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomAudioPlayer;
