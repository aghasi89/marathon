import React from 'react';
import {
  View,
  Image,
  Text,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icons from '../../assets/icons/svg/index';
import HashtagsComponent from '../../screens/FeedStack/Feed/AboutFeed/components/Hashtags/Hashtags';
import { mediaSizeStyle } from "../../assets/styles/global.styles";
import { IMediaSize, IUser } from '../../types/types';
import { calcWidth } from '../../assets/dimensions';
import { PrimeryButton } from '../buttons';
import styles from './CoachInfoCard.style';
type Props = {
  data: IUser;
  componentStyles?: {
    containerStyle?: ViewStyle | ViewStyle[];
    headerTextStyle?: TextStyle | TextStyle[];
    follwButtonTextStyle?: TextStyle | TextStyle[];
    statusText?: TextStyle | TextStyle[];
  };
  onPressToFollow?: () => void;
  onPresstoNavigate?: (id: number) => void;
  size?: IMediaSize;
  amIFollowList: boolean;
};
const CoachInfoCard: React.FC<Props> = ({
  data,
  componentStyles,
  onPressToFollow,
  onPresstoNavigate,
  size='1:1',
  amIFollowList
}) => {
  const { t } = useTranslation()
    return (
    <Pressable
      onPress={() => onPresstoNavigate && onPresstoNavigate(data.id)}
      style={[styles.container, componentStyles?.containerStyle]}>

    { data.image? <Image
        resizeMode="cover"
        source={{ uri: data.image ?? '' }}
        style={{...mediaSizeStyle({type: size,paddingSize:calcWidth(32)})}}
      />:<View style = {[styles.altImageContainer,{...mediaSizeStyle({type: size,paddingSize:calcWidth(32)})}]}>
          <Icons.AltProfileImage {...styles.altImage}/>
        </View>}
      <View style={styles.flagsContainer}>
        {data?.language?.map((item,index)=> (
          <Image
            key={index}
            source={{ uri: item?.language?.flag }}
            style={styles.flagIcon}></Image>
        ))}
      </View>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text
            numberOfLines={2}
            style={[styles.headerText, componentStyles?.headerTextStyle]}>{`${data.user?.first_name ?? ''
              } ${data.user?.last_name ?? ''}`}</Text>
        </View>
        <View style={styles.emptyView} />
        <PrimeryButton
          onPress={() => onPressToFollow && onPressToFollow()}
          type="default"
          title={!amIFollowList ? t("follow") ?? '' : t("unfollowing") ?? ''}
          textStyle={componentStyles?.follwButtonTextStyle}
        />
      </View>
      <View style={styles.reatingContainer}>
        <Icons.Star />
        <Text>{data.rating ?? 0}</Text>
        <View style={styles.emptyView} />
        <Icons.Verified />
        <Text style={styles.verifiedText}>{t('verifiedByMarathon')}</Text>
      </View>
      <Text
        style={[styles.statusText, componentStyles?.statusText]}
        numberOfLines={2}>
        {data.status}
      </Text>
      <HashtagsComponent
      // containerStyle={styles.hashtagsContainer}
      // data={data?.hashtags}
      />
    </Pressable>
  );
};
export default CoachInfoCard;
