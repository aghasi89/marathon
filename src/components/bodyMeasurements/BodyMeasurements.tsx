import React from 'react';
import {View, Text} from 'react-native';
import styles from './BodyMeasurements.style';

type Props = {
  name: string;
  measure: string;
  isRight?: boolean;
  isExist?: boolean;
};

const BodyMeasurements: React.FC<Props> = ({
  name,
  measure,
  isRight,
  isExist,
}) => {
  return (
    <View style={isRight ? styles.containerRight : styles.container}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>
        {isExist ? measure + ' cm' : '- - - - - - -'}
      </Text>
    </View>
  );
};
export default BodyMeasurements;
