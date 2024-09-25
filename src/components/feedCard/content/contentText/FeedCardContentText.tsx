import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  TextLayoutEventData,
  NativeSyntheticEvent,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {IFeedMultiItem} from '../../../../types/types';
import styles from './FeedCardContentText.style';

type Props = {
  description?: string;
  hashtags?: IFeedMultiItem[];
  onHehashtagPress?: (index: number) => void;
  numberOfLines?:number
  onPress?:()=>void
};
const FeedCardContentText: React.FC<Props> = ({
  description,
  hashtags,
  onHehashtagPress,
  numberOfLines=3,
  onPress
}) => {
  const {t} = useTranslation();
  const [linesMaxCount, setLinesMaxCount] = useState<number>(0);
  const [expanded, setExpanded] = useState(false);
  const linesCount = useRef(new Animated.Value(numberOfLines)).current;

  const onTextLayout = ({
    nativeEvent,
  }: NativeSyntheticEvent<TextLayoutEventData>) => {
    setLinesMaxCount(nativeEvent.lines.length);
  };

  const animateHeight = (toValue: number) => {
    return Animated.timing(linesCount, {
      toValue,
      duration: 150, 
      useNativeDriver: false,
    });
  };
  const seeMoreHandle = () => {
    setExpanded(current => {
      if (!current) {
        animateHeight(linesMaxCount).start();
      }else{
        animateHeight(numberOfLines).start();
      }
      return !current
    });
  };

  return (
    <Pressable onPress={onPress}style={styles.container}>
      {description ? (
        <Animated.View>
          <Animated.View>
            <Animated.Text
              numberOfLines={linesCount}
              onTextLayout={onTextLayout}
              style={styles.descriptionText}>
              {description}
            </Animated.Text>
          </Animated.View>
          {linesMaxCount > numberOfLines && (
            <Pressable
              onPress={seeMoreHandle}
              style={styles.seeMoreContainer}>
              <Text>{!expanded?`${t('seeMore')}`:`${t('seeLess')}`}</Text>
            </Pressable>
          )}
        </Animated.View>
      ) : null}
      {hashtags ? (
        <View style={styles.hashtagsListContainer}>
          {hashtags.map((item, index) => {
            return (
              <Pressable
                key={index}
                style={styles.hashtagTouchContainer}
                onPress={() => onHehashtagPress && onHehashtagPress(index)}>
                <Text style={styles.hashtagText}>{item.name}</Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </Pressable>
  );
};
export default FeedCardContentText;
