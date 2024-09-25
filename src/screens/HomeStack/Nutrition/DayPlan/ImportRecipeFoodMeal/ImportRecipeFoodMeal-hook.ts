import {useRoute} from '@react-navigation/native';
import {useEffect, useReducer, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setFoodSelectedFilterList} from '../../../../../store/actions/food-action';
import {setMealSelectedFilterList} from '../../../../../store/actions/meal-action';
import {setRecipeSelectedFilterList} from '../../../../../store/actions/recipe-action';
import {IFood} from '../../../../../store/reducers/food-reducer';
import {IMeal} from '../../../../../store/reducers/meal-reducer';
import {IRecipe} from '../../../../../store/reducers/recipe-reducer';
import {
  foodListSelector,
  foodSelectedFilterListSelector,
} from '../../../../../store/selectors/food-selector';
import {
  mealListSelector,
  mealSelectedFilterListSelector,
} from '../../../../../store/selectors/meal-selector';
import {
  recipeListSelector,
  recipeSelectedFilterListSelector,
} from '../../../../../store/selectors/recipe-selector';
import {IFilter} from '../../../../../types/types';
import ImportRecipeFoodMealReducer from './ImportRecipeFoodMeal-reducer';

export default props => {
  const {state, dispatchState} = ImportRecipeFoodMealReducer();
  const badges = [
    {
      title: 'Recent',
    },
    {
      title: 'Library',
    },
    {
      title: 'Bookmarks',
    },
  ];
  const dispatch = useDispatch();
  const route = useRoute<any>();
  const indexKey = route.params?.index ?? null;

  const checkIsSubmitedFood = (id: number) => {
    for (let index = 0; index < state.isSubmitedFoods.length; index++) {
      const isSubmitedFood = state.isSubmitedFoods[index];
      if (isSubmitedFood.id == id) {
        return true;
      }
    }
    return false;
  };
  const checkIsSubmitedRecipe = (id: number) => {
    for (let index = 0; index < state.isSubmitedRecipes.length; index++) {
      const isSubmitedRecipe = state.isSubmitedRecipes[index];
      if (isSubmitedRecipe.id == id) {
        return true;
      }
    }
    return false;
  };

  const checkIsSubmitedMeal = (id: number) => {
    for (let index = 0; index < state.isSubmitedMeals.length; index++) {
      const isSubmitedMeal = state.isSubmitedMeals[index];
      if (isSubmitedMeal.id == id) {
        return true;
      }
    }
    return false;
  };
  const addFood = (food: IFood) => {
    if (!checkIsSubmitedFood(food.id)) {
      dispatchState({
        type: 'SET_ADD_FOOD',
        payload: [...state.isSubmitedFoods, food],
      });
    } else {
      let array = [...state.isSubmitedFoods];
      const findIndex = array.findIndex(element => {
        return element.id == food.id;
      });
      array.splice(findIndex, 1);
      dispatchState({type: 'SET_ADD_FOOD', payload: array});
    }
  };

  const addRecipe = (recipe: IRecipe) => {
    if (!checkIsSubmitedRecipe(recipe.id)) {
      dispatchState({
        type: 'SET_ADD_RECIPE',
        payload: [...state.isSubmitedRecipes, recipe],
      });
    } else {
      let array = [...state.isSubmitedRecipes];
      const findIndex = array.findIndex(element => {
        return element.id == recipe.id;
      });
      array.splice(findIndex, 1);
      dispatchState({
        type: 'SET_ADD_RECIPE',
        payload: array,
      });
    }
  };
  const addMeal = (meal: IMeal) => {
    if (!checkIsSubmitedMeal(meal.id)) {
      dispatchState({
        type: 'SET_ADD_MEAL',
        payload: [...state.isSubmitedMeals, meal],
      });
    } else {
      let array = [...state.isSubmitedMeals];
      const findIndex = array.findIndex(element => {
        return element.id == meal.id;
      });
      array.splice(findIndex, 1);
      dispatchState({
        type: 'SET_ADD_MEAL',
        payload: array,
      });
    }
  };

  const [isFocus, setIsfocus] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>();
  const [index, setIndex] = useState<number>(0);
  const [indexTab, setIndexTab] = useState<number>(0);
  const filterText = text => {
    setSearchText(text);
  };

  const foodList = useSelector(foodListSelector);
  const recipeList = useSelector(recipeListSelector);
  const mealList = useSelector(mealListSelector);

  const recipeSelectedFilterList = useSelector(
    recipeSelectedFilterListSelector,
  );
  const foodSelectedFilterList = useSelector(foodSelectedFilterListSelector);
  const mealSelectedFilterList = useSelector(mealSelectedFilterListSelector);
  const [selectedData, setSelectedData] = useState<Array<IFilter>>([]);

  const selectedFilterList: any = () => {
    switch (index) {
      case 0:
        return recipeSelectedFilterList;
      case 1:
        return foodSelectedFilterList;
      case 2:
        return mealSelectedFilterList;
      default:
        break;
    }
  };
  useEffect(() => {
    setSelectedData(selectedFilterList());
  }, [index, selectedFilterList]);

  const deleteItem = (value: any) => {
    for (let i = 0; i < selectedData.length; i++) {
      if (selectedData[i].id === value.id) {
        let list = [...selectedData];
        list.splice(i, 1);
        switch (index) {
          case 0:
            dispatch(setRecipeSelectedFilterList(list));
            break;
          case 1:
            dispatch(setFoodSelectedFilterList(list));
            break;
          case 2:
            dispatch(setMealSelectedFilterList(list));
            break;
          default:
            break;
        }
      }
    }
  };

  return {
    badges,
    addFood,
    addRecipe,
    addMeal,
    state,
    checkIsSubmitedFood,
    checkIsSubmitedRecipe,
    checkIsSubmitedMeal,
    selectedData,
    deleteItem,
    index,
    setIndex,
    recipeList,
    foodList,
    mealList,
    isFocus,
    setIsfocus,
    searchText,
    filterText,
    indexTab,
    setIndexTab,
    indexKey,
  };
};
