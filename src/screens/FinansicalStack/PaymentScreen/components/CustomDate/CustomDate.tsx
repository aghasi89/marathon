import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { primaryGrey } from '../../../../../assets/styles/colors.styles';
import Icons from '../../../../../assets/icons/svg/index'
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';
import styles from './CustomDate.style';

interface IProps {
  title: string,
  onPress: () => void
}

const CustomDate: React.FC<IProps> = (props) => {

  const { title, onPress } = props

  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <View style={styles.row}>
        <Icons.Calendar fill={primaryGrey} height={calcHeight(12)} width={calcWidth(12)} />
        <Text numberOfLines={1} style={styles.filterText}>{title}</Text>
      </View>
      <Icons.ArrowDowm fill={primaryGrey} />
    </TouchableOpacity>
  );
};
export default CustomDate;
