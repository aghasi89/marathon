import React from 'react';
import {ImageBackground, TouchableOpacity, View} from 'react-native';
import styles from './HeaderWithImage.style';

interface IHeaderWithImage {
  source: any;
  leftIcon?: any;
  rightIcon?: any;
  leftIconPress?: () => void;
  rightIconPress?: () => void;
}
export default function HeaderWithImage(props: IHeaderWithImage) {
  const {source, leftIcon, rightIcon, leftIconPress, rightIconPress} = props;
  return (
    <ImageBackground source={source} style={styles.containerImage}>
      <View style={styles.containerCircle}>
        {leftIcon ? (
          <TouchableOpacity
            onPress={() => {
              leftIconPress();
            }}
            style={styles.circle}>
            {leftIcon}
          </TouchableOpacity>
        ) : (
          <View />
        )}
        {rightIcon ? (
          <TouchableOpacity
            onPress={() => rightIconPress()}
            style={styles.circle}>
            {rightIcon}
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    </ImageBackground>
  );
}
