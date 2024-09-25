import React from 'react';
import { View, Pressable } from 'react-native';
import Icons from '../../../assets/icons/svg';
import styles from './FeedHeader.style';
import { primaryBlack } from '../../../assets/styles/colors.styles';

type Props = {
  onSearchIconPress: () => void;
  onLogoPress?: () => void;
};

const FeedHeader: React.FC<Props> = ({ onSearchIconPress, onLogoPress }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onLogoPress}>
        <Icons.Marathon {...styles.logoIcon} />
      </Pressable>
      <Pressable style={styles.searchIconTouchContainer} onPress={onSearchIconPress}>
        <Icons.SearchIcon fill={primaryBlack} {...styles.searchIcon} />
      </Pressable>
    </View>
  );
};

export default FeedHeader;
