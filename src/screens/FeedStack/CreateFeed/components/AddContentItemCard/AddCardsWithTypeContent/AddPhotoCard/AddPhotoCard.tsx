import React from 'react';
import {Image, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import UpploadButton from '../../../../../../../components/uploadbutton/UploadButton';
import {IMediaSize, IUploadImage} from '../../../../../../../types/types';
import Icons from '../../../../../../../assets/icons/svg';
import AddCardWithoutContent from '../../AddCardWithoutContent/AddCardWithoutContent';
import styles from './AddPhotoCard.style';
import {mediaSizeStyle} from '../../../../../../../assets/styles/global.styles';

type Props = {
  imageUrl?: string;
  goBackImage?: (image: IUploadImage[], size: IMediaSize) => void;
  onCloseIconPress?: () => void;
  closeIconExist?: boolean;
  title?: string;
  size?: IMediaSize;
};

const AddPhotoCard: React.VFC<Props> = ({
  imageUrl,
  goBackImage,
  onCloseIconPress,
  closeIconExist,
  title,
  size,
}) => {
  const {t} = useTranslation();

  return (
    <AddCardWithoutContent
      onCloseIconPress={onCloseIconPress}
      closeIconExist={closeIconExist}
      customStyles={{childrenContainer: styles.container}}
      title={title ?? t('photo')}>
      {!imageUrl ? (
        <UpploadButton uploadMediaType="Photos" goBackImage={goBackImage}>
          <View style={styles.button}>
            <Icons.Upload {...styles.buttonIcon} />
            <Text style={styles.buttonText}>{t('browsefile')}</Text>
          </View>
        </UpploadButton>
      ) : (
        <Image
          style={[
            styles.image,
            {...mediaSizeStyle({type: size ? size : '1:1'})},
          ]}
          source={{uri: imageUrl}}
        />
      )}
    </AddCardWithoutContent>
  );
};
export default AddPhotoCard;
