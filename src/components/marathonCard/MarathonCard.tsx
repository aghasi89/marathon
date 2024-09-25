/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import styles from './MarathonCard.style';
import Icons from '../../assets/icons/svg/index';
import {ITag} from '../../types/types';

type Props = {
  title: string;
  imageUrl: string;
  userCount?: string;
  price?: string;
  startDate: string;
  endDate?: string;
  time: string;
  listTags: Array<ITag>;
};
const MarathonCard: React.FC<Props> = ({
  title,
  imageUrl,
  userCount,
  price,
  startDate,
  endDate,
  time,
  listTags,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.content}>
          <Text style={[styles.titleText, styles.titleMargin]}>{title}</Text>
          <View style={styles.info}>
            <Icons.Plus height={calcHeight(18)} width={calcHeight(18)} />
            <Text style={styles.titleText1}>{userCount}</Text>
            <Text style={[styles.greyTitleText, styles.marginPrice]}>
              Price
            </Text>
            <Text style={styles.titleText1}>{price}</Text>
          </View>
          <View style={styles.infoTime}>
            <Text style={styles.titleText}>
              {startDate} - {endDate}
            </Text>
            <Text style={[styles.greyTitleText, styles.marginTime]}>
              {time} Days
            </Text>
          </View>
        </View>
        <Image style={styles.image} source={{uri: imageUrl}} />
      </View>
      <View style={styles.bottomSheet}>
        {listTags.map((tag, index) => {
          return index < 5 ? (
            <Text key={index} style={[styles.greyTitleText, styles.marginTag]}>
              {tag.title}
            </Text>
          ) : index === 5 ? (
            <Text key={index} style={[styles.greyTitleText, styles.marginTag]}>
              ...
            </Text>
          ) : null;
        })}
      </View>
    </View>
  );
};
export default MarathonCard;
