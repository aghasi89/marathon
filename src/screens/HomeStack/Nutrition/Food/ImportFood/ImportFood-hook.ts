import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setFoodSelectedFilterList} from '../../../../../store/actions/food-action';
import {IFood} from '../../../../../store/reducers/food-reducer';
import {
  foodListSelector,
  foodSelectedFilterListSelector,
} from '../../../../../store/selectors/food-selector';
import ImportFoodReducer from './ImportFood-reducer';

export default props => {
  const {state, dispatchState} = ImportFoodReducer();
  const dispatch = useDispatch();
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
  const foodList = useSelector(foodListSelector);
  const foodSelectedFilterList = useSelector(foodSelectedFilterListSelector);

  const deleteItem = (value: any) => {
    for (let index = 0; index < foodSelectedFilterList.length; index++) {
      if (foodSelectedFilterList[index].id === value.id) {
        let list = [...foodSelectedFilterList];
        list.splice(index, 1);
        dispatch(setFoodSelectedFilterList(list));
      }
    }
  };
  const checkIsSubmitedFood = (id: number) => {
    for (let index = 0; index < state.isSubmitedFoods.length; index++) {
      const isSubmitedFood = state.isSubmitedFoods[index];
      if (isSubmitedFood.id == id) {
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

  const [isFocus, setIsfocus] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>();
  const [indexTab, setIndexTab] = useState<number>(0);
  const filterText = text => {
    setSearchText(text);
  };

  return {
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
  };
};
