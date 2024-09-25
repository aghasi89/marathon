import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DashboardHook from './Dashboard-hook';
import styles from './Dashboard.style';

const DashboardScreen: React.FC = () => {
  const {
    navigateToHome
  } = DashboardHook()

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={navigateToHome}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};
export default DashboardScreen;
