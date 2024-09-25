import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Image} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icons from '../../../../../../assets/icons/svg/index';
import MainHeader from '../../../../../../components/headers/mainHeader/MainHeader';
import TextWithIcon from '../../../../../../components/textWithicon/TextWithIcon';
import {primaryBlack} from '../../../../../../assets/styles/colors.styles';
import Check from '../../../../../../components/check/Check';
import {NavigationParamList} from '../../../..';
import styles from './SelectLanguage.style';
import Hook from './SelectLanguage-hook';

type Props = NativeStackScreenProps<NavigationParamList, 'SelectLanguage'>;

const SelectLanguage: React.FC = () => {
  const navigation = useNavigation<Props['navigation']>();
  const {
    searchText,
    filterText,
    languages,
    onLanguageSelect,
    leftIconPress,
    onSaveSelectedLanguages,
    search,
  } = Hook(navigation);
  return (
    <View style={styles.container}>
      <MainHeader
        leftIconPress={leftIconPress}
        leftIcon={true}
        title={'Select Languages'}
        leftComponent={
          <TouchableOpacity onPress={onSaveSelectedLanguages}>
            <Text style={styles.save}>Save</Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={searchText}
          style={styles.textInput}
          onChangeText={filterText}
          placeholder="search language"
        />
        <TouchableOpacity style={styles.closeButton}>
          <Icons.SearchIcon fill={primaryBlack} />
        </TouchableOpacity>
      </View>
      {languages.map(item => {
        if (search(item)) {
          return (
            <View key={item.id} style={styles.rowContainer}>
              <TextWithIcon
                icon={
                  <Image source={{uri: item.icon}} style={styles.flagIcons} />
                }
                text={item.title}
              />
              <Check
                isSubmited={item.checked}
                onPress={() => {
                  onLanguageSelect(item);
                }}
              />
            </View>
          );
        }
      })}
    </View>
  );
};
export default SelectLanguage;
