import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icons from '../../assets/icons/svg/index';
import {primaryBlack} from '../../assets/styles/colors.styles';
import {ITag} from '../../types/types';
import styles from './PhotoProgresCard-style';

export type PhotoProgressCardImages = {
  front?: string;
  back?: string;
  side?: string;
};

type Props = {
  images?: PhotoProgressCardImages | string;
  comments?: Array<ITag>;
  titleText?: string;
  onImagePress?: (selected?: string) => void;
  onCommentsPress?: () => void;
  defaultIconType?:string;
};

export const PhotoProgressCard: React.FC<Props> = ({
  images,
  comments,
  titleText,
  onImagePress,
  onCommentsPress,
  defaultIconType,
}) => {
  return (
    <View>
      <View style={styles.titleGeneralContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{titleText}</Text>
          <View style={styles.titleIconsContainer}>
            {comments && (
              <TouchableOpacity
                style={styles.commentIconAndCount}
                onPress={() => onCommentsPress && onCommentsPress()}>
                <Icons.Comment fill={primaryBlack} {...styles.titleIconStyle} />
                <Text style={styles.titleText}>{comments.length}</Text>
              </TouchableOpacity>
            )}
            <Icons.EllipsisIcon
              fill={primaryBlack}
              {...styles.titleIconStyle}
            />
          </View>
        </View>
      </View>
      {images&&typeof images !== 'string' ? (
        <View style={styles.imagesGeneralContainer}>
          <TouchableOpacity
            onPress={() => onImagePress && onImagePress('front')}
            style={styles.imageContainer}>
            {images?.front ? (
              <Image style={styles.image} source={{uri: images.front}} />
            ) : (
              <Icons.PhotoProgressFront />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onImagePress && onImagePress('back')}
            style={styles.imageContainer}>
            {images?.back ? (
              <Image style={styles.image} source={{uri: images.back}} />
            ) : (
              <Icons.PhotoProgressBack />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onImagePress && onImagePress('side')}
            style={styles.imageContainer}>
            {images?.side ? (
              <Image style={styles.image} source={{uri: images.side}} />
            ) : (
              <Icons.PhotoProgressSide />
            )}
          </TouchableOpacity>
        </View>
      ) : images ? (
        <TouchableOpacity
          style={styles.photoContainer}
          onPress={() => onImagePress && onImagePress()}>
          <Image style={styles.photo} source={{uri: images}} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.photoContainer}
          onPress={() => onImagePress && onImagePress()}>
          {defaultIconType &&
            ((defaultIconType === 'front' && (
              <Icons.PhotoProgressFront {...styles.photoProgressDefaultimage} />
            )) ||
              (defaultIconType === 'back' && (
                <Icons.PhotoProgressBack
                  {...styles.photoProgressDefaultimage}
                />
              )) ||
              (defaultIconType === 'side' && (
                <Icons.PhotoProgressSide
                  {...styles.photoProgressDefaultimage}
                />
              )))}
        </TouchableOpacity>
      )}
    </View>
  );
};
