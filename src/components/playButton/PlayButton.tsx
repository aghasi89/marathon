import React from 'react';
import {  TouchableOpacity, View } from 'react-native';
import Icons from '../../assets/icons/svg/index';
import styles from './PlayButton.style';

type Props={
  onPress:()=>void
}

const PlayButton: React.FC<Props> = ({onPress}) => {
  return (<TouchableOpacity
  onPress={()=>onPress()}
   style={styles.container}>
     <View style={styles.circleContainer}>
     <Icons.Circle />

     </View>
  </TouchableOpacity>);
};
export default PlayButton;
