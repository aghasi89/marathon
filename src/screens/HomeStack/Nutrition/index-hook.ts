import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setDayPlanSelectedFilterList} from '../../../store/actions/datPlan-action';
import {setFoodSelectedFilterList} from '../../../store/actions/food-action';
import {setMealSelectedFilterList} from '../../../store/actions/meal-action';
import {setRecipeSelectedFilterList} from '../../../store/actions/recipe-action';
import {dayPlanSelectedFilterListSelector} from '../../../store/selectors/dayPlan-selector';
import {foodSelectedFilterListSelector} from '../../../store/selectors/food-selector';
import {mealSelectedFilterListSelector} from '../../../store/selectors/meal-selector';
import {recipeSelectedFilterListSelector} from '../../../store/selectors/recipe-selector';

export default props => {
  const dispatch = useDispatch();
  const [isFocus, setIsfocus] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>();
  const [index, setIndex] = useState<number>(0);
  const [indexTab, setIndexTab] = useState<number>(0);
  const filterText = text => {
    setSearchText(text);
  };
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
  const recipeSelectedFilterList = useSelector(
    recipeSelectedFilterListSelector,
  );
  const foodSelectedFilterList = useSelector(foodSelectedFilterListSelector);
  const mealSelectedFilterList = useSelector(mealSelectedFilterListSelector);
  const dayPlanSelectedFilterList = useSelector(
    dayPlanSelectedFilterListSelector,
  );
  const [selectedData, setSelectedData] = useState([]);

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
          case 3:
            dispatch(setDayPlanSelectedFilterList(list));
            break;
          default:
            break;
        }
      }
    }
  };

  return {
    isFocus,
    setIsfocus,
    searchText,
    setSearchText,
    index,
    setIndex,
    indexTab,
    setIndexTab,
    filterText,
    badges,
    selectedData,
    deleteItem,
  };
};
