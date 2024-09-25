import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './Check.style';
import Icons from '../../assets/icons/svg/index';
import {primaryBlue, primaryWhite} from '../../assets/styles/colors.styles';
import {calcHeight} from '../../assets/dimensions';

type Props = {
  onPress: () => void;
  isSubmited?: boolean;
  isDoing?: boolean;
};
const Check: React.FC<Props> = ({onPress, isSubmited, isDoing}) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.container}>
      {isSubmited ? (
        <View style={styles.selected}>
          <Icons.Ceck fill={primaryBlue} width={calcHeight(15)} />
        </View>
      ) : isDoing ? (
        <View style={styles.doing}>
          <Icons.CeckBlue fill={primaryWhite} width={calcHeight(15)} />
        </View>
      ) : (
        <View style={styles.circleContainer} />
      )}
    </TouchableOpacity>
  );
};
export default Check;
