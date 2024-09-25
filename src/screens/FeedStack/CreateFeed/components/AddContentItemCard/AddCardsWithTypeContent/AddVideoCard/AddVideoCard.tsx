import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import YoutubeVideoPlayer from '../../../../../../../components/videoPlayers/youtubePlayer/youtubePlayer';
import VideoPlayerComponent from '../../../../../../../components/videoPlayers/videoPlayer/videoPlayer';
import UpploadButton from '../../../../../../../components/uploadbutton/UploadButton';
import Icons from '../../../../../../../assets/icons/svg';
import { PrimeryButton } from '../../../../../../../components/buttons';
import { calcHeight, calcWidth } from '../../../../../../../assets/dimensions';
import { mediaSizeStyle } from '../../../../../../../assets/styles/global.styles';
import { IMediaSize, IUploadImage } from '../../../../../../../types/types';
import AddCardWithoutContent from '../../AddCardWithoutContent/AddCardWithoutContent';
import styles from './AddVideoCard.style';

type Props = {
  videoId?: string;
  value?: string;
  onChange?: (link: string) => void;
  onSubmitEditing?: () => void;
  onCloseIconPress?: () => void;
  onVideoUpload?: (media: IUploadImage[]) => void;
  type: 'video' | 'videoLink';
  closeIconExist?: boolean;
  title?: string;
  inProgress?: boolean;
  size?: IMediaSize;
  videoTumbnail?: string
  progress?: number,
  youtubeButtonValidateText?: string
  youtubeButtonDisabled?: boolean
  hideYotoubeLinkInput?: boolean;
};

const AddVideoCard: React.VFC<Props> = ({
  type,
  videoId,
  value,
  onChange,
  onSubmitEditing,
  onCloseIconPress,
  onVideoUpload,
  closeIconExist = true,
  title,
  inProgress = false,
  size = '16:9',
  videoTumbnail,
  progress,
  youtubeButtonDisabled,
  youtubeButtonValidateText,
  hideYotoubeLinkInput
}) => {
  const { t } = useTranslation();
  return (
    <AddCardWithoutContent
      closeIconExist={closeIconExist && !inProgress}
      onCloseIconPress={onCloseIconPress}
      customStyles={{
        childrenContainer: [
          styles.container,
          { ...mediaSizeStyle({ type: size, paddingSize: calcWidth(32) }) },
          // {paddingHorizontal: !videoId ? calcWidth(20) : 0},
        ],
      }}
      title={title ?? t('video')}>
      {!!!videoId?.length && !inProgress ? (
        <View style={styles.contentContainer}>
          <UpploadButton uploadMediaType="Videos" goBackImage={onVideoUpload}>
            <View style={styles.button}>
              <Icons.Upload {...styles.buttonIcon} />
              <Text style={[styles.buttonText, { marginVertical: calcHeight(8) }]}>{t('browsefile')}</Text>
            </View>
          </UpploadButton>
          {/* <View style={styles.inputContainer}>
            <Icons.YoutubeIcon {...styles.youtubeIcon} />

            <TextInput
              style={styles.input}
              placeholder={t('youtbeLink') ?? ''}
              placeholderTextColor={lightSteelBlue}
              value={value}
              onChangeText={onChange}
              onBlur={onSubmitEditing}
              textAlignVertical="center"
            />
          </View> */}
          {!hideYotoubeLinkInput && (
            <>
              <Text style={styles.title}>{`Copy your link in youtube \n and insert here!`}</Text>
              <View style={styles.inputContainer}>
                <Icons.YoutubeIcon {...styles.youtubeIcon} />
                <PrimeryButton
                  type="outline"
                  onPress={onSubmitEditing}
                  title={t('youtbeLink') ?? ""}
                  shadow={false}
                  style={styles.input}
                  textStyle={styles.buttonText}
                  disable={youtubeButtonDisabled}
                />
              </View>
              <Text style={[styles.title, { marginVertical: calcHeight(10) }]}>{youtubeButtonValidateText}</Text>
            </>
          )}
        </View>
      ) : (
        <View style={styles.uploadedFileContainer}>
          {type === 'videoLink' ? (
            <YoutubeVideoPlayer
              containerStyle={styles.playerContainer}
              videoId={videoId}
            />
          ) : (
            <VideoPlayerComponent
              thumbnail={videoTumbnail}
              videoUrl={videoId}
              inProgress={inProgress}
              progress={progress}
              containerStyle={{
                ...mediaSizeStyle({ type: size, paddingSize: calcWidth(32) }),
              }}
            />
          )}
        </View>
      )}
    </AddCardWithoutContent>
  );
};
export default AddVideoCard;
