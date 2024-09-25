import {View, Text, ViewStyle, Image, TextInput, Pressable} from 'react-native';
import {AssetType} from '@react-native-camera-roll/camera-roll';
import Carousel from 'react-native-reanimated-carousel';
import {useTranslation} from 'react-i18next';
import YoutubeVideoPlayer from '../../../../../components/videoPlayers/youtubePlayer/youtubePlayer';
import VideoPlayerComponent from '../../../../../components/videoPlayers/videoPlayer/videoPlayer';
import UpploadButton from '../../../../../components/uploadbutton/UploadButton';
import {lightSteelBlue} from '../../../../../assets/styles/colors.styles';
import Icons from '../../../../../assets/icons/svg';
import {mediaSizeStyle} from '../../../../../assets/styles/global.styles';
import {calcHeight, calcWidth} from '../../../../../assets/dimensions';
import {
  IFeedMediaItem,
  IMediaSize,
  IUploadImage,
} from '../../../../../types/types';
import styles from './CoverComponent.style';
import {PrimeryButton} from '../../../../../components/buttons';
import {useSelector} from 'react-redux';
import {createFeedStateSelector} from '../../../../../store/selectors/create-feed-selector';

type Props = {
  media?: IFeedMediaItem[];
  goBackImage: (image: IUploadImage[], imageSelectedSize: IMediaSize) => void;
  containerStyle?: ViewStyle | ViewStyle[];
  onSubmitEditing: () => void;
  onCloseIconPress: (index: number) => void;
  isInvalid?: boolean;
  uploadMediaType?: AssetType;
  hideYotoubeLinkInput?: boolean;
  maxDuration?: number;
  getVideoDuration?: (duration: number) => void;
  uploadButtonText?: string;
  imageSizeType?: Array<IMediaSize | undefined>;
  multiSelect?: boolean;
  maxMediaCount?: number;
  youtubeButtonValidateText?: string;
  youtubeButtonDisabled?: boolean;
  // uploadingProgress?: number;
  // compressingProgress?: number;
};
const CoverComponent: React.VFC<Props> = ({
  goBackImage,
  onSubmitEditing,
  containerStyle,
  onCloseIconPress,
  isInvalid,
  uploadMediaType,
  hideYotoubeLinkInput,
  maxDuration,
  getVideoDuration,
  uploadButtonText,
  imageSizeType,
  multiSelect,
  media,
  maxMediaCount,
  youtubeButtonDisabled,
  youtubeButtonValidateText,
  // uploadingProgress,
  // compressingProgress,
}) => {
  const {t} = useTranslation();
  const state = useSelector(createFeedStateSelector);
  const mediaComponent = (item?: IFeedMediaItem) => {
    switch (item?.type) {
      case 'image':
        return <Image style={styles.image} source={{uri: item.url}} />;
      case 'video':
        return (
          <VideoPlayerComponent
            getVideoDuration={getVideoDuration}
            videoUrl={item.url}
            thumbnail={item.thumbnail}
            containerStyle={[
              {
                ...mediaSizeStyle({
                  type: item.size,
                  paddingSize: calcWidth(32),
                }),
                borderRadius: calcWidth(16),
              },
            ]}
            progress={item.uploadingProgress}
            inProgress={item.inProgress}
            uploadingProgress={state.uploadingProgress}
            compressingProgress={state.compressingProgress}
          />
        );

      case 'videoLink':
        return (
          <YoutubeVideoPlayer
            containerStyle={styles.playerContainer}
            videoId={item.url}
          />
        );

      default:
        return (
          <View
            style={[
              styles.listUploadButtonContainer,
              {
                ...mediaSizeStyle({
                  type: item?.size,
                  paddingSize: calcWidth(32),
                }),
              },
            ]}>
            <UpploadButton
              maxDuration={maxDuration}
              imageSizeType={imageSizeType}
              uploadMediaType={uploadMediaType}
              multiSelect={multiSelect}
              maxMediaCount={maxMediaCount}
              goBackImage={goBackImage}>
              <View style={styles.listPlusIconContainer}>
                <Icons.Plus {...styles.plusIcon} />
              </View>
            </UpploadButton>
          </View>
        );
    }
  };
  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.contentContainer,
          !isInvalid ? styles.borderColor : styles.borderColorInvalid,
        ]}>
        {!media?.length ? (
          state.compressingProgress===undefined && state.uploadingProgress===undefined &&
          <>
            <Text style={[styles.title, {marginTop: calcHeight(30)}]}>
              {t('setCover')}
            </Text>
            <View>
              <UpploadButton
                maxDuration={maxDuration}
                imageSizeType={imageSizeType}
                uploadMediaType={uploadMediaType}
                multiSelect={multiSelect}
                maxMediaCount={maxMediaCount}
                goBackImage={goBackImage}>
                <View style={styles.button}>
                  <Icons.Upload {...styles.buttonIcon} />
                  <Text
                    style={[
                      styles.buttonText,
                      {marginVertical: calcHeight(8)},
                    ]}>
                    {uploadButtonText ?? t('browsefile')}
                  </Text>
                </View>
              </UpploadButton>
              {!hideYotoubeLinkInput && (
                <>
                  <Text
                    style={
                      styles.title
                    }>{`Copy your link in youtube \n and insert here!`}</Text>
                  <View style={styles.inputContainer}>
                    <Icons.YoutubeIcon {...styles.youtubeIcon} />
                    <PrimeryButton
                      type="outline"
                      onPress={onSubmitEditing}
                      title={t('youtbeLink') ?? ''}
                      shadow={false}
                      style={styles.input}
                      textStyle={styles.buttonText}
                      disable={youtubeButtonDisabled}
                    />
                  </View>
                  <Text
                    style={[styles.title, {marginVertical: calcHeight(10)}]}>
                    {youtubeButtonValidateText}
                  </Text>
                </>
              )}
            </View>
          </>
        ) : (
          <>
            {multiSelect && media[0].type !== 'videoLink' ? (
              <Carousel
                width={Number(
                  mediaSizeStyle({
                    type: media[0].size,
                    paddingSize: calcWidth(32),
                  }).width,
                )}
                height={Number(
                  mediaSizeStyle({
                    type: media[0].size,
                    paddingSize: calcWidth(32),
                  }).height,
                )}
                loop={false}
                vertical={false}
                mode="parallax"
                data={media || []}
                renderItem={({item, index}) => (
                  <View
                    key={(item.type || '') + index}
                    style={[
                      styles.uploadedFileContainer,
                      {
                        ...mediaSizeStyle({
                          type: item.size,
                          paddingSize: calcWidth(32),
                        }),
                      },
                    ]}>
                    {!item.inProgress && (
                      <Pressable
                        onPress={() => onCloseIconPress(index)}
                        style={styles.closeIconTouch}>
                        <Icons.Close {...styles.closeIcon} />
                      </Pressable>
                    )}
                    {mediaComponent(item)}
                  </View>
                )}
              />
            ) : (
              <View
                style={mediaSizeStyle({
                  type: media[0].size,
                  paddingSize: calcWidth(32),
                })}>
                {!media[0].inProgress && (
                  <Pressable
                    onPress={() => onCloseIconPress(0)}
                    style={styles.closeIconTouch}>
                    <Icons.Close {...styles.closeIcon} />
                  </Pressable>
                )}
                {mediaComponent(media[0])}
              </View>
            )}
          </>
        )}
        {!media?.length &&
          (state.compressingProgress || state.uploadingProgress) && (
            <View
              style={mediaSizeStyle({
                type: '16:9',
                paddingSize: calcWidth(32),
              })}>
              <VideoPlayerComponent
                getVideoDuration={getVideoDuration}
                // videoUrl={item.url}
                // thumbnail={item.thumbnail}
                containerStyle={[
                  {
                    ...mediaSizeStyle({
                      type: '16:9',
                      paddingSize: calcWidth(32),
                    }),
                    borderRadius: calcWidth(16),
                  },
                ]}
                // progress={item.uploadingProgress}
                inProgress={true}
                uploadingProgress={state.uploadingProgress}
                compressingProgress={state.compressingProgress}
              />
            </View>
          )}
      </View>
    </View>
  );
};

export default CoverComponent;
