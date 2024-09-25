import React from 'react';
import {ViewStyle, Text, Image, Pressable} from 'react-native';
import {paleCornflowerBlue} from '../../../../../../assets/styles/colors.styles';
import Icons from '../../../../../../assets/icons/svg/index';
import styles from './userCard.style';

type Props = {
  imageUrl?: string;
  userName: string;
  selected?: boolean;
  id: string;
  customStyles?: {
    containerStyle?: ViewStyle | ViewStyle[];
  };
  onSelectItem?: (id: string) => void;
};
const UserCard: React.FC<Props> = (props: Props) => {
  const {imageUrl, onSelectItem, userName, selected, id, customStyles} = props;
  return (
    <Pressable
      android_ripple={{
        color: paleCornflowerBlue,
      }}
      style={
        (customStyles?.containerStyle,
        [selected ? [styles.container, styles.selectedUser] : styles.container])
      }
      onPress={() => onSelectItem && onSelectItem(id)}>
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
    </Pressable>
  );
};
export default UserCard;
