import React, { useCallback, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import ActionSheet, { ActionSheetRef, SheetProps, useScrollHandlers } from 'react-native-actions-sheet';
import Icons from '../../assets/icons/svg/index'
import { IFeedCategoryItem, IFeedTypes } from '../../types/types';
import styles from './CategoriesSheet.style';

type Props = {
  dataList: IFeedCategoryItem[];
  selected: IFeedCategoryItem[],
  feedType: IFeedTypes
  onSave: (value?: IFeedCategoryItem[]) => void;
};

const CategoriesSheet = ({ sheetId, payload }: SheetProps<Props>) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const scrollHandlers = useScrollHandlers<ScrollView>('1', actionSheetRef);
  const [selectedCategories, setSelectedCategories] = useState(payload?.selected)
  const [categories, setCategories] = useState(payload?.dataList)  

  const accordionOpenHandle = useCallback(
    (id: number) => {
      let newList = categories ? [...categories] : [];
      const index = newList.findIndex(el => el.id === id);
      newList[index].isActive = !newList[index].isActive;
      setCategories(newList)
    },
    [categories],
  );

  const categorySelectHandle = useCallback(
    (selectedCategory: IFeedCategoryItem) => {
      if (payload?.feedType !== 'recipe') {
        if (
          selectedCategories &&
          selectedCategory?.category &&
          selectedCategories?.length > 0 &&
          selectedCategories[0].id === selectedCategory.id &&
          selectedCategory?.category.findIndex(
            el =>
              selectedCategories &&
              selectedCategories[0].category &&
              el.id === selectedCategories[0].category[0]?.id,
          ) >= 0
        ) {
          setSelectedCategories([])
        } else {
          setSelectedCategories([selectedCategory])
        }
        let newList = categories?.map(el => {
          if (el.id === selectedCategory.id) {
            return {
              ...el,
              category:
                el.category &&
                el.category.map(item => {
                  if (
                    selectedCategory?.category &&
                    item.id === selectedCategory?.category[0]?.id
                  ) {
                    return { ...item, isSelected: !item.isSelected };
                  } else {
                    return { ...item, isSelected: false };
                  }
                }),
            };
          } else {
            return {
              ...el,
              category: el.category?.map(item => {
                return { ...item, isSelected: false };
              }),
            };
          }
        });
        setCategories(newList)
      } else {
        let list = selectedCategories
          ? [...selectedCategories]
          : [],
          selectedIndex = list.findIndex(el => el.id === selectedCategory.id);
        if (selectedIndex >= 0) {
          list.splice(selectedIndex, 1);
        } else {
          list = [...list, selectedCategory];
        }
        setSelectedCategories(list)
        let newList = categories ? [...categories] : [];
        const index = newList.findIndex(el => el.id === selectedCategory.id);
        newList[index].category = newList[index]?.category?.map(el => {
          if (
            selectedCategory.category &&
            el.id === selectedCategory.category[0].id
          ) {
            return { ...el, isSelected: !el.isSelected };
          }
          return { ...el };
        });
        setCategories(newList)
      }
      payload?.feedType!=='recipe'&&modalCloseHandle()
    },
    [selectedCategories],
  );
const modalCloseHandle = useCallback(()=>{
    setTimeout(()=>{
      actionSheetRef.current?.setModalVisible(false)
    },0)
},[selectedCategories])
  return (
    <ActionSheet
      safeAreaInsets={{ bottom: 0, top: 0, left: 0, right: 0 }}
      id={sheetId}
      ref={actionSheetRef}
      initialSnapIndex={0}
      statusBarTranslucent
      drawUnderStatusBar={true}
      gestureEnabled={true}
      containerStyle={styles.containerStyle}
      onClose={() => {
        payload?.onSave(selectedCategories)
      }}
      defaultOverlayOpacity={0.3}>
      <ScrollView {...scrollHandlers} style={styles.scrollview}>
        <View>
          {
            categories?.map((item,index) => {
              return <View key={(item.id+1000).toString()} style={styles.contentItemContainer}>
                <Pressable
                  onPress={() => {
                    accordionOpenHandle(item.id)
                  }}
                  style={styles.titleContainer}>
                  <Text style={styles.titleText}>{item.name}</Text>
                  {item.isActive ? (
                    <Icons.UpArrowIcon {...styles.arrowIconSelected} />
                  ) : (
                    <Icons.DownArrowIcon {...styles.arrowIcon} />
                  )}

                </Pressable>
                {!item?.isActive && item.category && (
                  <View style={styles.categoriesContainer}>
                    {item.category.map((el, index) => {
                      return (
                        <Pressable
                          onPress={() => {
                            categorySelectHandle({ ...item, category: [el] })
                          }}
                          key={index}
                          style={styles.categoryRowContainer}>
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
            })
          }
        </View>
      </ScrollView>
    </ActionSheet>
  );
};
export default CategoriesSheet;
