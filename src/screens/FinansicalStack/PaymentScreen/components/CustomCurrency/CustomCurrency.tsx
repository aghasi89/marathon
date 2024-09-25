import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { primaryGrey } from '../../../../../assets/styles/colors.styles';
import Icons from '../../../../../assets/icons/svg/index'
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';
import styles from './CustomCurrency.style';

interface IProps {
  title: string,
  onPress: () => void
}

const CustomCurrency: React.FC<IProps> = (props) => {

  const { title, onPress } = props

  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <View style={styles.row}>
        <Icons.Payment height={calcHeight(12)} width={calcWidth(12)} fill={primaryGrey} />
        <Text style={styles.filterText}>{title}</Text>
      </View>
      <Icons.ArrowDowm fill={primaryGrey} />
    </TouchableOpacity>
  );
};
export default CustomCurrency;
