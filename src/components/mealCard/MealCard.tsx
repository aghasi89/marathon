import React from 'react';
import {View, Image, Text, TouchableOpacity, TextStyle} from 'react-native';
import Icons from '../../assets/icons/svg';
import {formFieldGrey, primaryBlack} from '../../assets/styles/colors.styles';
import DropDownComponent from '../dropDown/DropDown';
import NumberInput from '../numberInput/NumberInput';
import styles from './MealCard.styles';

type Props = {
  imageUrl: string;
  title: string;
  selectedTypesList: any;
  selectedTypeText: string;
  setSelectedTypeText: (value: string) => void;
  valueNumber: string;
  onChangeNumberValue: (value: string) => void;
  kcalSize: number;
  kcalSizeStyle?: TextStyle;
  onClose?: () => void;
  isDropDown?: boolean;
  count?: string;
  time?: string;
};
const MealCard: React.FC<Props> = ({
  imageUrl,
  title,
  selectedTypesList,
  selectedTypeText,
  setSelectedTypeText,
  onChangeNumberValue,
  valueNumber,
  kcalSize,
  kcalSizeStyle,
  onClose,
  isDropDown = false,
  count,
  time,
}) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.headerContainer}>
        <Image source={{uri: imageUrl}} style={styles.image} />
        <Text style={styles.titleText}>{title}</Text>
        <TouchableOpacity style={styles.closeTouch} onPress={onClose}>
          <Icons.PlusX fill={primaryBlack} />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        {isDropDown ? (
          <View style={styles.textInpuContainer}>
            <View style={styles.itemContainer}>
              <Icons.Trainer fill={formFieldGrey} />
              <Text style={styles.count}>{count}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Icons.Clock />
              <Text style={styles.count}>{time} min</Text>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.select}>
              <DropDownComponent
                list={selectedTypesList}
                selected={selectedTypeText}
                setSelected={value => {
                  setSelectedTypeText(value);
                }}
                style={styles.selectStyle}
              />
            </View>
            <View style={styles.numberInput}>
              <NumberInput
                value={valueNumber}
                onChangeValue={(val: string) => {
                  onChangeNumberValue(val);
                }}
              />
            </View>
          </>
        )}
        <Text style={[styles.titleText, styles.kcalText, kcalSizeStyle]}>
          {kcalSize} kcal
        </Text>
      </View>
    </View>
  );
};
export default MealCard;
