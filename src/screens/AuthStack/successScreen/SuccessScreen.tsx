import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icons from '../../../assets/icons/svg/index';
import { PrimeryButton } from '../../../components/buttons';
import { primaryBlack } from '../../../assets/styles/colors.styles';
import styles from './SuccessScreen.styles';
import SuccessScreenHook from './SuccessScreen-hook';

type Props = {};

const SuccessScreen: React.FC<Props> = (props) => {
  const {
    email,
    type,
    t,
    goSignInScreen
  } = SuccessScreenHook()

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <TouchableOpacity onPress={goSignInScreen} style={styles.backButton}>
          <Icons.ArrowIcon fill={primaryBlack} />
        </TouchableOpacity>
        <View style={styles.bodyContainer}>
          <Icons.Marathon />
          <View style={styles.middleComponent}>
            <Text style={styles.resetPasspordDescription}>{type === "Registration" ? t('succesScreenForRegistr') : t('succesScreenDescription')}</Text>
            <Text style={styles.email}>{email}</Text>
            <PrimeryButton
              title={t('close') ?? ""}
              onPress={goSignInScreen}
              type={'default'}
              style={styles.buttonStyle}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default SuccessScreen;
