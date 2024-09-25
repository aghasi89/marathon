import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './SelectedColor.style';

interface ISelectColor {
  colorList: Array<any>,
  selectedColor: String,
  onSelectColor?: (value: string) => void
}

export default function SelectColor(props: ISelectColor) {
  const { colorList, selectedColor, onSelectColor } = props
  return (
    <>
      <Text style={styles.header}>Select tag color</Text>
      <ScrollView contentContainerStyle={styles.contentContainer} horizontal={true}>
        {
          colorList.map((color: any, index: number) => {
            return <View
              key={index}
              style={[styles.colorContainer, selectedColor == color ? styles.selectedColorContainer : null]}>
              <TouchableOpacity
                onPress={() => { onSelectColor(color) }}
                style={[styles.circleContainer, { backgroundColor: color, }]}>

              </TouchableOpacity>
            </View>

          })
        }
      </ScrollView>
    </>
  );
};
