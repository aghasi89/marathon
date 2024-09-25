import {IFilter} from '../../types/types';
import {MealTypes} from '../costants';
export interface IMeal {
  id: number;
  title: string;
  imageUrl: string;
  amount: string;
  saleType: string;
  type: string;
}
export interface IMeals {
  title: string;
  imageUrl: string;
  count: string;
  amount: string;
  type: string;
}
export interface IList {
  id: number;
  title: string;
}
export interface IMealDetail {
  imageUrl: string;
  title: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  meals: Array<IMeals>;
  list: Array<IList>;
  description: string;
}

interface IInitialState {
  mealList: Array<IMeal>;
  filterList: Array<IFilter>;
  mealSelectedFilterList: Array<IFilter>;
  mealDetail: IMealDetail;
}
export const initialState: IInitialState = {
  mealList: [
    {
      id: 0,
      title: 'Best Steak Marinade in Existence',
      imageUrl:
        'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
      amount: '200 kcal',
      saleType: 'Soy Free',
      type: 'Salad',
    },
    {
      id: 1,
      title: 'Best Steak Marinade in Existence',
      imageUrl:
        'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
      amount: '200 kcal',
      saleType: 'Soy Free',
      type: 'Salad',
    },
    {
      id: 2,
      title: 'Best Steak Marinade in Existence',
      imageUrl:
        'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
      amount: '200 kcal',
      saleType: 'Soy Free',
      type: 'Salad',
    },
  ],
  filterList: [
    {id: 0, title: 'Abs'},
    {id: 1, title: 'Quadriceps'},
    {id: 2, title: 'Chaest'},
    {id: 3, title: 'Back'},
    {id: 4, title: 'Calves'},
    {id: 5, title: 'Forearms'},
    {id: 6, title: 'Triceps'},
    {id: 7, title: 'Shoulders'},
  ],
  mealSelectedFilterList: [],
  mealDetail: {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
    title: 'Meal Name',
    calories: 40,
    carbs: 20,
    protein: 10,
    fat: 12,
    meals: [
      {
        title: "Chef John's Grilled",
        imageUrl:
          'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
        count: '1 portion',
        amount: '200 kcal',
        type: 'Salad',
      },
      {
        title: "Chef John's Grilled",
        imageUrl:
          'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
        count: '1 portion',
        amount: '200 kcal',
        type: 'Salad',
      },
    ],
    list: [
      {title: 'French', id: 1},
      {title: 'Gluten Free', id: 2},
      {title: 'Egg Free', id: 3},
    ],
    description:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised.',
  },
};
const mealReducer = (state = initialState, action) => {
  switch (action.type) {
    case MealTypes.SET_SELECTED_FILTER:
      return {
        ...state,
        mealSelectedFilterList: action.payload,
      };
    default:
      return state;
  }
};
export default mealReducer;
