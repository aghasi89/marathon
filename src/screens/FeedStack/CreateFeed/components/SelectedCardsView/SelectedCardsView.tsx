import * as React from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import {IWorkoutSelectedMultiItem} from '../../../../../types/types';
import {calcWidth} from '../../../../../assets/dimensions';
import SelectCardWithImage from '../selectCardWithImage/selectCardWithImage';
import styles from './SelectedCardsView.style';

type Props = {
  onCloseIconPress?: (item: IWorkoutSelectedMultiItem) => void;
  dataList?: IWorkoutSelectedMultiItem[];
  cardSize?: 'small' | 'large';
  rowElementsCount: number;
  iconsExist?: boolean;
  onPress?: (id: number) => void;
  timeIcons?: boolean;
  isRecipe?: boolean;
  onSelect?: (item: IWorkoutSelectedMultiItem) => void;
};

const SelectedCardsView: React.VFC<Props> = ({
  dataList,
  cardSize,
  rowElementsCount,
  onCloseIconPress,
  iconsExist = true,
  onPress,
  timeIcons,
  onSelect,
  isRecipe,
}) => {
  const windowSize = Dimensions.get('screen');
  const cardItemWidth =
    (windowSize.width - (rowElementsCount + 1) * calcWidth(16)) /
    rowElementsCount;
  return (
    <View>
      <FlatList
        data={dataList}
        numColumns={rowElementsCount}
        style={styles.scrollContainer}
        keyExtractor={item => (item.id ? item.id.toString() : '')}
        renderItem={({item, index}) => {
          return (
            <SelectCardWithImage
              containerStyle={[
                styles.cardItemContainer,
                {
                  maxWidth: cardItemWidth,
                  minWidth: cardItemWidth,
                },
              ]}
              onPress={() => {
                if (onPress) {
                  onPress(item.id);
                } else if (onSelect) {
                  onSelect(item);
                }
              }}
              closeIconExist={true}
              onCloseIconPress={() =>
                onCloseIconPress && onCloseIconPress(item)
              }
              cardSize={cardSize}
              title={isRecipe ? item.title : item.name}
              url={item.url}
              trainings={item.trainings?.length}
              duration={item.duration}
              iconsExist={iconsExist}
              isRecipe={isRecipe}
              timeIcons={timeIcons}
              calories={item.calories}
            />
          );
        }}
      />
    </View>
  );
};
export default SelectedCardsView;
