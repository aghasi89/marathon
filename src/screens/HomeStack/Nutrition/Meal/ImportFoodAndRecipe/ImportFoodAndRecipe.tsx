import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icons from '../../../../../assets/icons/svg/index';
import {
  primaryBlack,
  primaryBlue,
} from '../../../../../assets/styles/colors.styles';
import MainHeader from '../../../../../components/headers/mainHeader/MainHeader';
import TabNavigationHeader from '../../../../../components/headers/tabNavigationHeader/TabNavigationHeader';
import TabBadges from '../../../../../components/TabBadges/TabBadges';
import MultiSelectSelectedChips from '../../../../../components/multiSelect/MultiSelectSelectedChips';
import BottomBar from '../../../../../components/bottomBar/BottomBar';
import {IRecipe} from '../../../../../store/reducers/recipe-reducer';
import {IFood} from '../../../../../store/reducers/food-reducer';
import ImportRecipeList from '../../Recipe/ImportRecipeList/ImportRecipeList';
import ImportFoodList from '../../Food/ImportFood/ImportFoodList';
import ImportFoodAndRecipeHook from './ImportFoodAndRecipe-hook';
import styles from './ImportFoodAndRecipe.style';

const chiprGroupItems = [
  {
    title: 'Recipe',
    icon: <Icons.Recipe fill={primaryBlack} />,
    selectedIcon: <Icons.Recipe fill={primaryBlue} />,
  },
  {
    title: 'Food',
    icon: <Icons.Food fill={primaryBlack} />,
    selectedIcon: <Icons.Food fill={primaryBlue} />,
  },
];

const ImportFoodAndRecipe: React.FC<any> = ({navigation}) => {
  const {
    badges,
    addFood,
    addRecipe,
    state,
    checkIsSubmitedFood,
    checkIsSubmitedRecipe,
    selectedData,
    deleteItem,
    index,
    setIndex,
    recipeList,
    foodList,
    isFocus,
    setIsfocus,
    searchText,
    filterText,
    indexTab,
    setIndexTab,
  } = ImportFoodAndRecipeHook(navigation);
  const renderComponent = () => {
    switch (index) {
      case 0:
        return (
          <ImportRecipeList
            recipeList={recipeList}
            addRecipe={(recipe: IRecipe) => addRecipe(recipe)}
            checkIsSubmited={(id: number) => checkIsSubmitedRecipe(id)}
          />
        );
      case 1:
        return (
          <ImportFoodList
            foodList={foodList}
            addFood={(food: IFood) => addFood(food)}
            checkIsSubmited={(id: number) => checkIsSubmitedFood(id)}
          />
        );
      default:
    }
  };

  return (
    <View style={styles.container}>
      <MainHeader
        title={index === 0 ? 'Import Recipe' : 'Import Food'}
        search={true}
        open={isFocus}
        onFocus={() => setIsfocus(true)}
        onBlur={() => setIsfocus(false)}
        onChangeText={filterText}
        inputValue={searchText}
        leftComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('FilterNutrition', {index: index});
            }}>
            <Icons.Filter fill={primaryBlack} />
          </TouchableOpacity>
        }
        leftIcon={true}
        leftIconPress={() => {
          navigation.goBack();
        }}
      />
      <TabNavigationHeader
        data={chiprGroupItems}
        index={index}
        setIndex={value => {
          setIndex(value);
        }}
      />
      {selectedData.length > 0 ? (
        <View style={styles.dataItem}>
          <MultiSelectSelectedChips
            list={selectedData}
            onDelete={(value: any) => {
              deleteItem(value);
            }}
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
      {renderComponent()}
      <BottomBar
        count={state.isSubmitedFoods.length + state.isSubmitedRecipes.length}
        onImport={() => {
          navigation.navigate('CreateMeal', {
            foods: state.isSubmitedFoods,
            recipeList: state.isSubmitedRecipes,
          });
        }}
        onPressMenu={() => {}}
        buttonType={'close'}
      />
    </View>
  );
};
export default ImportFoodAndRecipe;
