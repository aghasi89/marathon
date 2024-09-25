import React from 'react';
import {Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import {
  lightPeriwinkle,
  primaryBlue,
  red,
} from '../../assets/styles/colors.styles';
import styles from './SliderComponent.style';
import {useTranslation} from 'react-i18next';

interface IProps {
  onValueChange: (data: number) => void;
  lable: string;
  value: string;
  minCount: number;
  maxCount: number;
  progressCount: number;
  sliderValue?: string;
  isInvalid?: boolean;
}

const SliderComponent: React.FC<IProps> = props => {
  const {
    onValueChange,
    value,
    lable,
    minCount,
    maxCount,
    sliderValue,
    isInvalid,
  } = props;
  const {t} = useTranslation();
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if(minutes>0 || remainingSeconds>0) {
      return `${minutes > 0 ? minutes + ' ' + t('minutes') : ''} ${
        remainingSeconds > 0 ? remainingSeconds + ' ' + t('seconds') : ''
      }`;
    } else return `0 ${t('seconds')}`
  };
  return (
    <View>
      <View style={styles.globalContainer}>
        <Text style={styles.text}>{lable}</Text>
        <Text style={styles.text}>{formatTime(+value)}</Text>
      </View>
      <Slider
        value={parseInt(sliderValue ?? '0')}
        style={styles.container}
        minimumValue={minCount}
        maximumValue={maxCount}
        maximumTrackTintColor={isInvalid ? red : lightPeriwinkle}
        minimumTrackTintColor={primaryBlue}
        step={5}
        thumbTintColor={primaryBlue}
        onValueChange={data => {
          onValueChange(data);
        }}
      />
    </View>
  );
};
export default SliderComponent;
