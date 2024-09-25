import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {ITag} from '../../../../../types/types';
import CreateMealReducer from './CreateMeal-reducer';

export default () => {
  const {state, dispatchState} = CreateMealReducer();
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
  const list = [
    {
      value: '1',
      lable: 'Gram 1',
      image: {
        uri: 'https://c8.alamy.com/zooms/9/4d76e5d5579640bcb9300af816a2c771/2acmw09.jpg',
      },
    },
    {
      value: '2',
      lable: 'Gram 2',
      image: {
        uri: 'https://c8.alamy.com/zooms/9/4d76e5d5579640bcb9300af816a2c771/2acmw09.jpg',
      },
    },
    {
      value: '3',
      lable: 'Gram 3',
      image: {
        uri: 'https://c8.alamy.com/zooms/9/4d76e5d5579640bcb9300af816a2c771/2acmw09.jpg',
      },
    },
    {
      value: '4',
      lable: 'Gram 4',
      image: {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      },
    },
    {
      value: '5',
      lable: 'Gram 5',
      image: {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      },
    },
  ];
  const [selectedTags, setSelectedTags] = useState<Array<ITag>>([]);
  const [isVisibleTag, setIsVisibleTag] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string>('1');
  const [valueNumber, setValueNumber] = useState<string>('');

  const route = useRoute<any>();
  const foods = route.params?.foods ?? [];
  const recipeList = route.params?.recipeList ?? [];

  useEffect(() => {
    foods.length > 0 && dispatchState({type: 'SET_FOODS', payload: foods});
  }, [foods]);
  useEffect(() => {
    recipeList.length > 0 &&
      dispatchState({type: 'SET_RECIPE_LIST', payload: recipeList});
  }, [recipeList]);
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
  const deleteFood = (index: number) => {
    let list = [...state.foods];
    list.splice(index, 1);
    dispatchState({type: 'SET_FOODS', payload: list});
  };
  const deleteRecipe = (index: number) => {
    let list = [...state.recipeList];
    list.splice(index, 1);
    dispatchState({type: 'SET_RECIPE_LIST', payload: list});
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
    list,
    selectedText,
    setSelectedText,
    valueNumber,
    setValueNumber,
    deleteFood,
    deleteRecipe,
  };
};
