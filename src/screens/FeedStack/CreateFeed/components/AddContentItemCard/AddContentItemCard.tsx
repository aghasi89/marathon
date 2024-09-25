import { View, ViewStyle } from 'react-native';
import { IMediaSize, IUploadImage } from '../../../../../types/types';
import AddPhotoCard from './AddCardsWithTypeContent/AddPhotoCard/AddPhotoCard';
import AddTextCard from './AddCardsWithTypeContent/AddTextCard/AddTextCard';
import AddVideoCard from './AddCardsWithTypeContent/AddVideoCard/AddVideoCard';

type Props = {
  type?: 'text' | 'videoLink' | 'image' | 'video';
  inputValue?: string;
  onChangeInputValue?: (text: string) => void;
  imageUrl?: string;
  goBackImage?: (image: IUploadImage[], size: IMediaSize) => void;
  videoLink?: string;
  onChangeVideoLink?: (link: string) => void;
  videoId?: string;
  onVideoLinkSubmit?: () => void;
  onCloseIconPress?: () => void;
  containerStyle?: ViewStyle | ViewStyle[];
  onVideoUpload?: (media: IUploadImage[], size?: IMediaSize) => void;
  closeIconExist?: boolean;
  title?: string;
  inUploadingProcess?: boolean;
  size?: IMediaSize;
  videoTumbnail?: string
  progress?: number,
  youtubeButtonDisabled?: boolean,
  youtubeButtonValidateText?: string
};

const AddContentItemCard: React.VFC<Props> = ({
  type,
  inputValue,
  onChangeInputValue,
  imageUrl,
  videoLink,
  videoId,
  onChangeVideoLink,
  onVideoLinkSubmit,
  goBackImage,
  onCloseIconPress,
  onVideoUpload,
  containerStyle,
  closeIconExist,
  title,
  inUploadingProcess,
  size = '16:9',
  videoTumbnail,
  progress,
  youtubeButtonValidateText,
  youtubeButtonDisabled
}) => {
  const renderItem = () => {
    switch (type) {
      case 'text':
        return (
          <AddTextCard
            closeIconExist={closeIconExist}
            title={title}
            onCloseIconPress={onCloseIconPress}
            value={inputValue}
            onChange={onChangeInputValue}
          />
        );
      case 'image':
        return (
          <AddPhotoCard
            closeIconExist={closeIconExist}
            title={title}
            onCloseIconPress={onCloseIconPress}
            imageUrl={imageUrl}
            goBackImage={goBackImage}
            size={size}
          />
        );
      case 'videoLink':
      case 'video':
        return (
          <AddVideoCard
            inProgress={inUploadingProcess}
            closeIconExist={closeIconExist}
            title={title}
            type={type}
            onVideoUpload={onVideoUpload}
            onCloseIconPress={onCloseIconPress}
            value={videoLink}
            onChange={onChangeVideoLink}
            onSubmitEditing={onVideoLinkSubmit}
            videoId={videoId}
            size={size}
            videoTumbnail={videoTumbnail}
            progress={progress}
            youtubeButtonValidateText={youtubeButtonValidateText}
            youtubeButtonDisabled={youtubeButtonDisabled}
          />
        );
      default:
        return null;
    }
  };
  return <View style={containerStyle}>{renderItem()}</View>;
};

export default AddContentItemCard;
