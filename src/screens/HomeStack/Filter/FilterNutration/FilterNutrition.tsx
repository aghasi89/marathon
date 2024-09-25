import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {
  primaryBlack,
  primaryBlue,
} from '../../../../assets/styles/colors.styles';
import styles from './Filter.style';
import MainHeader from '../../../../components/headers/mainHeader/MainHeader';
import MultiSelectChips from '../../../../components/multiSelect/MultiSelectChips';
import FilterHook from './Filter-hook';
import BottomButtonGroup from '../../../../components/buttonGroup/BottomButtonGroup';

const Filter: React.FC<any> = ({navigation}) => {
  const [isFocus, setIsfocus] = useState(false);
  const [searchText, setSearchText] = useState();
  const {data, selectedData, checksetSelectedItems} = FilterHook(navigation);
  const filterText = text => {
    setSearchText(text);
  };
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
          list={data}
          selectedItems={selectedData}
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
export default Filter;
