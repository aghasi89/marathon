import React from 'react';
import {ViewStyle, View, Text, Image, Pressable} from 'react-native';
import {
  paleCornflowerBlue,
  robinEggBlue,
} from '../../../../../../assets/styles/colors.styles';
import Icons from '../../../../../../assets/icons/svg/index';
import styles from './addUserCard.style';

type Props = {
  imageUrl?: string;
  name: string;
  username?: string;
  selected?: boolean;
  id: string;
  customStyles?: {
    containerStyle?: ViewStyle | ViewStyle[];
  };
  onSelectItem?: (id: string) => void;
  disable?: boolean;
  isAdmin?: boolean;
};
const AddUserCard: React.FC<Props> = (props: Props) => {
  const {
    disable,
    isAdmin,
    imageUrl,
    onSelectItem,
    name,
    username,
    selected,
    id,
    customStyles,
  } = props;
  return (
    <Pressable
      disabled={disable}
      android_ripple={{
        color: robinEggBlue,
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
        <Icons.ChatPersonIcon {...styles.userAvatar} />
      )}
      <View style={styles.nameContainer}>
        <Text numberOfLines={1} style={styles.name}>
          {name}
        </Text>
        <Text numberOfLines={1} style={styles.userName}>
          {'@' + username}
        </Text>
      </View>
      {isAdmin && (
        <View style={{position: 'absolute', right: 0}}>
          <Text style={styles.adminText}>Admin</Text>
        </View>
      )}
    </Pressable>
  );
};
export default AddUserCard;
