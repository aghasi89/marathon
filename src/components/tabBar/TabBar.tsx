import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './TabBar.style';

type Props = {
  data: Array<string>;
  selectedIndex: number;
  setSelectedIndex: (value: number) => void;
  textColorOnSelect:string
  textColor:string
};
const TabBar: React.FC<Props> = ({
  data,
  selectedIndex, 
  setSelectedIndex,
  textColorOnSelect,
  textColor
}) => {
  return (
    <View style={styles.container}>
      {data.map((page, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.itemTouchConteiner}
          onPress={() => {
            setSelectedIndex(index);
          }}>
        <Text
          style={[
            {color: index === selectedIndex ? textColorOnSelect : textColor},
            styles.text,
          ]}
         >
          {page}
        </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TabBar;