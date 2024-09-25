import React from 'react';
import { ViewStyle } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';
import Icons from '../../assets/icons/svg/index';
import styles from './DropDown.styles';
import { formFieldGrey } from '../../assets/styles/colors.styles';
interface IList {
  value: string;
  lable: string;
}
interface IDropDownComponent {
  list: Array<IList>;
  selected: string;
  setSelected: (value: string) => void;
  style?: ViewStyle;
  placeholder?: string
}

export default function DropDownComponent(props: IDropDownComponent) {
  const { list, selected, setSelected, style, placeholder } = props;
  return (
    <SelectCountry
      style={[styles.dropdown, style]}
      selectedTextStyle={styles.selectedTextStyle}
      imageStyle={styles.imageStyle}
      iconStyle={styles.iconStyle}
      maxHeight={200}
      value={selected}
      data={list}
      valueField="id"
      labelField="lable"
      imageField="image"
      placeholder={placeholder ?? "Select country"}
      onChange={e => {
        setSelected(e);
      }}
      dropdownPosition={'bottom'}
      renderRightIcon={() => <Icons.ArrowDowm fill={formFieldGrey} />}
    />
  );
}
