import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icons from '../../../assets/icons/svg/index';
import { calcWidth } from '../../../assets/dimensions';
import { primaryBlack } from '../../../assets/styles/colors.styles';
import styles from './SelectRole.styles';
import SelectRoleHook from './SelectRole-hook';

type Props = {};

const SelectRole: React.FC<Props> = (props) => {
  const {
    t,
    handlePress,
    handleBack
  } = SelectRoleHook()

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icons.ArrowIcon fill={primaryBlack} />
        </TouchableOpacity>
        <View style={styles.container}>

          <View style={styles.bodyContainer}>
            <Icons.Marathon />
            <View style={styles.middleComponent}>
              <Text style={styles.selectRoleDescription}>{t('chooseRole')}</Text>
              <View style={styles.rowContainer}>
                <TouchableOpacity onPress={() => { handlePress('coach') }} style={styles.button}>
                  <Icons.LoginCoach />
                  <Text style={styles.text}>{t('coach')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { handlePress('client') }} style={[styles.button, { marginLeft: calcWidth(32) }]}>
                  <Icons.LoginUser />
                  <Text style={styles.text}>{t('user')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default SelectRole;
