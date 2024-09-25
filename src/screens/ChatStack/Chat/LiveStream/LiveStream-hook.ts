import { useCallback, useEffect, useRef, useState, } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ClientRoleType, IRtcEngine } from 'react-native-agora';
import { useChatContext, } from 'stream-chat-react-native';
import { NavigationParamList } from '../../../../navigation/ChatNavigation';
import { profileSelector } from '../../../../store/selectors/profile-selector';
import sendCustomAttachement from '../../../../utils/sendCustomAttachement';
import { useAppContext } from '../../AppContext';

type Props = NativeStackScreenProps<NavigationParamList, "CHANNELLIST">;
type IProps = {
  goBack: () => void
}

export default ({goBack}: IProps) => {
    const appId = '5854562062f1453a8f5f083639a3f6a1';
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { channel } = useAppContext();
    const { client } = useChatContext()
    const navigation = useNavigation<Props['navigation']>();
    const agoraEngineRef = useRef<IRtcEngine>();
    const user = useSelector(profileSelector)
    const [isJoined, setIsJoined] = useState(false);
    const [userRole, setIsUserRole] = useState(ClientRoleType.ClientRoleBroadcaster)
    const [isVideoCall, setIsVideoCall] = useState<boolean>(false)
    const [smallVideoCall, setSmallVideoCall] = useState<boolean>(false);
    const [streamButtons, setStreamButtons] = useState<'flex' | 'none'>('flex');
    const setTimerRef = useRef<any>();

    useEffect(() => {
      if (smallVideoCall) {
        setStreamButtons('none');
      } else {
        if (setTimerRef.current) {
          clearTimeout(setTimerRef.current);
          setTimerRef.current = null;
        };
        setStreamButtons('flex');
      }
    }, [smallVideoCall]);

    useEffect(() => {
       const timer = setTimeout(() => {
            if(!isJoined) {
                if(userRole === 1) {
                  join(true)
                } else {
                  join(false)
                }
              } 
        }, 2000);

        return () => clearTimeout(timer)
    },[userRole,isJoined])

    useEffect(() => {
        setIsVideoCall(!channel?.data?.isVideoCall)
    }, [channel])

    useEffect(() => {
        const handleStreamEvent = (event: any) => {
            if (event.type === 'channel.updated') {
                setIsVideoCall(!channel?.data?.isVideoCall);
            }
        };
        channel && channel?.on(handleStreamEvent);
        return () => {
            channel && channel?.off(handleStreamEvent);
        };
    }, [channel, isVideoCall]);

    const getPermission = async () => {
        if (Platform.OS === 'android') {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                PermissionsAndroid.PERMISSIONS.CAMERA,
            ]);
        }
    };
    useEffect(() => {
        getPermission()
    }, []);
    useEffect(() => {
        //@ts-ignore
        if (channel?.data?.created_by?.id === (user?.get_stream_id)?.toString()) {
            setIsUserRole(ClientRoleType.ClientRoleBroadcaster)
        } else {
            setIsUserRole(ClientRoleType.ClientRoleAudience)
        }
    }, [channel?.data])

    const openToolsTemporary = useCallback(() => {
      if(streamButtons === "none") {
          setStreamButtons('flex');
      }else {
          setStreamButtons('none');
      }
      
      if (setTimerRef.current) {
        clearTimeout(setTimerRef.current);
        setTimerRef.current = null;
      }
      setTimerRef.current = setTimeout(() => {
        setStreamButtons('none');
      }, 5000);
    }, [setTimerRef,streamButtons]);

    const sendStreamEvent = async (channel: any, isStreamActive: boolean) => {
        try {
            await channel.sendEvent({
                type: 'stream-status',
                isStreamActive,
            });
        } catch (error) {
            console.log('Error sending stream event:', error);
        }
    };

    const sendLivestreamAttachement = async (callText: string, liveStatus: string,) => {
        const livestremProps = {
            callText: callText,
            liveStatus: liveStatus,
        };
        await sendCustomAttachement(livestremProps, "livestream", channel, client)
    };
    const connectionData = useRef({
        appId: appId,
        channel: '',
        rtcUid: 0,
        rtcToken: '',
        role: ClientRoleType.ClientRoleBroadcaster,
    });

    const callbacks = {
        EndCall: () => leave(),
    };

    const rtc = {
        JoinChannelSuccess: (connectionData: any) => {
            console.log(connectionData, "connection data")
        },
        ...callbacks
    };
    const leave = async () => {
        try {
            agoraEngineRef.current?.leaveChannel();
            setIsJoined(false);
            goBack();
            // navigation.goBack()
            await sendStreamEvent(channel, false);
            if (userRole === ClientRoleType.ClientRoleBroadcaster) {
                await sendStreamEvent(channel, true);
                channel?.updatePartial({
                    set: {
                        isLive: false
                    }
                })
                await sendLivestreamAttachement(t(`liveEnding`), "isEnded")
            }

        } catch (e) {
            console.log(e, "error");
        }
    };
    const join = async (publisher: boolean) => {
        if (isJoined) {
            return;
        }
        try {
            const response = await channel?.createCall({
                id: channel.cid,
                type: 'video',
            });
            {
                !isVideoCall ? connectionData.current.role = ClientRoleType.ClientRoleBroadcaster :
                    connectionData.current.role = publisher
                        ? ClientRoleType.ClientRoleBroadcaster
                        : ClientRoleType.ClientRoleAudience;
            }
            connectionData.current.rtcUid = response?.agora_uid ?? 0;
            connectionData.current.rtcToken = response?.token ?? '';
            connectionData.current.channel = response?.call.agora?.channel ?? '';
            setIsJoined(true);
            if (publisher) {
                await sendStreamEvent(channel, true);
                channel?.updatePartial({
                    set: {
                        isLive: true
                    }
                })
                await sendLivestreamAttachement(t(`liveStarting`), "isStarted")
            }
        } catch (e) {
            console.log(e, "error");
        }
    };


    const handlerGoBack = useCallback(() => {
        navigation.goBack()
    }, [navigation])

    return {
        t,
        dispatch,
        join,
        leave,
        handlerGoBack,
        callbacks,
        isJoined,
        rtc,
        connectionData,
        userRole,
        openToolsTemporary,
        smallVideoCall,
        setSmallVideoCall,
        streamButtons
    };
};