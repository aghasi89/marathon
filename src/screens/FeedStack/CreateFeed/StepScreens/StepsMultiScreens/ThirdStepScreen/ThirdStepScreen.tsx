import React from 'react';
import { View, Text } from 'react-native';
import CommunicateTypeButtons from '../../../components/CommunicateTypeButtons/CommunicateTypeButtons';
import hook from './ThirdStepScreen.hook';
import styles from './ThirdStepScreen.style';

const ThirdStepScreen: React.FC = () => {
  const { t, state, communicateSelectHandle, selectedFeed } = hook();
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('createGroupOrChannel')}</Text>
      </View>
      <CommunicateTypeButtons
        containerStyle={styles.buttonsContainer}
        onPress={communicateSelectHandle}
        selectedType={state.chat_type ?? 'group'}
        disabled={selectedFeed ? true : false}
      />
    </View>
  );
};
export default ThirdStepScreen;
