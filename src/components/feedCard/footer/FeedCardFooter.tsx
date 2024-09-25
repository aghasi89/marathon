import React from 'react';
import { View, Text, Pressable, ViewStyle } from 'react-native';
import Icons from '../../../assets/icons/svg';
import {
  lightGrayishBlue,
  primaryBlue,
} from '../../../assets/styles/colors.styles';
import styles from './FeedCardFooter.style';

type Props = {
  commentsCount?: number;
  isLiked?: boolean;
  likesCount?: number;
  isBookmarked?: Boolean;
  commentIconPress: (id?: number) => void;
  energyIconPress: (actionType: 'press' | 'longPress') => void;
  shareIconPress: (id?: number) => void;
  bookmarkIconPress?: () => void;
  containerStyle?: ViewStyle;
  onContainerPress?: () => void
};
const FeedCardFooter: React.FC<Props> = ({
  commentsCount,
  isLiked,
  likesCount,
  commentIconPress,
  energyIconPress,
  shareIconPress,
  isBookmarked,
  bookmarkIconPress,
  containerStyle,
  onContainerPress
}) => {
  return (
    <Pressable onPress={onContainerPress} style={[styles.container, containerStyle]}>
      <View style={styles.leftIconsGroupContainer}>
        <Pressable
          style={styles.iconAndCountTouchContainer}
          onLongPress={() => energyIconPress('longPress')}
          onPress={() => energyIconPress('press')}>
          {!isLiked ? (
            <Icons.Energy {...styles.icons} />
          ) : (
            <Icons.EnergySelected {...styles.icons} />
          )}
          <Text style={styles.countText}>{likesCount ?? 0}</Text>
        </Pressable>
        <Pressable
          style={styles.iconAndCountTouchContainer}
          onPress={() => commentIconPress()}>
          <Icons.Comments {...styles.icons} fill={lightGrayishBlue} />
          <Text style={styles.countText}>{commentsCount ?? 0}</Text>
        </Pressable>
        <Pressable
          style={styles.iconAndCountTouchContainer}
          onPress={() => shareIconPress()}>
          <Icons.Repost {...styles.icons} fill={lightGrayishBlue} />
        </Pressable>
      </View>
      {/* {bookmarkIconPress && (
        <Pressable onPress={bookmarkIconPress}>
          <Icons.FeedBookmarkIcon
            {...styles.icons}
            stroke={isBookmarked ? primaryBlue : lightGrayishBlue}
            fill={isBookmarked ? primaryBlue : 'none'}
          />
        </Pressable>
      )} */}
    </Pressable>
  );
};
export default FeedCardFooter;
