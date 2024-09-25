import React from 'react';
import { ViewStyle, Text, Image, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icons from '../../assets/icons/svg/index';
import styles from './UserShareItem.style';
import { primaryBlue, primaryGrey } from '../../assets/styles/colors.styles';

type Props = {
  imageUrl?: string;
  userName: string;
  selected?: boolean;
  item?: string;
  customStyles?: {
    containerStyle?: ViewStyle | ViewStyle[];
  };
  shareFeedHandler?: (item: any) => void;
  disabled?: boolean;
};
const UserShareItem: React.FC<Props> = (props: Props) => {
  const { imageUrl, userName, disabled, item, shareFeedHandler } = props;
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
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
      <View style={styles.middleContainer}>
        <Text numberOfLines={2} style={styles.userName}>{userName}</Text>
        <TouchableOpacity
          disabled={disabled}
          style={[
            styles.shareButton,
            { backgroundColor: disabled ? primaryGrey : primaryBlue },
          ]}
          onPress={() => shareFeedHandler && shareFeedHandler(item)}>
          <Text style={styles.text}>{t(`send`)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default UserShareItem;
