import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setFoodSelectedFilterList} from '../../../../../store/actions/food-action';
import {setRecipeSelectedFilterList} from '../../../../../store/actions/recipe-action';
import {IFood} from '../../../../../store/reducers/food-reducer';
import {IRecipe} from '../../../../../store/reducers/recipe-reducer';
import {
  foodListSelector,
  foodSelectedFilterListSelector,
} from '../../../../../store/selectors/food-selector';
import {
  recipeListSelector,
  recipeSelectedFilterListSelector,
} from '../../../../../store/selectors/recipe-selector';
import ImportFoodAndRecipeReducer from './ImportFoodAndRecipe-reducer';

export default props => {
  const {state, dispatchState} = ImportFoodAndRecipeReducer();
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
  const dispatch = useDispatch();
  const [isFocus, setIsfocus] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>();
  const [index, setIndex] = useState<number>(0);
  const [indexTab, setIndexTab] = useState<number>(0);
  const filterText = text => {
    setSearchText(text);
  };
  const foodList = useSelector(foodListSelector);
  const recipeList = useSelector(recipeListSelector);
  const recipeSelectedFilterList = useSelector(
    recipeSelectedFilterListSelector,
  );
  const foodSelectedFilterList = useSelector(foodSelectedFilterListSelector);
  const [selectedData, setSelectedData] = useState([]);

  const selectedFilterList = () => {
    switch (index) {
      case 0:
        return recipeSelectedFilterList;
      case 1:
        return foodSelectedFilterList;
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
  };
};
