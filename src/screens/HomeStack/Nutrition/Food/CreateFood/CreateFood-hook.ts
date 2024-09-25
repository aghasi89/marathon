import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFood, getFoods, getFoodsAmounts, getFoodsCategories, getFoodsTags } from '../../../../../store/actions/food-action';
import { foodsAmountsSelector, foodsCategoriesSelector, foodsTagsSelector } from '../../../../../store/selectors/food-selector';
import { IAmount, ICategory, ITag } from '../../../../../types/types';
import CreateFoodReducer from './CreateFood-reducer';

export default (navigation) => {
  const { state, dispatchState, listForMultiSelect } = CreateFoodReducer();
  const foodsCategories: Array<ICategory> = useSelector(foodsCategoriesSelector);
  const foodsTags: Array<ITag> = useSelector(foodsTagsSelector);
  const foodsAmounts: Array<IAmount> = useSelector(foodsAmountsSelector);
  const [selectedTags, setSelectedTags] = useState<Array<ITag>>([]);
  const [isVisibleCategory, setIsVisibleCategory] = useState<boolean>(false);
  const [isVisibleTag, setIsVisibleTag] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch()
  const checksetSelectedCategories = (selectedItem: any) => {
    for (let index = 0; index < state.selectedCategories.length; index++) {
      if (state.selectedCategories[index].id === selectedItem.id) {
        let list = [...state.selectedCategories];
        list.splice(index, 1);
        dispatchState({ type: 'SET_SELECTED_CATEGORIES', payload: list });
        return;
      }
    }
    dispatchState({
      type: 'SET_SELECTED_CATEGORIES',
      payload: [...state.selectedCategories, selectedItem],
    });
  };

  const deleteCategoriesItem = (value: any) => {
    for (let index = 0; index < state.selectedCategories.length; index++) {
      if (state.selectedCategories[index].id === value.id) {
        let list = [...state.selectedCategories];
        list.splice(index, 1);
        dispatchState({ type: 'SET_SELECTED_CATEGORIES', payload: list });
      }
    }
  };
  const checksetSelectedTags = (selectedItem: any) => {
    for (let index = 0; index < selectedTags.length; index++) {
      if (selectedTags[index].id === selectedItem.id) {
        let list = [...selectedTags];
        list.splice(index, 1);
        dispatchState({ type: 'SET_SELECTED_TAGS', payload: list });
        return;
      }
    }
    dispatchState({
      type: 'SET_SELECTED_TAGS',
      payload: [...state.selectedTags, selectedItem],
    });
  };
  const deleteTagsItem = (value: any) => {
    for (let index = 0; index < state.selectedTags.length; index++) {
      if (state.selectedTags[index].id === value.id) {
        let list = [...state.selectedTags];
        list.splice(index, 1);
        dispatchState({ type: 'SET_SELECTED_TAGS', payload: list });
      }
    }
  };
  useEffect(() => {
    dispatch(getFoodsCategories())
    dispatch(getFoodsTags())
    dispatch(getFoodsAmounts())
  }, [])
  const handleCreateFood = useCallback(() => {
    const payload = {
      image: state.foodImageUrl,
      food_name: state.foodName,
      kcal: state.valueKcal,
      amount: { ...state.selectedItems, value: state.valueNumber, },
      categories: state.selectedCategories,
      tags: state.selectedTags,
      amountType: state.measurement,
      carbs: state.carbsValue,
      protein: state.proteinValue,
      fat: state.fatValue,
      food_info: state.typeValue,
    }
    dispatch(createFood(payload, () => {
      setIsOpen(false);
      dispatch(getFoods())
      navigation.goBack()
    }))
  }, [state])
  return {
    foodsCategories,
    listForMultiSelect,
    foodsTags,
    foodsAmounts,
    state,
    dispatchState,
    isVisibleCategory,
    setIsVisibleCategory,
    deleteCategoriesItem,
    isVisibleTag,
    setIsVisibleTag,
    deleteTagsItem,
    checksetSelectedCategories,
    checksetSelectedTags,
    isOpen,
    setIsOpen,
    handleCreateFood
  };
};
