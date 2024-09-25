import React from 'react';
import { Image, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Icons from "../../../../assets/icons/svg";
import styles from './BackgroundImage.style';

interface IProps {
  imageUrl?: string,
  scrollValue: Animated.SharedValue<number>;
}

const BackgroundImage: React.FC<IProps> = (props) => {

  const { imageUrl, scrollValue } = props

  const headerContainerAnimatedStyle = useAnimatedStyle(() => {
    return { height: interpolate(scrollValue.value, [0, 150], [207, 103], Extrapolate.CLAMP), marginTop: interpolate(scrollValue.value, [0, 150], [0, 103], Extrapolate.CLAMP) };
  });

  return (
    <Animated.View style={headerContainerAnimatedStyle}>
     { imageUrl?<Image
        source={{ uri: imageUrl}}
        style={styles.backgroundImage}
        resizeMode='cover'
      />:
        <View style={[styles.backgroundImage,styles.altImageContainer]}>
          <Icons.Image  {...styles.altImage}/>
        </View>
      }
    </Animated.View>
  );
};
export default BackgroundImage;

