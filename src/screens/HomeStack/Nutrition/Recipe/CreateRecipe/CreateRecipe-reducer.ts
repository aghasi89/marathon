import {useReducer} from 'react';
import {IFood} from '../../../../../store/reducers/food-reducer';
import {IList} from '../../../../../store/reducers/recipe-reducer';
import {IAction, ITag} from '../../../../../types/types';

interface IinitialState {
  foodImageUrl: string;
  foodName: string;
  selectedGram: string;
  valueNumber: string;
  valueKcal: string;
  checked: boolean;
  selectedItems: Array<IList>;
  carbsValue: string;
  proteinValue: string;
  fatValue: string;
  steps: Array<any>;
  selectedCategories: Array<ITag>;
  selectedTags: Array<ITag>;
  typeValue: string;
  foods: Array<IFood>;
  measurement: IList;
}

export default () => {
  const listForMultiSelect = [
    {id: 0, title: 'Gram'},
    {id: 1, title: 'Percent'},
  ];

  const initialState = {
    foodImageUrl: '',
    foodName: '',
    selectedGram: '1',
    valueNumber: '0',
    valueKcal: '0',
    checked: true,
    selectedItems: [listForMultiSelect[0]],
    carbsValue: '0',
    proteinValue: '0',
    fatValue: '0',
    steps: [],
    selectedCategories: [],
    selectedTags: [],
    typeValue: '',
    foods: [],
    measurement: listForMultiSelect[0],
  };

  function reducer(state: IinitialState, action: IAction) {
    switch (action.type) {
      case 'SET_FOOD_IMAGE_URL':
        return {...state, foodImageUrl: action.payload};
      case 'SET_FOOD_NAME':
        return {...state, foodName: action.payload};
      case 'SET_SELECTED_ITEMS':
        return {...state, selectedGram: action.payload};
      case 'SET_VALUE_NUMBER':
        return {...state, valueNumber: action.payload};
      case 'SET_VALUE_KCAL':
        return {...state, valueKcal: action.payload};
      case 'SET_VALUE_CHECKED':
        return {...state, checked: action.payload};
      case 'SET_SELECTED_ITEMS':
        return {...state, selectedItems: action.payload};
      case 'SET_CARBS_VALUE':
        return {...state, carbsValue: action.payload};
      case 'SET_PROTEIN_VALUE':
        return {...state, proteinValue: action.payload};
      case 'SET_FAT_VALUE':
        return {...state, fatValue: action.payload};
      case 'SET_STEPS':
        return {...state, steps: action.payload};
      case 'SET_SELECTED_CATEGORIES':
        return {...state, selectedCategories: action.payload};
      case 'SET_SELECTED_TAGS':
        return {...state, selectedTags: action.payload};
      case 'SET_TYPE_VALUE':
        return {...state, typeValue: action.payload};
      case 'SET_FOODS':
        return {...state, foods: action.payload};
      case 'SET_MEASUREMENT':
        return {...state, measurement: action.payload};
      default:
        throw new Error();
    }
  }
  const [state, dispatchState] = useReducer(reducer, initialState);
  return {
    listForMultiSelect,
    state,
    dispatchState,
  };
};
