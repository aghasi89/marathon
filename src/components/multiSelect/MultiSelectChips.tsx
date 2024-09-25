import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {  primaryBlue, primaryWhite } from '../../assets/styles/colors.styles';
import { ITag } from '../../types/types';
import styles from './MultiSelectChips.style';

type Props = {
  list: Array<ITag>,
  selectedItems: Array<ITag>,
  onPressItem: (value: any) => void
};
const MultiSelectChips: React.FC<Props> = ({ list, onPressItem, selectedItems }) => {
  const checkIsSelectedItem = (id: number) => {
    for (let index = 0; index < selectedItems.length; index++) {
      if (selectedItems[index].id === id) return true
    }
    return false
  }
  return (
    <View style={styles.container}>
      {list.map((element: any, index: number) => {
        return <TouchableOpacity
          key={index}
          onPress={() => onPressItem(element)}
          style={[styles.chipContainer, { backgroundColor: checkIsSelectedItem(element.id) ? primaryBlue : primaryWhite }]}>
          <Text style={[styles.text, {
            color: checkIsSelectedItem(element.id) ? primaryWhite : primaryBlue,
          }]}>{element.name}</Text>
        </TouchableOpacity>
      })}
    </View>
  );
};
export default MultiSelectChips;
