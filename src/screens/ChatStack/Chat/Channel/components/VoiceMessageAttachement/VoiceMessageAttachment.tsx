import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useMessageContext } from 'stream-chat-react-native';
import Icons from '../../../../../../assets/icons/svg';
import { primaryBlue } from '../../../../../../assets/styles/colors.styles';
import { styles } from './VoiceMessageAttachement.style';
import AudioPlayerService from '../../../../../../services/AudioPlayerService';

export const VoiceMessageAttachment = ({
  audio_length,
  asset_url,
  type,
}: any) => {
  const { message } = useMessageContext();
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [paused, setPaused] = useState(true);
  const [currentDurationSec, setCurrentDurationSec] = useState(audio_length);
  const [playTime, setPlayTime] = useState('00:00');
  const time = useRef(0)
  useEffect(() => {
    AudioPlayerService.onPouse(asset_url, () => {
      setPaused(true);
      AudioPlayerService.removePlayBackListener();
    })
  }, []);
  const onStartPlay = async () => {

    setLoadingAudio(true);
    await AudioPlayerService.stopPlayer();
    await AudioPlayerService.startPlayer(asset_url);
    if (time.current) {
      await AudioPlayerService.seekToPlayer(+time.current)
    }
    setLoadingAudio(false);
    AudioPlayerService.addPlayBackListener(e => {
      if (e.currentPosition < 0) {
        return;
      }
      time.current = e.currentPosition;
      setCurrentPositionSec(e.currentPosition);
      setCurrentDurationSec(e.duration);
      setPlayTime(
        AudioPlayerService.mmssss(Math.floor(e.currentPosition)).slice(0, -3),
      );
      if (e.currentPosition === e.duration) {
        time.current = 0;
        onStopPlay();
      }
      return;
    });
    setPaused(false);
  };
  const onPausePlay = async () => {
    setPaused(true);
    await AudioPlayerService.pausePlayer();
  };
  const onStopPlay = async () => {
    setPaused(true);
    AudioPlayerService.stopPlayer();
    AudioPlayerService.removePlayBackListener();
  };
  if (type !== 'voice-message') {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.audioPlayerContainer}>
        {message.status === 'sending' || loadingAudio ? (
          <View style={styles.loadingIndicatorContainer}>
            <ActivityIndicator size="small" color={primaryBlue} />
          </View>
        ) : !paused ? (
          <TouchableOpacity style={styles.iconContainer} onPress={onPausePlay}>
            <Icons.Pause {...styles.icon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.iconContainer} onPress={onStartPlay}>
            <Icons.PlayIcon {...styles.icon} />
          </TouchableOpacity>
        )}
        <View style={styles.progressIndicatorContainer}>
          <View
            style={[
              styles.progressLine,
              {
                width: `${(currentPositionSec / currentDurationSec) * 100}%`,
              },
            ]}
          />
        </View>
        <Text style={styles.progressDetailsText}>{playTime}</Text>
      </View>
    </View>
  );
};
