import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icons from '../../../../../../assets/icons/svg/index';
import { styles } from './FeedAttachement.style';
import moment from 'moment';
moment.locale('en');

export interface IProps {
  title?: string;
  image?: string;
  type?: string;
  date: string;
  feedType?: string;
  feedId?: number;
}
const FeedAttachement = (props: IProps) => {
  const { title, image, type, date, feedType, feedId } = props;
  const navigation = useNavigation();

  if (type !== 'feed') {
    return null;
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        // @ts-ignore
        navigation.navigate('ABOUT_FEED', {
          id: feedId,
          type: 'feed',
        });
      }}>
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
          <Icons.Person {...styles.footerIcon} />
          <Text style={styles.timeTextStyle}>{feedType}</Text>
          <View style={styles.emptyView} />
          <Icons.Calendar {...styles.footerIcon} />
          <Text style={styles.timeTextStyle}>
            {moment(date).format('DD MMM')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeedAttachement;
