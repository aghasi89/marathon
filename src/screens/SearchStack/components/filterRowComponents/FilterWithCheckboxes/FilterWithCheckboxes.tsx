import * as React from 'react';
import {Text, View, ViewStyle} from 'react-native';
import CheckboxWithLabel from '../../CheckboxWithLabel/CheckboxWithLabel';
import styles from './FilterWithCheckboxes.style'

type Props = {
  title?: string;
  selecteds?: number[];
  checkboxes?: string[];
  onPress?: (index: number) => void;
  containerStyle?:ViewStyle|ViewStyle[]
};

const FilterWithCheckboxes: React.VFC<Props> = ({
  title,
  checkboxes,
  selecteds,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.checkboxesList}>
        {checkboxes?.map((item, index) => (
          <CheckboxWithLabel
            key={index}
            label={item}
            isSelected={selecteds?.includes(index)}
            onPress={() => onPress && onPress(index)}
            containerStyle={styles.checkboxesItem}
          />
        ))}
      </View>
    </View>
  );
};
export default FilterWithCheckboxes;
