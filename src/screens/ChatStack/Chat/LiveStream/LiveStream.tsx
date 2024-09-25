import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AgoraUIKit from 'agora-rn-uikit';
import KeepAwake from 'react-native-keep-awake';
import {ChannelProfileType} from 'react-native-agora';
import Icons from '../../../../assets/icons/svg/index';
import LiveStreamHook from './LiveStream-hook';
import {styles} from './LiveStream.style';
import {calcWidth} from '../../../../assets/dimensions';
import { formFieldGrey, primaryBlue } from '../../../../assets/styles/colors.styles';

type Props = {
  goBack: () => void;
};

const LiveStream: React.FC<Props> = ({goBack}) => {
  const {
    t,
    join,
    connectionData,
    isJoined,
    rtc,
    userRole,
    openToolsTemporary,
    smallVideoCall,
    setSmallVideoCall,
    streamButtons,
  } = LiveStreamHook({goBack});
  return (
    <ScrollView style={smallVideoCall && isJoined ? styles.smallMain : styles.main}>
      {/* {!isJoined && (
        <>
          <TouchableOpacity onPress={goBack} style={styles.goBack}>
            <Icons.ArrowIcon fill={formFieldGrey} />
          </TouchableOpacity>
          <View style={styles.header}>
            {userRole === 1 && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  join(true);
                }}>
                <Text style={styles.textStyle}>{t(`startLive`)}</Text>
              </TouchableOpacity>
            )}
            {userRole === 2 && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  join(false);
                }}>
                <Text style={styles.textStyle}>{t(`join`)}</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )} */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}>
        {isJoined ? (
          <Pressable
            onPress={() => (smallVideoCall ? openToolsTemporary() : null)}
            style={smallVideoCall ? styles.smallVideoView : styles.videoView}>
            <AgoraUIKit
              settings={{
                mode: ChannelProfileType.ChannelProfileLiveBroadcasting,
                role: connectionData.current.role,
              }}
              connectionData={connectionData.current}
              rtcCallbacks={rtc}
              styleProps={{
                localBtnContainer: {
                  display: streamButtons,
                },
                minViewStyles: {
                  maxWidth: smallVideoCall ? calcWidth(70) : calcWidth(80), //40%
                  maxHeight: smallVideoCall ? '93%' : '100%',
                },
              }}
            />
            <TouchableOpacity
              style={[styles.openChat]}
              onPress={() => setSmallVideoCall(!smallVideoCall)}>
              {smallVideoCall ? <Icons.OpenBigCall /> : <Icons.OpenSmallCall />}
            </TouchableOpacity>
          </Pressable>
        ) : (
          <ActivityIndicator size={30} color={primaryBlue}/>
          // <Text style={styles.text}>{t(`startLiveMessage`)}</Text>
        )}
      </ScrollView>
      <KeepAwake />
    </ScrollView>
  );
};

export default LiveStream;
