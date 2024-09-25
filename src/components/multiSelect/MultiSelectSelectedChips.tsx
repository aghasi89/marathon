import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { formFieldGrey, primaryBlue, primaryWhite } from '../../assets/styles/colors.styles';
import styles from './MultiSelectChips.style';
import Icons from '../../assets/icons/svg/index';

type Props = {
  list: Array<any>,
  onDelete: (value: any) => void
};
const MultiSelectChips: React.FC<Props> = ({ list, onDelete }) => {

  return (
    <View style={styles.containerSelected}>
      {list.map((element: any, index: number) => {
        return <View
          key={index}
          style={styles.shadowContainer}>
          <Text style={[styles.selectedText,]}>{element.name}</Text>
          <TouchableOpacity onPress={() => { onDelete(element) }}>
            <Icons.Close fill={formFieldGrey} />
          </TouchableOpacity>
        </View>
      })}
    </View>
  );
};
export default MultiSelectChips;
