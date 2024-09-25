import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Icons from '../../assets/icons/svg/index';
import styles from './ChipsGroup.styles';

type elementTypes = {
  name: string;
  iconType?: string;
};
type Props = {
  elements: elementTypes[];
  type?: string;
  onPress?: (el: elementTypes) => void;
};
const returnIcon = (iconType: string) => {
  switch (iconType) {
    case 'clock':
      return <Icons.Clock />;
    case 'plus':
      return <Icons.Plus />;
    case 'create':
      return <Icons.Create />;
    case 'share':
      return <Icons.NotesEdit />;
    default:
      return <Icons.Clock />;
  }
};
const ChipsGroup: React.FC<Props> = ({ elements, type }) => {
  {
    if (type === 'bottomSheet') {
      return (
        <BottomSheetScrollView
          horizontal={true}
          contentContainerStyle={styles.scroll}
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}>
          {elements.map((element, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.itemContainer}
                onPress={() => onPress(element)}>
                {element.iconType && (
                  <View style={styles.iconContainer}>
                    {returnIcon(element.iconType)}
                  </View>
                )}
                <Text style={styles.text}>{element.name}</Text>
              </View>
            );
          })}
        </BottomSheetScrollView>
      );
    } else {
      return (
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.scroll}
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}>
          {elements.map((element, index) => {
            return (
              <View key={index} style={styles.itemContainer}>
                {element.iconType && (
                  <View style={styles.iconContainer}>
                    {returnIcon(element.iconType)}
                  </View>
                )}
                <Text style={styles.text}>{element.name}</Text>
              </View>
            );
          })}
        </ScrollView>
      );
    }
  }
};
export default ChipsGroup;
