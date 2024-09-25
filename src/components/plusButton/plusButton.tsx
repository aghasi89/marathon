import React from 'react';
import {  TouchableOpacity } from 'react-native';
import Icons from '../../assets/icons/svg/index';
import { formFieldGrey, } from '../../assets/styles/colors.styles';
import styles from './plusButton.style';

type Props={
  onPress:()=>void
}

const PlusButton: React.FC<Props> = ({onPress}) => {
  return (<TouchableOpacity
  onPress={()=>onPress()}
   style={styles.container}>
    <Icons.Plus fill={formFieldGrey} />
  </TouchableOpacity>);
};
export default PlusButton;
