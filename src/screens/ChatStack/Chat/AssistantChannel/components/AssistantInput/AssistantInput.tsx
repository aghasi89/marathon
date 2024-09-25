import {Dispatch, SetStateAction, useState} from 'react';
import {
  Platform,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  Pressable,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import Icons from '../../../../../../assets/icons/svg/index';
import {styles} from './AssistantInput.style';
import UpploadButton from '../../../../../../components/uploadbutton/UploadButton';
import {IUploadImage} from '../../../../../../types/types';
import {calcHeight} from '../../../../../../assets/dimensions';
interface Props {
  onChange: (text: string) => void;
  value: string;
  onPressSendMessage: (
    regeneratedQuestion?: string,
    setMessageImage?: Dispatch<SetStateAction<string>>,
  ) => void;
  disabled?: boolean;
  handleSetImage: (value: IUploadImage[]) => void;
  bunnyImage: string;
  setBunnyImage: Dispatch<SetStateAction<string>>;
  messagesLength: number;
}

export const AssistantInput = (props: Props) => {
  const {
    onChange,
    value,
    onPressSendMessage,
    disabled,
    handleSetImage,
    bunnyImage,
    setBunnyImage,
    messagesLength,
  } = props;
  const [height, setHeight] = useState(0);
  const [messageImage, setMessageImage] = useState<string>('');
  const {t} = useTranslation();

  return (
    <View
      style={[
        styles.container,
        {paddingTop: messageImage ? 0 : calcHeight(16)},
      ]}>
      {/* <TouchableOpacity onPress={() => {}}>
        <Icons.chatAttachFile />
      </TouchableOpacity> */}
      {messageImage && (
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: messageImage,
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <Pressable
            style={styles.deleteImage}
            onPress={() => {
              setMessageImage(''), setBunnyImage('');
            }}>
            <Icons.Close fill={'white'} />
          </Pressable>
        </View>
      )}
      <View style={styles.toolsContainer}>
        {messagesLength > 0 && (
          <UpploadButton
            imageSizeType={['16:9']}
            showCropperSizeConfig={false}
            goBackImage={(value: IUploadImage[]) => {
              handleSetImage(value);
              setMessageImage(value[0].path);
              // handleSetFiles(image);
              // closeDocumentModal(false);
            }}
            uploadMediaType="Photos">
            <Icons.chatAttachFile />
          </UpploadButton>
        )}
        <View style={styles.inputView}>
          <View style={styles.inputContainer}>
            <TextInput
              editable={disabled ? false : true}
              style={{
                maxHeight: Platform.OS === 'ios' ? 20 * 6 : undefined,
                height:
                  Platform.OS === 'android' ? Math.min(height, 140) : undefined,
              }}
              placeholder={t('typeMessage') ?? ''}
              multiline
              value={value}
              numberOfLines={Platform.OS === 'ios' ? undefined : 6}
              onChangeText={onChange}
              onContentSizeChange={event => {
                setHeight(event.nativeEvent.contentSize.height);
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => onPressSendMessage(undefined, setMessageImage)}
          disabled={value || bunnyImage ? false : true}>
          <Icons.SendMessage opacity={value || bunnyImage ? '1' : '0.5'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
