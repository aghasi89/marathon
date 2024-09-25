import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Pressable, ScrollView, Dimensions} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
  useScrollHandlers,
} from 'react-native-actions-sheet';
import {useTranslation} from 'react-i18next';
import InputComponent from '../../screens/FeedStack/CreateFeed/components/InputComponent/InputComponent';
import SelectCardWithImage from '../../screens/FeedStack/CreateFeed/components/selectCardWithImage/selectCardWithImage';
import Icons from '../../assets/icons/svg';
import {IWorkoutSelectedMultiItem} from '../../types/types';
import {calcHeight} from '../../assets/dimensions';
import styles from './ExerciseListSheet.style';

type Props = {
  dataList?: IWorkoutSelectedMultiItem[];
  onSave: (value?: IWorkoutSelectedMultiItem[]) => void;
  selectedList?: number[];
  onPlusButtonPress: () => void;
};
const ExerciseListSheet = ({sheetId, payload}: SheetProps<Props>) => {
  const {t} = useTranslation();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const scrollHandlers = useScrollHandlers<ScrollView>('1', actionSheetRef);
  const [state, setState] = useState<IWorkoutSelectedMultiItem[]>();
  const windowSize = Dimensions.get('window');
  const cardWidth = (windowSize.width - (2 + 1) * 16) / 2;

  useEffect(() => {
    setState(
      payload?.dataList?.filter(el => payload?.selectedList?.includes(el.id)),
    );
  }, [payload?.dataList, payload?.selectedList]);

  const exerciseSelectHandle = useCallback(
    (selected?: IWorkoutSelectedMultiItem) => {
      let newList: IWorkoutSelectedMultiItem[] = state ? [...state] : [];
      const index = newList.findIndex(el => el.id === selected?.id);
      if (index >= 0) {
        newList.splice(index, 1);
      } else {
        if (selected) newList = newList ? [...newList, selected] : [selected];
      }
      setState(newList);
    },
    [state],
  );
  const searchInputValueChangeHandle = useCallback((value: string) => {}, []);
  const onFilterIconPressHandle = useCallback(() => {}, []);
  if (!payload) return <></>;

  return (
    <ActionSheet
      onClose={() => {
        payload.onSave(state);
      }}
      id={sheetId}
      ref={actionSheetRef}
      initialSnapIndex={0}
      statusBarTranslucent
      drawUnderStatusBar={true}
      gestureEnabled={true}
      indicatorStyle={{marginVertical: calcHeight(15)}}
      defaultOverlayOpacity={0.3}>
      <View>
        <InputComponent
          onChange={searchInputValueChangeHandle}
          placeholder={t('exercises') ?? ''}
          icon={<Icons.SearchIcon />}
          containerStyle={styles.searchInputContainer}
          inputStyle={styles.searchInput}
          rightIcon={
            <Pressable onPress={onFilterIconPressHandle}>
              <Icons.Filter />
            </Pressable>
          }
        />
        <ScrollView
          overScrollMode="never"
          {...scrollHandlers}
          style={styles.scrollContainer}>
          <View style={styles.container}>
            {payload?.dataList?.map((item, index) => {
              return (
                <SelectCardWithImage
                  key={index}
                  containerStyle={[
                    styles.cardItemContainer,
                    {
                      width: cardWidth,
                      maxWidth: cardWidth,
                    },
                  ]}
                  cardSize={'large'}
                  onSelect={() => exerciseSelectHandle(item)}
                  title={item.name}
                  isSelected={
                    item.id ? state?.map(el => el.id).includes(item.id) : false
                  }
                  url={item.url}
                  iconsExist={true}
                />
              );
            })}
          </View>
        </ScrollView>
        <Pressable
          style={styles.plusButton}
          onPress={() => {
            payload.onPlusButtonPress();
          }}>
          <Icons.Plus {...styles.plusIcon} />
        </Pressable>
      </View>
    </ActionSheet>
  );
};
export default ExerciseListSheet;
