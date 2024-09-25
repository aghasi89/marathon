import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import CreateRecipeReducer from './CreateRecipe-reducer';

export default () => {
  const {listForMultiSelect, state, dispatchState} = CreateRecipeReducer();
  const weightList = [
    {
      value: '0',
      lable: 'Whole (250g)',
    },
    {
      value: '1',
      lable: 'Whole (100g)',
    },
    {
      value: '2',
      lable: 'Whole (20g)',
    },
  ];

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
  const [selectedText, setSelectedText] = useState<string>('1');
  const [valueNumber, setValueNumber] = useState<string>('');
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
  const route = useRoute<any>();
  const foods = route.params?.foods ?? [];

  const [isVisibleCategory, setIsVisibleCategory] = useState<boolean>(false);
  const [isVisibleTag, setIsVisibleTag] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    foods.length > 0 && dispatchState({type: 'SET_FOODS', payload: foods});
  }, [foods]);

  const checksetSelectedCategories = (selectedItem: any) => {
    for (let index = 0; index < state.selectedCategories.length; index++) {
      if (state.selectedCategories[index].id === selectedItem.id) {
        let list = [...state.selectedCategories];
        list.splice(index, 1);
        dispatchState({type: 'SET_SELECTED_CATEGORIES', payload: list});
        return;
      }
    }
    dispatchState({
      type: 'SET_SELECTED_CATEGORIES',
      payload: [...state.selectedCategories, selectedItem],
    });
  };
  const deleteFood = (index: number) => {
    let list = [...state.foods];
    list.splice(index, 1);
    dispatchState({type: 'SET_FOODS', payload: list});
  };
  const deleteCategoriesItem = (value: any) => {
    for (let index = 0; index < state.selectedCategories.length; index++) {
      if (state.selectedCategories[index].id === value.id) {
        let list = [...state.selectedCategories];
        list.splice(index, 1);
        dispatchState({type: 'SET_SELECTED_CATEGORIES', payload: list});
      }
    }
  };
  const checksetSelectedTags = (selectedItem: any) => {
    for (let index = 0; index < state.selectedTags.length; index++) {
      if (state.selectedTags[index].id === selectedItem.id) {
        let list = [...state.selectedTags];
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
  const onChangeText = (text: any, index: string | number) => {
    let stepArray = [...state.steps];
    stepArray[index] = text;
    dispatchState({type: 'SET_STEPS', payload: stepArray});
  };
  const deleteStep = (index: number) => {
    let stepArray = [...state.steps];
    stepArray.splice(index, 1);
    dispatchState({type: 'SET_STEPS', payload: stepArray});
  };
  return {
    weightList,
    listForMultiSelect,
    multiSelectList,
    state,
    dispatchState,
    onChangeText,
    deleteStep,
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
    list,
    selectedText,
    setSelectedText,
    valueNumber,
    setValueNumber,
    deleteFood,
  };
};
