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
  const {state, tagList, checkIsSubmitedTag, addTag, type} = Hook(navigation);
  const leftIconPress = () => navigation.goBack();
  const onSecondButtonPress = () => {
    navigation.navigate(
      type === 'workout' ? 'CreateWorkout' : 'CreateExercise',
      {tagList: state.isSubmitedTags},
    );
  };
  return (
    <View style={styles.container}>
      <MainHeader
        leftIconPress={leftIconPress}
        leftIcon={true}
        title={'Tags'}
      />
      <View style={styles.multiSelectContainer}>
        <MultiSelectChips
          list={tagList}
          selectedItems={state.isSubmitedTags}
          onPressItem={value => {
            checkIsSubmitedTag(value);
            addTag(value);
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
