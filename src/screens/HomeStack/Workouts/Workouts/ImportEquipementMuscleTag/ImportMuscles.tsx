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

const ImportMuscles: React.FC<any> = ({navigation}) => {
  const {state, muscleList, checkIsSubmitedMuscle, addMuscle, type} =
    Hook(navigation);
  const leftIconPress = () => navigation.goBack();
  const onSecondButtonPress = () => {
    navigation.navigate(
      type === 'workout' ? 'CreateWorkout' : 'CreateExercise',
      {muscleList: state.isSubmitedMuscles},
    );
  };
  return (
    <View style={styles.container}>
      <MainHeader
        leftIconPress={leftIconPress}
        leftIcon={true}
        title={'Muscles'}
      />
      <View style={styles.multiSelectContainer}>
        <MultiSelectChips
          list={muscleList}
          selectedItems={state.isSubmitedMuscles}
          onPressItem={value => {
            checkIsSubmitedMuscle(value);
            addMuscle(value);
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
export default ImportMuscles;
