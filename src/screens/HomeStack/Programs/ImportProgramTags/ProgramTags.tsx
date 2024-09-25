import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {
  primaryBlack,
  primaryBlue,
} from '../../../../assets/styles/colors.styles';
import Icons from '../../../../assets/icons/svg/index';
import MainHeader from '../../../../components/headers/mainHeader/MainHeader';
import MultiSelectChips from '../../../../components/multiSelect/MultiSelectChips';
import BottomButtonGroup from '../../../../components/buttonGroup/ButtonGroup';
import styles from './ProgramTag.style';
import Hook from './ProgramTag-hook';

const ProgramTags: React.FC<any> = ({navigation}) => {
  const {state, tagList, checkIsSubmitedTag, addTag, searchText, filterText} =
    Hook(navigation);

  const leftIconPress = () => {
    navigation.goBack();
  };
  const onSecondButtonPress = () => {
    navigation.navigate('CreateProgram', {tagList: state.isSubmitedTags});
  };
  return (
    <View style={styles.container}>
      <MainHeader
        leftIconPress={leftIconPress}
        leftIcon={true}
        title={'Select Program Tags'}
        leftComponent={
          <TouchableOpacity
            onPress={() => {
              //setIsOpen(true);
            }}>
            <Text style={styles.save}>Create New</Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={searchText}
          style={styles.textInput}
          onChangeText={filterText}
          placeholder="search"
        />
        <TouchableOpacity style={styles.closeButton}>
          <Icons.SearchIcon fill={primaryBlack} />
        </TouchableOpacity>
      </View>
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
export default ProgramTags;
