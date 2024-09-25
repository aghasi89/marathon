import {FoodTypes} from '../costants';
export interface IFood {
  id: number;
  title: string;
  image: string;
  weight: number;
  kcal: number;
}
export interface IFilterFood {
  id: number;
  title: string;
}
export interface IFoodDetail {
  title: string;
  weightList: Array<any>;
  count: number;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  list: Array<any>;
  description: string;
  image: string;
}
interface IInitialState {
  foodList: Array<IFood>;
  filterList: Array<IFilterFood>;
  foodSelectedFilterList: Array<IFilterFood>;
  foodDetail: IFoodDetail;
}
export const initialState: IInitialState = {
  foodList: undefined,
  filterList: [
    { id: 0, title: 'Abs' },
    { id: 1, title: 'Quadriceps' },
    { id: 2, title: 'Chaest' },
    { id: 3, title: 'Back' },
    { id: 4, title: 'Calves' },
    { id: 5, title: 'Forearms' },
    { id: 6, title: 'Triceps' },
    { id: 7, title: 'Shoulders' },
  ],
  foodSelectedFilterList: [],
  selectedFoodItem: undefined,
  foodsCategories: undefined,
  foodsTags: undefined,
  foodsAmounts: undefined
};
const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case FoodTypes.SET_SELECTED_FILTER:
      return {
        ...state,
        foodSelectedFilterList: action.payload,
      };
    case FoodTypes.SET_FOODS:
      return {
        ...state,
        foodList: action.payload,
      };
    case FoodTypes.SELECTED_FOOD_ITEM:
      return {
        ...state,
        selectedFoodItem: action.payload,
      };
    case FoodTypes.SET_FOODS_CATEGORIES:
      return {
        ...state,
        foodsCategories: action.payload,
      };
    case FoodTypes.SET_FOODS_TAGS:
      return {
        ...state,
        foodsTags: action.payload,
      };
    case FoodTypes.SET_FOODS_AMOUNTS:
      return {
        ...state,
        foodsAmounts: action.payload,
      };
    default:
      return state;
  }
};
export default foodReducer;
