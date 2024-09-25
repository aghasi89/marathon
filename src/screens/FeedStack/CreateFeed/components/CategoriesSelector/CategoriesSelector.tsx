import * as React from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import Toaster from '../../../../../components/toester/Toester';
import Icons from '../../../../../assets/icons/svg';
import {IFeedCategoryItem} from '../../../../../types/types';
import {calcHeight} from '../../../../../assets/dimensions';
import styles from './CategoriesSelector.style';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  toggleAccordion: (id: number) => void;
  onSelect: (selected: IFeedCategoryItem) => void;
  categoriesList?: IFeedCategoryItem[];
};

const CategoriesSelector: React.VFC<Props> = ({
  isVisible,
  onClose,
  toggleAccordion,
  onSelect,
  categoriesList,
}) => {
  return (
    <Toaster
      height={calcHeight(400)}
      onClose={onClose}
      contentAlign='stretch'
      isVisible={isVisible}
      Screen={
        <View style={styles.container}>
          <FlatList
            data={categoriesList}
            keyExtractor={item => item.id?.toString()}
            style={styles.categoriesListContainer}
            renderItem={({item, index}) => (
              <View style={styles.contentItemContainer}>
                <Pressable
                  onPress={() => {
                    toggleAccordion(item.id)
                  }}
                  style={styles.titleContainer}>
                     <Text style={styles.titleText}>{item.name}</Text>
                  {item.isActive ? (
                    <Icons.UpArrowIcon {...styles.arrowIconSelected} />
                  ) : (
                    <Icons.DownArrowIcon {...styles.arrowIcon} />
                  )}
                 
                </Pressable>
                {!item?.isActive && (
                  <View style={styles.categoriesContainer}>
                    {item.category.map((el,index) => {
                      return (
                        <Pressable onPress ={()=>onSelect({...item,category:[el]})} key={index} style={styles.categoryRowContainer}>
                          <Text style={styles.categoryName}>{el.name}</Text>
                          {el?.isSelected ? (
                            <Icons.Check {...styles.checkIcon} />
                          ) : (
                            <View />
                          )}
                        </Pressable>
                      );
                    })}
                  </View>
                )}
              </View>
            )}
          />
        </View>
      }
    />
  );
};
export default CategoriesSelector;
