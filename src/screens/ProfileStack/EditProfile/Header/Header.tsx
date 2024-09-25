import React from 'react';
import { Image, View } from 'react-native';
import Icons from '../../../../assets/icons/svg'
import { IUploadImage } from '../../../../types/types';
import UpploadButton from '../../../../components/uploadbutton/UploadButton';
import styles from './Header.style';

interface IProps {
  getImage?: (image: IUploadImage[], type: string) => void;
  imageUrl?: string;
  backgroundImageUrl?: string;
  required?: boolean
}

const Header: React.FC<IProps> = props => {
  const { getImage, imageUrl, backgroundImageUrl, required } = props;

  return (
    <View style={{ zIndex: 0 }}>
      <View>
        {backgroundImageUrl ? <Image
          source={{
            uri: backgroundImageUrl
          }}
          style={styles.backgroundImage}
          resizeMode="cover"
        /> : <View style={[styles.backgroundImage, styles.altBackgroundImageContainer]}>
          <Icons.Image  {...styles.altBackgroundImage} />
        </View>}
        <View style={styles.editBackgroundImage}>
          <UpploadButton
            imageSizeType={['16:9']}
            showCropperSizeConfig={false}
            goBackImage={(image: IUploadImage[]) => {
              getImage && getImage(image, 'background');
            }}
            uploadMediaType="Photos"
          />
        </View>
      </View>
      <View style={[styles.profileImageContainer, required && { borderColor: 'red', borderWidth: 1 }]}>
        {imageUrl ? <Image
          source={{
            uri: imageUrl
          }}
          style={styles.image}
          resizeMode="cover"
        /> : (
          <View style={[styles.image, styles.altImageContainer]}>
            <Icons.AltProfileImage />
          </View>
        )}
        <View style={styles.editProfileImage}>
          <UpploadButton
            uploadMediaType="Photos"
            imageSizeType={['1:1']}
            showCropperSizeConfig={false}
            goBackImage={(image: IUploadImage[]) => {
              getImage && getImage(image, 'image');
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default Header;
