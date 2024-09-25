import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './SegmentedHeader.styles';

type Props = {
  selectedIndex: number;
  lebalList: string[];
  onChange: (value: number) => void;
};
const SegmentedHeader: React.FC<Props> = ({
  selectedIndex,
  lebalList,
  onChange,
}) => {
  return (
    <View style={styles.container}>
      {lebalList.map((element: string, index: number) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              onChange(index);
            }}
            style={styles.touch}>
            <Text
              style={
                selectedIndex === index
                  ? styles.activeLabelStyle
                  : styles.labelStyle
              }>
              {element}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SegmentedHeader;
