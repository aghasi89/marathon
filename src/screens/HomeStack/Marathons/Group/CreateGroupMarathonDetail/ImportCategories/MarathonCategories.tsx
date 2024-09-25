import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {
  primaryBlack,
  primaryBlue,
} from '../../../../../../assets/styles/colors.styles';
import MultiSelectChips from '../../../../../../components/multiSelect/MultiSelectChips';
import BottomButtonGroup from '../../../../../../components/buttonGroup/BottomButtonGroup';
import MainHeader from '../../../../../../components/headers/mainHeader/MainHeader';
import {NavigationParamList} from '../../../..';
import Hook from './MarathonCategories-hook';
import styles from './MarathonCategories.style';

type Props = NativeStackScreenProps<NavigationParamList, 'CreateGroupMarathon'>;

const MarathonCategories: React.FC = () => {
  const navigation = useNavigation<Props['navigation']>();
  const {
    leftIconPress,
    onApply,
    onCategorySelect,
    selectrdCategories,
    onClearAll,
    categoryList,
  } = Hook(navigation);

  return (
    <View style={styles.container}>
      <MainHeader
        leftIconPress={leftIconPress}
        leftIcon={true}
        title={'Categories'}
        leftComponent={
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.save}>Create New</Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.multiSelectContainer}>
        <MultiSelectChips
          list={categoryList ? categoryList : []}
          selectedItems={selectrdCategories}
          onPressItem={onCategorySelect}
        />
      </View>
      <View style={styles.buttonGroupContainer}>
        <BottomButtonGroup
          firstTitle="Clear All"
          secondTitle="Apply"
          onFirstButtonPress={onClearAll}
          onSecondButtonPress={onApply}
          firstTitleColor={primaryBlack}
          secondTitleColor={primaryBlue}
        />
      </View>
    </View>
  );
};
export default MarathonCategories;
