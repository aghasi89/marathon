import React from 'react';
import { Text, Image, View, Pressable } from 'react-native';
import Icons from '../../../../../assets/icons/svg/index';
import styles from './UserCard.style';
import { PrimeryButton } from '../../../../../components/buttons';
import { useTranslation } from 'react-i18next';

type Props = {
  imageUrl?: string;
  userName: string;
  selected?: boolean;
  id: string;
  isUnfollow: boolean;
  handleUnfollow: () => void;
  screenType: string;
  handleCardPress: () => void;
};
const UserCard: React.FC<Props> = (props: Props) => {
  const { handleCardPress, imageUrl, userName, isUnfollow, handleUnfollow, screenType } = props;
  const { t } = useTranslation();

  return (
    <Pressable
    onPress={handleCardPress}
      style={styles.container}>
      <View style={styles.subConatiner}>
        {imageUrl ? (
          <Image
            style={styles.userAvatar}
            source={{
              uri: imageUrl,
            }}
          />
        ) : (
          <Icons.UserIcon {...styles.userAvatar} />
        )}
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <PrimeryButton
        shadow={false}
        type={isUnfollow ? "default" : screenType === "MyProfile" ? 'outline' : 'default'}
        disable={screenType === "MyProfile" ? !isUnfollow : false}
        onPress={isUnfollow ? handleUnfollow : screenType === "MyProfile" ? () => { } : handleUnfollow}
        title={
          isUnfollow
            ? t('unfollowing') ?? ''
            : screenType === "MyProfile" ?  t('followed') ?? '' : "follow"
        }
        style={isUnfollow ? styles.defaultButton : screenType === "MyProfile" ? styles.outLineButton : styles.defaultButton}
        textStyle={isUnfollow ? styles.defaultButtonText : screenType === "MyProfile" ?  styles.outLineButtonText : styles.defaultButtonText}
      />
    </Pressable>
  );
};
export default UserCard;
