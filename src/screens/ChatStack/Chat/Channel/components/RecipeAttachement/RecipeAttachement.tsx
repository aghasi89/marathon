import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Icons from '../../../../../../assets/icons/svg/index';
import {styles} from './RecipeAttachement.style';

export interface IProps {
  title?: string;
  image?: string;
  type?: string;
  feedId?: number;
  duration?: number;
  calories?: number;
}

export const RecipeAttachement = (props: IProps) => {
  const {title, image, type, feedId, duration, calories} = props;
  const navigation = useNavigation();
  const {t} = useTranslation();
  if (type !== 'recipe') {
    return null;
  }
  return (
    <TouchableOpacity
      onPress={() => {
        //@ts-ignore
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
        <Text style={styles.title}>{title}</Text>
        <View style={styles.timeIcons}>
          <Icons.Hourglass {...styles.footerIcon} />
          <Text style={styles.timeTextStyle}>{`${duration} ${t(`min`)}`}</Text>
          <View style={styles.emptyView} />
          <Icons.Fier {...styles.footerIcon} />
          <Text style={styles.timeTextStyle}>{`${calories} ${t(`kcal`)}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
