import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './NoConnection.style';

const NoConnectionScreen: React.FC = () => {  
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>No internet connection</Text>
      <Image style={styles.gifStyle} source={require("../../assets/images/NoInternet.gif")}/>
    </View>
  );
};
export default NoConnectionScreen;
