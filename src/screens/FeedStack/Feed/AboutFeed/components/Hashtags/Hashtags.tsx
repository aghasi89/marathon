import React from 'react';
import {View, ViewStyle, Text} from 'react-native';
import { ISelectedFeedHashtagsData } from '../../../../../../types/types';
import styles from './Hashtags..style';

type Props = {
  containerStyle?: ViewStyle;
  data?: ISelectedFeedHashtagsData
};

const HashtagsComponent: React.VFC<Props> = ({data,containerStyle}) => {
  return (
    <View style={styles.hashtagsContainer}>
      {data?.feedCategory && (
        <View style={[styles.feedCategoryContainer,containerStyle]}>
          <Text style={styles.hashtagsText}>{data?.feedCategory}</Text>
        </View>
      )}
      {data?.hashtags?.map((item, index) => {
        return (
          <Text key={index} style={styles.hashtagsText}>
            {item}
          </Text>
        );
      })}
    </View>
  );
};
export default HashtagsComponent;
