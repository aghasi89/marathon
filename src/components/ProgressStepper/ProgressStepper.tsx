import React from 'react';
import {Text, View, ViewStyle} from 'react-native';
import styles from './ProgressStepper.style';

type Props = {
  steps: string[];
  selectedStepIndex?: number;
  containerStyle?:ViewStyle|ViewStyle[]
};

const ProgressStepper: React.VFC<Props> = ({steps, selectedStepIndex = 0,containerStyle}) => {
  return (
    <View style={containerStyle}>
      <View style={styles.stepsContainer}>
        {steps.map((step, index) => {
          return (
            index===selectedStepIndex-1?
            <View key={index} style={styles.stepItemContainer}>
              <Text
                style={ styles.selectedStepText}
                numberOfLines={1}>
                {step}
              </Text>
            </View>:null
          );
        })}
      </View>
      <View style={styles.stepsProgressBackground}>
        <View
          style={[
            styles.stepsProgress,
            {width: `${(selectedStepIndex / steps.length) * 100}%`},
          ]}></View>
      </View>
    </View>
  );
};
export default ProgressStepper;
