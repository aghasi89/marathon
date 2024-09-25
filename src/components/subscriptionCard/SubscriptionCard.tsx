import React from 'react';
import {View, Image, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {PrimeryButton} from '../buttons';
import styles from './SubscriptionCard.styles';

type Props = {
  name: string;
  imageUrl: string;
  isFollow: boolean;
  setIsFollow: () => void;
  onPress?: () => void;
  containerStyle?:ViewStyle|ViewStyle[]
  followButtonShow?:boolean
};

const SubscriptionCard: React.FC<Props> = ({
  name,
  imageUrl,
  isFollow,
  setIsFollow,
  onPress,
  containerStyle,
  followButtonShow=true
}) => {
  return (
    <View style={[styles.container,containerStyle]}>
      <TouchableOpacity style={styles.headerContainer} onPress={onPress}>
        <Image source={{uri: imageUrl}} style={styles.image} />
        <Text style={styles.titleText}>{name}</Text>
      </TouchableOpacity>
      {followButtonShow&&
      <PrimeryButton
        title={isFollow ? 'Following' : 'Follow'}
        type={isFollow ? 'outline' : 'default'}
        onPress={setIsFollow}
        style={styles.importButton}
        textStyle={isFollow ? styles.buttonFollow : styles.buttonFollowing}
      />}
    </View>
  );
};
export default SubscriptionCard;
