import React from 'react';
import {View, ScrollView} from 'react-native';
import {ITag} from '../../types/types';
import {
  PhotoProgressCard,
  PhotoProgressCardImages,
} from '../photoProgressCard/PhotoProgressCard';

export type PhotoProgressCardsListData = {
  images?: PhotoProgressCardImages | string;
  comments?: Array<ITag>;
  titleText?: string;
  selectedType?: string;
};

type Props = {
  data: Array<PhotoProgressCardsListData>;
  onImagePress?: (index: number, selected?: string) => void;
  onCommentsPress?: (index: number) => void;
};

const PhotoProgressCardsList: React.FC<Props> = ({
  data,
  onImagePress,
  onCommentsPress,
}) => {
  return (
    <ScrollView>
      {data.map((item, index) => {
        return (
            item.images&&
            (<View key={index}>
            <PhotoProgressCard
              images={item.images}
              titleText={item.titleText}
              comments={item.comments}
              onCommentsPress={() => onCommentsPress && onCommentsPress(index)}
              onImagePress={selected =>
              onImagePress && onImagePress(index, selected??item.selectedType)
              }
              defaultIconType={item.selectedType}
            />
          </View>)
        );
      })}
    </ScrollView>
  );
};
export default PhotoProgressCardsList;
