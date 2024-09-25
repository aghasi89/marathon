import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import Icons from '../../assets/icons/svg/index';
import {downloadMediaFromBunny} from '../../utils/bunny.net';
import {IUser} from '../../types/types';
import {PrimeryButton} from '../buttons';
import styles from './CoachInfo.style';

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
};
const CoachInfo: React.FC<Props> = ({
  data,
  componentStyles,
  onPressToFollow,
  onPresstoNavigate,
}) => {
  const {t} = useTranslation();

  return (
    <TouchableOpacity
      onPress={() => onPresstoNavigate && onPresstoNavigate(data.id)}
      style={[styles.container, componentStyles?.containerStyle]}>
      {data.image ? (
        <Image
          resizeMode="cover"
          source={{
            uri: downloadMediaFromBunny({
              public_key: data?.image,
              mediaType: 'image',
              imageDir: 'profile',
              userDir: data.id,
            })?.url,
          }}
          style={styles.image}
        />
      ) : (
        <Icons.Image {...styles.image} />
      )}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text
            numberOfLines={2}
            style={[styles.headerText, componentStyles?.headerTextStyle]}>{`${
            data.user?.first_name ?? ''
          } ${data.user?.last_name ?? ''}`}</Text>
        </View>
        <View style={styles.emptyView} />
      </View>
      <View style={styles.reatingContainer}>
        <Icons.Star />
        <Text> {data.rating ?? 0}</Text>
        <View style={styles.emptyView} />
        <Icons.Verified />
        <Text style={styles.verifiedText}>{t('verifiedByMarathon')}</Text>
      </View>
      {data.status && (
        <Text
          style={[styles.statusText, componentStyles?.statusText]}
          numberOfLines={2}>
          {data.status}
        </Text>
      )}
    </TouchableOpacity>
  );
};
export default CoachInfo;
