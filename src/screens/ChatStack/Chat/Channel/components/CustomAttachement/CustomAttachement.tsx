import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Icons from '../../../../../../assets/icons/svg/index';
import {styles} from './CustomAttachement.style';

export interface IProps {
  title?: string;
  image?: string;
  type?: string;
  feedId?: number;
  exercise?: number;
  duration?: number;
}
export const CustomAttachement = ({
  title,
  image,
  type,
  feedId,
  exercise,
  duration,
}: IProps) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  if (type !== 'workout') {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        // @ts-ignore
        navigation.navigate('ABOUT_FEED', {
          id: feedId,
          type: 'feed',
        });
      }}
      style={styles.container}>
      <Image
        resizeMode="cover"
        source={{
          uri: image,
        }}
        style={styles.thumbnail}
      />
      <View style={styles.detailsContainer}>
        <Text numberOfLines={2} style={styles.title}>{title}</Text>
        <View style={styles.timeIcons}>
          <Icons.Hourglass {...styles.footerIcon} />
          <Text style={styles.timeTextStyle}>{`${duration} ${t(`min`)}`}</Text>
          <View style={styles.emptyView} />
          <Icons.Trainer {...styles.footerIcon} />
          <Text style={styles.timeTextStyle}>
            {!!exercise ? `${exercise} ${t('exsercises')}` : t('workout')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
