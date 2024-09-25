import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './BottomBarLeftAndRight.styles';

type Props = {
  count: number;
  total: number;
  onPressBack: () => void;
  onPressNext: () => void;
  isDisable?: boolean;
};
const BottomBarLeftAndRight: React.FC<Props> = ({
  count,
  total,
  onPressBack,
  onPressNext,
  isDisable,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.circles}
        onPress={onPressBack}
        disabled={isDisable}>
        <Text style={styles.buttonText}> {'<'}</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.countText}>
          Exercise {count} of {total}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.circles}
        onPress={onPressNext}
        disabled={isDisable}>
        <Text style={styles.buttonText}> {'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default BottomBarLeftAndRight;
