import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setDayPlanSelectedFilterList} from '../../../../store/actions/datPlan-action';
import {setFoodSelectedFilterList} from '../../../../store/actions/food-action';
import {setMealSelectedFilterList} from '../../../../store/actions/meal-action';
import {setRecipeSelectedFilterList} from '../../../../store/actions/recipe-action';
import {
  dayPlanFilterListSelector,
  dayPlanSelectedFilterListSelector,
} from '../../../../store/selectors/dayPlan-selector';
import {
  foodFilterListSelector,
  foodSelectedFilterListSelector,
} from '../../../../store/selectors/food-selector';
import {
  mealFilterListSelector,
  mealSelectedFilterListSelector,
} from '../../../../store/selectors/meal-selector';
import {
  recipeFilterListSelector,
  recipeSelectedFilterListSelector,
} from '../../../../store/selectors/recipe-selector';

export default props => {
  const dispatch = useDispatch();
  const route = useRoute<any>();
  const index = route.params?.index ?? null;
  const recipeFilterList = useSelector(recipeFilterListSelector);
  const foodFilterList = useSelector(foodFilterListSelector);
  const mealFilterList = useSelector(mealFilterListSelector);
  const dayPlanFilterList = useSelector(dayPlanFilterListSelector);
  const recipeSelectedFilterList = useSelector(
    recipeSelectedFilterListSelector,
  );
  const foodSelectedFilterList = useSelector(foodSelectedFilterListSelector);
  const mealSelectedFilterList = useSelector(mealSelectedFilterListSelector);
  const dayPlanSelectedFilterList = useSelector(
    dayPlanSelectedFilterListSelector,
  );

  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const filterList = () => {
    switch (index) {
      case 0:
        return recipeFilterList;
      case 1:
        return foodFilterList;
      case 2:
        return mealFilterList;
      case 3:
        return dayPlanFilterList;
      default:
        break;
    }
  };

  const selectedFilterList = () => {
    switch (index) {
      case 0:
        return recipeSelectedFilterList;
      case 1:
        return foodSelectedFilterList;
      case 2:
        return mealSelectedFilterList;
      case 3:
        return dayPlanSelectedFilterList;
      default:
        break;
    }
  };
  useEffect(() => {
    setData(filterList());
    setSelectedData(selectedFilterList());
  }, [index, selectedFilterList, filterList]);

  const checksetSelectedItems = (selectedItem: any) => {
    for (let i = 0; i < selectedData.length; i++) {
      if (selectedData[i].id === selectedItem.id) {
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
          case 3:
            dispatch(setDayPlanSelectedFilterList(list));
            break;
          default:
            break;
        }
        return;
      }
    }
    switch (index) {
      case 0:
        dispatch(setRecipeSelectedFilterList([...selectedData, selectedItem]));
        break;
      case 1:
        dispatch(setFoodSelectedFilterList([...selectedData, selectedItem]));
        break;
      case 2:
        dispatch(setMealSelectedFilterList([...selectedData, selectedItem]));
        break;
      case 3:
        dispatch(setDayPlanSelectedFilterList([...selectedData, selectedItem]));
        break;
      default:
        break;
    }
  };
  return {
    data,
    selectedData,
    checksetSelectedItems,
  };
};
