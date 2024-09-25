import * as React from 'react';
import {Image, Text, View, ViewStyle} from 'react-native';
import Icons from '../../../../../assets/icons/svg';
import styles from './UserCardComponent.style';

type Props = {
  url?: string;
  name?: string;
  containerStyle?: ViewStyle | ViewStyle[];
};

const UserCardComponent: React.VFC<Props> = ({containerStyle, name, url}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.userImageContainer}>
        {url ? (
          <Image style={styles.userImage} source={{uri: url}} />
        ) : (
          <Icons.AltImageIcon style={styles.altImage} />
        )}
      </View>
      {name && <Text style={styles.userName}>{name}</Text>}
    </View>
  );
};
export default UserCardComponent;
