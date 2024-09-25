import React from 'react';
import {View} from 'react-native';
import {
  primaryBlack,
  primaryBlue,
} from '../../../../../assets/styles/colors.styles';
import MainHeader from '../../../../../components/headers/mainHeader/MainHeader';
import MultiSelectChips from '../../../../../components/multiSelect/MultiSelectChips';
import BottomButtonGroup from '../../../../../components/buttonGroup/BottomButtonGroup';
import styles from './ImportEquipement.style';
import Hook from './Imports-hook';

const ImportEquipement: React.FC<any> = ({navigation}) => {
  const {
    state,
    equipementList,
    addEquipement,
    checkIsSubmitedEquipement,
    type,
  } = Hook(navigation);
  const leftIconPress = () => navigation.goBack();
  const onSecondButtonPress = () => {
    navigation.navigate(
      type === 'workout' ? 'CreateWorkout' : 'CreateExercise',
      {equipementList: state.isSubmitedEquipements},
    );
  };

  return (
    <View style={styles.container}>
      <MainHeader
        leftIconPress={leftIconPress}
        leftIcon={true}
        title={'Equipements'}
      />
      <View style={styles.multiSelectContainer}>
        <MultiSelectChips
          list={equipementList}
          selectedItems={state.isSubmitedEquipements}
          onPressItem={value => {
            checkIsSubmitedEquipement(value);
            addEquipement(value);
          }}
        />
      </View>
      <View style={styles.buttonGroupContainer}>
        <BottomButtonGroup
          firstTitle="Clear All"
          secondTitle="Apply"
          onFirstButtonPress={() => {}}
          onSecondButtonPress={onSecondButtonPress}
          firstTitleColor={primaryBlack}
          secondTitleColor={primaryBlue}
        />
      </View>
    </View>
  );
};
export default ImportEquipement;
