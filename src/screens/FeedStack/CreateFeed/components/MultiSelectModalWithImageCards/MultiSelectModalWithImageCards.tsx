import * as React from 'react';
import {View, FlatList, Pressable, Dimensions, Text} from 'react-native';
import Toaster from '../../../../../components/toester/Toester';
import Icons from '../../../../../assets/icons/svg';
import {IWorkoutSelectedMultiItem} from '../../../../../types/types';
import SelectCardWithImage from '../selectCardWithImage/selectCardWithImage';
import InputComponent from '../InputComponent/InputComponent';
import styles from './MultiSelectModalWithImageCards.style';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onSelect?: (selected?: IWorkoutSelectedMultiItem) => void;
  dataList?: IWorkoutSelectedMultiItem[];
  selectedList?: number[];
  cardSize?: 'small' | 'large';
  onSearchInputValueChange?: (value: string) => void;
  searchInputPlaceholder?: string;
  rowElementsCount: number;
  filterIconExist?: boolean;
  onFilterIconPress?: () => void;
  title?: string;
  titleExist?: boolean;
  searchInputExist?: boolean;
  cardsIconExist?: boolean;
  onPlusButtonPress?: () => void;
  showPlusButton?: boolean;
};

const MultiSelectModalWithImageCards: React.VFC<Props> = ({
  isVisible,
  onClose,
  onSelect,
  dataList,
  selectedList,
  cardSize,
  onSearchInputValueChange,
  searchInputPlaceholder,
  rowElementsCount,
  filterIconExist,
  onFilterIconPress,
  title,
  titleExist,
  searchInputExist = true,
  cardsIconExist = true,
  onPlusButtonPress,
  showPlusButton,
}) => {
  const windowSize = Dimensions.get('window');
  const cardWidth =(windowSize.width - ((rowElementsCount + 1) * 16)) /
  rowElementsCount
  return (
    <Toaster
      height={windowSize.height * 0.7}
      onClose={onClose}
      isVisible={isVisible}
      contentAlign="stretch"
      Screen={
        <View style={styles.container}>
          {searchInputExist && (
            <InputComponent
              onChange={onSearchInputValueChange}
              placeholder={searchInputPlaceholder}
              icon={<Icons.SearchIcon />}
              containerStyle={styles.searchInputContainer}
              inputStyle={styles.searchInput}
              rightIcon={
                filterIconExist ? (
                  <Pressable onPress={onFilterIconPress}>
                    <Icons.Filter />
                  </Pressable>
                ) : null
              }
            />
          )}
          {titleExist && (
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
            </View>
          )}
          <FlatList
            data={dataList}
            numColumns={rowElementsCount}
            style={styles.scrollContainer}
            keyExtractor={item => (item.id ? item.id.toString() : '')}
            renderItem={({item, index}) => (
              <SelectCardWithImage
                containerStyle={[
                  styles.cardItemContainer,
                  {
                    width:cardWidth,
                    maxWidth:cardWidth
                  },
                ]}
                cardSize={cardSize}
                onSelect={() => onSelect && onSelect(item)}
                title={item.name}
                isSelected={item.id ? selectedList?.includes(item.id) : false}
                url={item.url}
                iconsExist={cardsIconExist}
              />
            )}
          />
          {showPlusButton && (
            <Pressable style={styles.plusButton} onPress={onPlusButtonPress}>
              <Icons.Plus {...styles.plusIcon} />
            </Pressable>
          )}
        </View>
      }
    />
  );
};
export default MultiSelectModalWithImageCards;
