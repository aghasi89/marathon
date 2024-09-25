import React from 'react';
import { View, Text } from 'react-native';
import styles from './IngredientsItem.style';
import Icons from '../../assets/icons/svg/index';
import { formFieldGrey } from '../../assets/styles/colors.styles';

type Props = {
  title: string,
  weight: string
};
const IngredientsItem: React.FC<Props> = ({ title, weight }) => {
  return (<View style={styles.container}>
    <View style={styles.block}>
      <Icons.Circle fill={formFieldGrey} />
      <Text style={styles.text}>{title}</Text>
    </View>
    <Text style={styles.text}>{weight}</Text>
  </View>);
};
export default IngredientsItem;
