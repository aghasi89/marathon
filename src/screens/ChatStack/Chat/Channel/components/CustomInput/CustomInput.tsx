import {useEffect, useState} from 'react';
import {TouchableOpacity, Text, View, Keyboard} from 'react-native';
import {useTranslation} from 'react-i18next';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {
  ImageUploadPreview,
  AutoCompleteInput,
  useMessageInputContext,
  FileUploadPreview,
  useMessagesContext,
  useChannelContext,
  useChatContext,
} from 'stream-chat-react-native';
import Icons from '../../../../../../assets/icons/svg/index';
import {primaryBlue} from '../../../../../../assets/styles/colors.styles';
import CustomAudioPlayer from '../CustomAudioPlayer/CustomAudioPlayer';
import {styles} from './CustomInput.style';

const audioRecorderPlayer = new AudioRecorderPlayer();
interface Props {
  showAiButton?: boolean;
  handlerOpenAiModal?: () => void;
  onPressToOpenWorkouts?: () => void;
  showWorkoutButton?: boolean;
  showRecipeButton?: boolean;
  handlerOpenRecipeModal?: () => void;
}

export const CustomInput = (props: Props) => {
  const {
    showAiButton,
    handlerOpenAiModal,
    onPressToOpenWorkouts,
    showWorkoutButton,
    showRecipeButton,
    handlerOpenRecipeModal,
  } = props;
  const {t} = useTranslation();
  const {client} = useChatContext();
  const {text, sendMessage, imageUploads, fileUploads, toggleAttachmentPicker} =
    useMessageInputContext();
  const {updateMessage} = useMessagesContext();
  const {channel} = useChannelContext();
  const [recordingActive, setRecordingActive] = useState<boolean>(false);
  const [recordSecs, setRecordSecs] = useState<number>(0);
  const [recordTime, setRecordTime] = useState<string>('00:00');
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [showAudioPreview, setIsShowAudioPreview] = useState<boolean>(false);
  const [audioPreviewUri, setAudioPreviewUri] = useState<string>('');
  const isMessageEmpty =
    !text.trim() && !imageUploads.length && !fileUploads.length;

  const sendVoiceMessage = async (uri: string) => {
    const message = {
      created_at: new Date(),
      attachments: [
        {
          asset_url: uri,
          file_size: 200,
          mime_type: 'audio/mp3',
          title: 'test.mp4',
          type: 'voice-message',
          audio_length: recordTime,
        },
      ],
      mentioned_users: [],
      id: `random-id-${new Date().toTimeString()}`,
      status: 'sending',
      type: 'regular',
      user: client.user,
    };
    //@ts-ignore
    updateMessage(message);
    const res = await channel.sendFile(uri, 'test.mp4', 'audio/mp3');
    const {created_at, type, status, user, ...messageWithoutReservedFields} =
      message;
    messageWithoutReservedFields.attachments[0].asset_url = res.file;
    await channel.sendMessage(messageWithoutReservedFields);
  };

  const onStartRecord = async () => {
    setRecordingActive(true);
    await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecordSecs(e.currentPosition);
      //@ts-ignore
      setRecordTime(
        audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)).slice(0, -3),
      );
      return;
    });
  };
  const onStopRecord = async () => {
    setRecordingActive(false);
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);
    setIsShowAudioPreview(true);
    setAudioPreviewUri(result);
  };

  const sendAudioMessage = async () => {
    await sendVoiceMessage(audioPreviewUri);
    setIsShowAudioPreview(false);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View style={styles.flex}>
      <ImageUploadPreview />
      <FileUploadPreview />
      <View style={styles.row}>
        {recordingActive ? (
          <Text>{`${t('recording')}${recordTime}`}</Text>
        ) : showAudioPreview ? (
          <View style={styles.audioPreview}>
            <CustomAudioPlayer
              deleteVoiceMessage={() => {
                setIsShowAudioPreview(false);
              }}
              uri={audioPreviewUri}
            />
          </View>
        ) : (
          <>
            <TouchableOpacity onPress={toggleAttachmentPicker}>
              <Icons.chatAttachFile />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <AutoCompleteInput numberOfLines={5} />
            </View>
          </>
        )}
        {isMessageEmpty && !showAudioPreview ? (
          <>
            {!showAudioPreview && !keyboardStatus && !recordingActive && (
              <TouchableOpacity onPress={onStartRecord}>
                <Icons.newChatVoice {...styles.dumb} fill={primaryBlue} />
              </TouchableOpacity>
            )}
            {recordingActive && (
              <TouchableOpacity onPress={onStopRecord}>
                <Icons.PauseCircle {...styles.dumb} fill={primaryBlue} />
              </TouchableOpacity>
            )}
            {showRecipeButton && !recordingActive && (
              <TouchableOpacity onPress={handlerOpenRecipeModal}>
                <Icons.newChatRecipe {...styles.dumb} />
              </TouchableOpacity>
            )}
            {showWorkoutButton && !recordingActive && (
              <TouchableOpacity onPress={onPressToOpenWorkouts}>
                <Icons.newChatWorkout {...styles.dumb} />
              </TouchableOpacity>
            )}
            {showAiButton && !recordingActive && (
              <TouchableOpacity onPress={handlerOpenAiModal}>
                <Icons.newChatRobot {...styles.dumb} />
              </TouchableOpacity>
            )}
          </>
        ) : (
          <TouchableOpacity
            onPress={showAudioPreview ? sendAudioMessage : sendMessage}>
            <Icons.SendMessage />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
