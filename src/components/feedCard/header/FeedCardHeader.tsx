import React from 'react';
import { View, Image, Text, Pressable, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icons from '../../../assets/icons/svg';
import { PrimeryButton } from '../../buttons';
import styles from './FeedCardHeader.style';
import { primaryBlue, primaryWhite } from '../../../assets/styles/colors.styles';
import { useSelector } from 'react-redux';
import { profileSelector } from '../../../store/selectors/profile-selector';

type Props = {
  imageURL?: string;
  userName: string;
  feedDate: string;
  followButtonShow?: boolean;
  followButtonPress?: () => void;
  threeDotsIconPress: () => void;
  navigateUserPage: () => void
  am_i_follow?: boolean,
  creatorId?: number,
  onContainerPress?:()=>void
};
const FeedCardHeader: React.FC<Props> = ({
  imageURL,
  userName,
  feedDate,
  followButtonShow,
  followButtonPress,
  threeDotsIconPress,
  navigateUserPage,
  onContainerPress,
  am_i_follow,
  creatorId
}) => {
  const { t } = useTranslation()
  const user = useSelector(profileSelector);
  return (
    <Pressable onPress={onContainerPress} style={styles.container}>
      <Pressable onPress={navigateUserPage}  style={styles.userInfoContainer}>
        <View style={styles.imageContainer}>
          {imageURL ? (
            <Image style={styles.userImage} source={{ uri: imageURL }} />
          ) : (
            <Icons.AltImageIcon {...styles.altIcon} />
          )}
        </View>
        <View>
          <Text style={styles.userNameText}>{userName}</Text>
          <Text>{feedDate}</Text>
        </View>
      </Pressable>
      <View style={styles.buttonsContainer}>
        {!followButtonShow && !am_i_follow && user?.id !== creatorId &&
          <PrimeryButton
            style={[styles.followButtonStyle, { backgroundColor: primaryWhite }]}
            textStyle={[styles.followButtonTextStyle, { color: primaryBlue }]}
            title={t('follow') ?? ''}
            type="outline"
            onPress={() => {
              followButtonPress && followButtonPress();
            }}
          />
        }
        <Pressable
          style={styles.threeDotsIconTouch}
          onPress={threeDotsIconPress}>
          <Icons.EllipsisIcon {...styles.threeDotsIcon} />
        </Pressable>
      </View>
    </Pressable>
  );
};
export default FeedCardHeader;
