import React from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { calcWidth } from '../../assets/dimensions';
import Icons from '../../assets/icons/svg/index';
import SocialLoginHook from './SocialLogin-hook';
import styles from './SocialLogin.style';


const SocialLogin: React.FC = () => {

  const {
    t,
    signInWithGoogle,
    signInWithFacebook,
    signInWithApple
  } = SocialLoginHook()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('signInWith')}</Text>
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={signInWithGoogle} style={styles.socialButton}>
          <Icons.Google />
        </TouchableOpacity>
        <TouchableOpacity onPress={signInWithFacebook} style={[styles.socialButton, { marginHorizontal: calcWidth(20) }]}>
          <Icons.FacebookSocial />
        </TouchableOpacity>
        {
          Platform.OS == 'ios' && <TouchableOpacity onPress={signInWithApple} style={styles.socialButton}>
            <Icons.Apple />
          </TouchableOpacity>
        }
      </View>
    </View>
  );
};
export default SocialLogin;
