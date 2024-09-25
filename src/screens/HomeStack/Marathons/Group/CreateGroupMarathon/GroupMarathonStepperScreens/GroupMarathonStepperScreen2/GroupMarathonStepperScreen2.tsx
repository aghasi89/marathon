import React from 'react';
import {View, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SwitchComponenet from '../../../../../../../components/switch/SwitchComponenet';
import TextWithIcon from '../../../../../../../components/textWithicon/TextWithIcon';
import { formFieldGrey } from '../../../../../../../assets/styles/colors.styles';
import Icons from '../../../../../../../assets/icons/svg/index';
import { NavigationParamList } from '../../../../..';
import hook from './GroupMarathonStepperScreen2-hook'
import styles from './GroupMarathonStepperScreen2.style';

type Props = NativeStackScreenProps<NavigationParamList, 'CreateGroupMarathon'>;

const GroupMarathonStepperScreen2: React.FC= () => {
  const navigation=useNavigation<Props['navigation']>()
  const {
    state,
    onChangeNutrition,
    onChangeTraining,
    onChangeGroupChat,
    onChangeUserMeasurements}=hook()

  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.rowContainer}>
        <TextWithIcon
            icon={<Icons.Nutrition fill={formFieldGrey} />}
            text={'Nutrition'}
          />
           <SwitchComponenet
          checked={state.isNutritionSelected??false}
          setChecked={onChangeNutrition}
        />
        </View>
        <View style={styles.rowContainer}>
        <TextWithIcon
            icon={<Icons.Trainer fill={formFieldGrey} />}
            text={'Training'}
          />
           <SwitchComponenet
          checked={state.isTraningSelected??false}
          setChecked={onChangeTraining}
        />
        </View>
        <View style={styles.rowContainer}>
        <TextWithIcon
            icon={<Icons.Message fill={formFieldGrey} />}
            text={'Group Chat'}
          />
           <SwitchComponenet
          checked={state.isGroupChatSelected??false}
          setChecked={onChangeGroupChat}
        />
        </View>
        <View style={styles.rowContainer}>
        <TextWithIcon
            icon={<Icons.MusclesIcon fill={formFieldGrey} />}
            text={'User Measurements'}
          />
           <SwitchComponenet
          checked={state.isMeasurementsSelected??false}
          setChecked={onChangeUserMeasurements}
        />
        </View>
      </ScrollView>
    </View>
  );
};
export default GroupMarathonStepperScreen2;
