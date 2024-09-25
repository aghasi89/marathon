import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {primaryBlack} from '../../../../assets/styles/colors.styles';
import {calcHeight} from '../../../../assets/dimensions';
import Icons from '../../../../assets/icons/svg/index';
import MainHeader from '../../../../components/headers/mainHeader/MainHeader';
import MultiSelectChips from '../../../../components/multiSelect/MultiSelectChips';
import EditSheet from '../../../../components/editSheet/EditSheet';
import {NavigationParamList} from '../..';
import styles from './Specialities.style';
import Hook from './Specialities-hook';

type Props = NativeStackScreenProps<NavigationParamList, 'Specialities'>;

const Specialities: React.FC<Props> = ({navigation}) => {
  const {
    state,
    checkIsSubmited,
    addSpeciality,
    searchText,
    filterText,
    leftIconPress,
    isOpen,
    setIsOpen,
  } = Hook(navigation);

  const editSheet = [
    {
      title: 'Discard changes',
      onSelect: () => {
        setIsOpen(false);
      },
      Icon: <Icons.Close fill={primaryBlack} />,
    },
    {
      title: 'Save changes',
      onSelect: () => {
        setIsOpen(false);
        leftIconPress();
      },
      Icon: <Icons.CheckIcon fill={primaryBlack} />,
    },
  ];

  return (
    <View style={styles.container}>
      <MainHeader
        leftIconPress={leftIconPress}
        leftIcon={true}
        title={'Select Specialities'}
        leftComponent={
          <TouchableOpacity
            onPress={() => {
              setIsOpen(true);
            }}>
            <Text style={styles.save}>Save</Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={searchText}
          style={styles.textInput}
          onChangeText={filterText}
          placeholder="search specialities"
        />
        <TouchableOpacity style={styles.closeButton}>
          <Icons.SearchIcon fill={primaryBlack} />
        </TouchableOpacity>
      </View>
      <View style={styles.multiSelectContainer}>
        <MultiSelectChips
          list={state.specialities}
          selectedItems={state.selectedList}
          onPressItem={value => {
            checkIsSubmited(value);
            addSpeciality(value);
          }}
        />
      </View>
      <EditSheet
        isVisible={isOpen}
        height={calcHeight(220)}
        onClose={() => setIsOpen(false)}
        list={editSheet}
      />
    </View>
  );
};
export default Specialities;
