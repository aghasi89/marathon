import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {ITag} from '../../../../../types/types';
import CreateDayPlanReducer from './CreateDayPlan-reducer';

export default props => {
  const {state, dispatchState} = CreateDayPlanReducer();

  const multiSelectList = [
    {id: 0, title: 'Abs'},
    {id: 1, title: 'Quadriceps'},
    {id: 2, title: 'Chaest'},
    {id: 3, title: 'Back'},
    {id: 4, title: 'Calves'},
    {id: 5, title: 'Forearms'},
    {id: 6, title: 'Triceps'},
    {id: 7, title: 'Shoulders'},
  ];

  const [selectedTags, setSelectedTags] = useState<Array<ITag>>([]);
  const [isVisibleTag, setIsVisibleTag] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string>('1');
  const [valueNumber, setValueNumber] = useState<string>('');
  const route = useRoute<any>();
  const foods = route.params?.foods ?? [];
  const recipeList = route.params?.recipeList ?? [];
  const mealList = route.params?.mealList ?? [];
  const index = route.params?.index ?? null;

  useEffect(() => {
    if (mealList.length > 0 || recipeList.length > 0 || foods.length > 0) {
      switch (index) {
        case 0:
          dispatchState({
            type: 'SET_BREAKFAST',
            payload: {mealList: mealList, foods: foods, recipeList: recipeList},
          });
          break;
        case 1:
          dispatchState({
            type: 'SET_LUNCH',
            payload: {mealList: mealList, foods: foods, recipeList: recipeList},
          });
          break;
        case 2:
          dispatchState({
            type: 'SET_DINNER',
            payload: {mealList: mealList, foods: foods, recipeList: recipeList},
          });
          break;
        case 3:
          dispatchState({
            type: 'SET_SNACKS',
            payload: {mealList: mealList, foods: foods, recipeList: recipeList},
          });
          break;
        default:
          break;
      }
    }
  }, [mealList, index, recipeList, foods]);

  const checksetSelectedTags = (selectedItem: any) => {
    for (let index = 0; index < selectedTags.length; index++) {
      if (selectedTags[index].id === selectedItem.id) {
        let list = [...selectedTags];
        list.splice(index, 1);
        dispatchState({type: 'SET_SELECTED_TAGS', payload: list});
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
        dispatchState({type: 'SET_SELECTED_TAGS', payload: list});
      }
    }
  };

  const deleteFood = (index: number, keyIndex: number) => {
    switch (keyIndex) {
      case 0:
        let list = [...state.brackfast.foods];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_BREAKFAST',
          payload: {...state.brackfast, foods: list},
        });
        break;
      case 1:
        list = [...state.lunch.foods];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_LUNCH',
          payload: {...state.lunch, foods: list},
        });
        break;
      case 2:
        list = [...state.dinner.foods];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_DINNER',
          payload: {...state.dinner, foods: list},
        });
        break;
      default:
        list = [...state.snacks.foods];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_SNACKS',
          payload: {...state.snacks, foods: list},
        });
        break;
    }
  };
  const deleteRecipe = (index: number, keyIndex: number) => {
    switch (keyIndex) {
      case 0:
        let list = [...state.brackfast.recipeList];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_BREAKFAST',
          payload: {...state.brackfast, recipeList: list},
        });
        break;
      case 1:
        list = [...state.lunch.recipeList];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_LUNCH',
          payload: {...state.lunch, recipeList: list},
        });
        break;
      case 2:
        list = [...state.dinner.recipeList];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_DINNER',
          payload: {...state.dinner, recipeList: list},
        });
        break;
      default:
        list = [...state.snacks.recipeList];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_SNACKS',
          payload: {...state.snacks, recipeList: list},
        });
        break;
    }
  };
  const deleteMeal = (index: number, keyIndex: number) => {
    switch (keyIndex) {
      case 0:
        let list = [...state.brackfast.mealList];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_BREAKFAST',
          payload: {...state.brackfast, mealList: list},
        });
        break;
      case 1:
        list = [...state.lunch.mealList];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_LUNCH',
          payload: {...state.lunch, mealList: list},
        });
        break;
      case 2:
        list = [...state.dinner.mealList];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_DINNER',
          payload: {...state.dinner, mealList: list},
        });
        break;
      default:
        list = [...state.snacks.mealList];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_SNACKS',
          payload: {...state.snacks, mealList: list},
        });
        break;
    }
  };
  return {
    multiSelectList,
    state,
    dispatchState,
    isVisibleTag,
    setIsVisibleTag,
    deleteTagsItem,
    checksetSelectedTags,
    isOpen,
    setIsOpen,
    selectedText,
    setSelectedText,
    valueNumber,
    setValueNumber,
    deleteFood,
    deleteRecipe,
    deleteMeal,
  };
};
