import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Icons from '../../../../assets/icons/svg/index';
import styles from './UserHeader.style';

interface IProps {
  roleMode: string;
  imageUrl?: string;
  followers: number;
  following: number;
  scrollValue: Animated.SharedValue<number>;
  navigateFollowersFollowingsPage: (value: "followers" | "followings") => void
}

const UserHeader: React.FC<IProps> = props => {
  const { t } = useTranslation();

  const { roleMode, imageUrl, followers, following, scrollValue, navigateFollowersFollowingsPage } = props;

  const headerContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollValue.value,
        [0, 50, 150],
        [1, 1, 0],
        Extrapolate.CLAMP,
      ),
    };
  });

  return (
    <Animated.View style={headerContainerAnimatedStyle}>
      <View style={styles.container}>
        <View style={styles.profileImageContainer}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.image, styles.altImageContainer]}>
              <Icons.AltProfileImage />
            </View>
          )}
          {roleMode == 'coach' && (
            <View style={styles.roleContainer}>
              <Text style={styles.buttonText}>{t('coach')}</Text>
              <Icons.RoleMode />
            </View>
          )}
        </View>
        <Pressable onPress={() => navigateFollowersFollowingsPage('followers')} style={styles.followers}>
          <Text style={styles.folowingTitle}>{t('followers')}</Text>
          <Text style={styles.followingText}>{followers}</Text>
        </Pressable>
        <Pressable onPress={() => navigateFollowersFollowingsPage('followings')} style={styles.followers}>
          <Text style={styles.folowingTitle}>{t('following')}</Text>
          <Text style={styles.followingText}>{following}</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};
export default UserHeader;
