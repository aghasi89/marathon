import React from 'react';
import {ViewStyle, Text, Image, TouchableOpacity} from 'react-native';
import styles from './selectedUserCard.style';
import Icons from '../../../../../../assets/icons/svg/index';

type Props = {
  imageUrl?: string;
  name: string;
  selected?: boolean;
  customStyles?: {
    containerStyle?: ViewStyle | ViewStyle[];
  };
  lastItem: boolean
};
const SelectedUserCard: React.FC<Props> = (props: Props) => {
  const {imageUrl, name, customStyles, lastItem} = props;
  console.log(lastItem);
  
  return (
    <TouchableOpacity style={[lastItem ? styles.lastContainer : styles.container, customStyles?.containerStyle]}>
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
      <Text numberOfLines={1} style={styles.userName}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};
export default SelectedUserCard;
