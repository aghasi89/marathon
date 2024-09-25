import React from 'react';
import { Slider } from 'react-native-elements';
import {
  lightGrayBackround,
  primaryBlue,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import styles from './SliderLine.style';

export default function SliderLine(props) {
  const {
    value,
    setValue,
    maximumValue,
    minimumValue,
    step
  } = props;
  return (
    <Slider
      value={value}
      onValueChange={value => {
        setValue(value);
      }}
      maximumValue={maximumValue}
      minimumValue={minimumValue}
      step={step}
      allowTouchTrack
      trackStyle={styles.track}
      thumbStyle={styles.thumb}
      minimumTrackTintColor={primaryBlue}
      maximumTrackTintColor={lightGrayBackround}
      thumbTintColor={primaryWhite}
    />
  );
}
