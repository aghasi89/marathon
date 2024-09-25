import React from 'react';
import {View, Text} from 'react-native';
import {
  primaryBlack,
  primaryBlue,
} from '../../../../assets/styles/colors.styles';
import BottomButtonGroup from '../../../../components/buttonGroup/BottomButtonGroup';
import MainHeader from '../../../../components/headers/mainHeader/MainHeader';
import MultiSelectChips from '../../../../components/multiSelect/MultiSelectChips';
import FilterHook from './Filter-hook';
import styles from './Filter.style';

const FilterPrograms: React.FC<any> = ({navigation}) => {
  const {
    isFocus,
    setIsfocus,
    searchText,
    filterText,
    filterList,
    selectedFilterList,
    checksetSelectedItems,
  } = FilterHook();
  const leftIconPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <MainHeader
        leftIconPress={leftIconPress}
        leftIcon={true}
        title={'Filter'}
        open={isFocus}
        onFocus={() => setIsfocus(true)}
        onBlur={() => setIsfocus(false)}
        onChangeText={filterText}
        inputValue={searchText}
        leftComponentStyle={styles.leftComponentStyle}
        leftComponent={
          <View>
            <Text style={styles.leftComponentText}>Create New</Text>
          </View>
        }
      />
      <View style={styles.multiSelectContainer}>
        <MultiSelectChips
          list={filterList}
          selectedItems={selectedFilterList}
          onPressItem={value => {
            checksetSelectedItems(value);
          }}
        />
      </View>
      <View style={styles.buttonGroupContainer}>
        <BottomButtonGroup
          firstTitle="Clear All"
          secondTitle="Apply"
          onFirstButtonPress={() => {}}
          onSecondButtonPress={() => {}}
          firstTitleColor={primaryBlack}
          secondTitleColor={primaryBlue}
        />
      </View>
    </View>
  );
};
export default FilterPrograms;
