import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {formFieldGrey} from '../../assets/styles/colors.styles';
import Icons from '../../assets/icons/svg/index';
import SliderLine from '../sliderLine/SliderLine';
import styles from './RestCard.style';

type Props = {
  value: number;
  setValue: any;
  restTime?: string;
  setCount?: number;
  restCount: number;
  onPressDelete: () => void;
  onPressCopy: () => void;
};
const RestCard: React.FC<Props> = ({
  restTime,
  setCount,
  restCount,
  onPressDelete,
  onPressCopy,
  value,
  setValue,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRowContainer}>
        <Text style={styles.textTitle}>{restCount} Rest</Text>
        <TouchableOpacity>
          <Text style={styles.textTime}>{restTime}</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <TouchableOpacity>
            <Icons.DuplicateIcon fill={formFieldGrey} onPress={onPressCopy} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.close} onPress={onPressDelete}>
            <Icons.Close fill={formFieldGrey} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <SliderLine
          value={value}
          setValue={setValue}
          maximumValue={100}
          minimumValue={0}
          step={1}
        />
      </View>
    </View>
  );
};
export default RestCard;
