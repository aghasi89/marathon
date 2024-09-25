import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  primaryBlack,
  primaryWhite,
} from '../../../../../assets/styles/colors.styles';
import Icons from '../../../../../assets/icons/svg/index';
import BottomBar from '../../../../../components/bottomBar/BottomBar';
import MainHeader from '../../../../../components/headers/mainHeader/MainHeader';
import MultiSelectSelectedChips from '../../../../../components/multiSelect/MultiSelectSelectedChips';
import TabBadges from '../../../../../components/TabBadges/TabBadges';
import {IFood} from '../../../../../store/reducers/food-reducer';
import styles from './ImportFood.style';
import ImportFoodList from './ImportFoodList';
import ImportFoodHook from './ImportFood-hook';

const ImportFood: React.FC<any> = ({navigation}) => {
  const {
    badges,
    addFood,
    state,
    checkIsSubmitedFood,
    foodSelectedFilterList,
    deleteItem,
    foodList,
    isFocus,
    setIsfocus,
    searchText,
    filterText,
    indexTab,
    setIndexTab,
  } = ImportFoodHook(navigation);
  const leftIconPress = () => {
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, backgroundColor: primaryWhite}}>
      <View style={styles.container}>
        <MainHeader
          title={'Import Food'}
          search={true}
          open={isFocus}
          onFocus={() => setIsfocus(true)}
          onBlur={() => setIsfocus(false)}
          onChangeText={filterText}
          inputValue={searchText}
          leftComponent={
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('FilterNutrition', {index: 1});
              }}>
              <Icons.Filter fill={primaryBlack} />
            </TouchableOpacity>
          }
          leftIcon={true}
          leftIconPress={leftIconPress}
        />
        {foodSelectedFilterList.length > 0 ? (
          <View style={styles.item}>
            <MultiSelectSelectedChips
              list={foodSelectedFilterList}
              onDelete={deleteItem}
            />
          </View>
        ) : (
          <TabBadges
            data={badges}
            index={indexTab}
            setIndex={value => {
              setIndexTab(value);
            }}
          />
        )}
        <ImportFoodList
          foodList={foodList}
          addFood={(food: IFood) => addFood(food)}
          checkIsSubmited={(id: number) => checkIsSubmitedFood(id)}
        />
      </View>
      <BottomBar
        count={state.isSubmitedFoods.length}
        onImport={() => {
          navigation.navigate('CreateRecipe', {foods: state.isSubmitedFoods});
        }}
        onPressMenu={() => {}}
        buttonType={'close'}
      />
    </View>
  );
};
export default ImportFood;
