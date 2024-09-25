import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icons from '../../assets/icons/svg/index';
import {styles} from './feedShareItem.style';
import moment from 'moment';
moment.locale('en');

export interface IProps {
  title?: string;
  image?: string;
  type?: string;
  feedId?: number;
  exercise?: number;
  duration?: number;
  disabled: boolean;
  date: string;
}
const FeedShareItem = (props: IProps) => {
  const {title, image, type, disabled, date} = props;
  return (
    <TouchableOpacity disabled={disabled} style={styles.container}>
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
          <Text style={styles.timeTextStyle}>{type}</Text>
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

export default FeedShareItem;
