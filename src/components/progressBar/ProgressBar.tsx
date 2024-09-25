import React, {useEffect, useState} from 'react';
import {View, Animated, Text, TextStyle} from 'react-native';
import styles from './ProgressBar.styles';
import {ViewStyle} from 'react-native';

type Props = {
  progress: number;
  containerStyles?: ViewStyle | ViewStyle[];
  text?:string;
  textStyle?:TextStyle|TextStyle[]
};
const ProgressBar: React.VFC<Props> = ({progress, containerStyles,text,textStyle}) => {
  const [fadeAnim, _] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: (250 * progress) / 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim, progress]);

  return (
    <View style={[styles.container, containerStyles]}>
      <View style={styles.progressBackgroundContainer}>
        <Animated.View style={[styles.bar, {width: fadeAnim}]} />
      </View>
      <Text style ={textStyle}>
        {text}
      </Text>
    </View>
  );
};
export default ProgressBar;
