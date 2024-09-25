import React from 'react';
import {View, Text, ViewStyle, Pressable} from 'react-native';
import {useTranslation} from 'react-i18next';
import styles from './StepperButtonsComponent.style';

type Props = {
  containerStyle?: ViewStyle | ViewStyle[];
  onPress: (action: 'previous' | 'next') => void;
  disabled?:boolean
};

const StepperButtonsComponent: React.VFC<Props> = ({
  containerStyle,
  onPress,
  disabled
}) => {
  const {t} = useTranslation();
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.buttons}>
        <Pressable
        disabled={disabled}
          style={styles.backButton}
          onPress={() => onPress('previous')}>
          <Text style={[styles.buttonTitle, styles.backButtonText]}>
            {t('previous')}
          </Text>
        </Pressable>
        <View style={styles.emptyView} />
        <Pressable  disabled={disabled} style={styles.applyButton} onPress={() => onPress('next')}>
          <Text style={[styles.buttonTitle, styles.applyButtonText]}>
            {t('next')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
export default StepperButtonsComponent;
