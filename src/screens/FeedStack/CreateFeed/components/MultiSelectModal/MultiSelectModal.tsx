import * as React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import Toaster from '../../../../../components/toester/Toester';
import { IFeedMultiItem } from '../../../../../types/types';
import { calcHeight } from '../../../../../assets/dimensions';
import styles from './MultiSelectModal.style';
import translationByCode from '../../../../../utils/translationByCode';

type Props = {
  isVisible?: boolean;
  onClose: () => void;
  onSelect: (selected: IFeedMultiItem) => void;
  dataList?: IFeedMultiItem[];
  selectedList?: (number | undefined)[];
  height?: number
};

const MultiSelectModal: React.VFC<Props> = ({
  isVisible,
  onClose,
  onSelect,
  dataList,
  selectedList,
  height
}) => {

  return (
    <Toaster
      height={height ?? calcHeight(400)}
      onClose={onClose}
      isVisible={isVisible}
      contentAlign="stretch"
      Screen={
        <View style={styles.container}>
          <FlatList
            data={dataList}
            keyExtractor={item => (item.id ? item.id?.toString() : '')}
            style={styles.listContainer}
            renderItem={({ item, index }) => {
              return item.isSelected !== false ? (
                <Pressable
                  key={index}
                  onPress={() => onSelect(item)}
                  style={
                    item.id && selectedList?.includes(item.id)
                      ? styles.selectedItemContainer
                      : styles.itemContainer
                  }>
                  <Text
                    style={
                      item.id && selectedList?.includes(item.id)
                        ? styles.selectedText
                        : styles.text
                    }>
                    {translationByCode(item)}
                  </Text>
                  {item.icon}
                </Pressable>
              ) : null;
            }}
          />
        </View>
      }
    />
  );
};
export default MultiSelectModal;
