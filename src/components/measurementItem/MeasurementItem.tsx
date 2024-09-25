import React, {ReactNode} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {primaryBlue, primaryWhite} from '../../assets/styles/colors.styles';
import styles from './MeasurementItem.style';

type elementTypes = {
  title: string;
  icon?: ReactNode;
  selectedIcon?: ReactNode;
  name?: string;
};
type Props = {
  data: elementTypes[];
  index: number;
  setIndex: (value: number) => void;
};
const MeasurementItem: React.FC<Props> = ({data, index, setIndex}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexDirection: 'row'}}>
      {data.map((element, id) => {
        return (
          <TouchableOpacity
            key={id}
            onPress={() => setIndex(id)}
            style={[
              styles.container,
              {
                backgroundColor: index === id ? primaryBlue : primaryWhite,
              },
            ]}>
            <View style={styles.titleContainer}>
              {element.icon ? (
                index === id ? (
                  element.selectedIcon
                ) : (
                  element.icon
                )
              ) : (
                <Text
                  style={
                    index === id ? styles.titleTextWhite : styles.titleText
                  }>
                  {element.name}
                </Text>
              )}
            </View>
            <View>
              <Text
                style={index === id ? styles.titleTextWhite : styles.titleText}>
                {element.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};
export default MeasurementItem;
