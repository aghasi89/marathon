import React from 'react';
import {View, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Icons from '../../../../../../../assets/icons/svg/index';
import TextInputComponent from '../../../../../../../components/textInput/TextInputComponent';
import TextWithIcon from '../../../../../../../components/textWithicon/TextWithIcon';
import {formFieldGrey} from '../../../../../../../assets/styles/colors.styles';
import {PrimeryButton} from '../../../../../../../components/buttons';
import {NavigationParamList} from '../../../../..';
import hook from './GroupMarathonStepperScreen4-hook';
import styles from './GroupMarathonStepperScreen4.style';

type Props = NativeStackScreenProps<NavigationParamList, 'CreateGroupMarathon'>;

const GroupMarathonStepperScreen4: React.FC = () => {
  const navigation = useNavigation<Props['navigation']>();
  const {deleteInput, addQuestion, changeInputValue, inputList} =
    hook(navigation);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Question fill={formFieldGrey} />}
            text={'Questions'}
          />
        </View>
        {inputList.map(item => {
          return (
            <View key={item.id} style={styles.rowContainer}>
              <View style={styles.textInputContainer}>
                <TextInputComponent
                  value={item.value + ''}
                  rightIcon={true}
                  onChangetext={(value: string) => {
                    changeInputValue(item.id, value);
                  }}
                  close={() => {
                    deleteInput(item.id);
                  }}
                />
              </View>
            </View>
          );
        })}
        <View style={styles.buttnConteiner}>
          <PrimeryButton
            title="Add Question"
            type="outline"
            onPress={() => {
              addQuestion();
            }}
            style={styles.button}
            Icon={<View />}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default GroupMarathonStepperScreen4;
