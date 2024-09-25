import {RecipeTypes} from '../costants';
export interface IRecipe {
  id: number;
  title: string;
  imageUrl: string;
  count: string;
  amount: string;
  time: string;
  saleType: string;
  type: string;
}
export interface IFilterRecipe {
  id: number;
  title: string;
}
export interface IList {
  id: number;
  title: string;
}
export interface ISteps {
  title: string;
  text: string;
}
export interface IIngridients {
  id: number;
  title: string;
  weight: string;
}
export interface IRecipeDetail {
  imageUrl: string;
  title: string;
  weightList: Array<any>;
  count: number;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  list: Array<IList>;
  description: string;
  ingridients: Array<IIngridients>;
  steps: Array<ISteps>;
}
interface IInitialState {
  recipeList: Array<IRecipe>;
  filterList: Array<IFilterRecipe>;
  recipeSelectedFilterList: Array<IFilterRecipe>;
  recipeDetail: IRecipeDetail;
}
export const initialState: IInitialState = {
  recipeList: [
    {
      id: 0,
      title: 'Best Steak Marinade in Existence',
      imageUrl:
        'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
      count: '1 portion',
      amount: '200',
      time: '30 min',
      saleType: 'Soy Free',
      type: 'Salad',
    },
    {
      id: 1,

      title: 'Best Steak Marinade in Existence',
      imageUrl:
        'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
      count: '1 portion',
      amount: '200',
      time: '30 min',
      saleType: 'Soy Free',
      type: 'Salad',
    },
    {
      id: 2,

      title: 'Best Steak Marinade in Existence',
      imageUrl:
        'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
      count: '1 portion',
      amount: '200',
      time: '30 min',
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
  recipeSelectedFilterList: [],
  recipeDetail: {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
    title: 'Authentic Tacos al Pastor',
    weightList: [
      {
        value: '0',
        lable: 'Whole (250g)',
        image: {
          uri: 'https://c8.alamy.com/zooms/9/4d76e5d5579640bcb9300af816a2c771/2acmw09.jpg',
        },
      },
      {
        value: '1',
        lable: 'Whole (100g)',
        image: {
          uri: 'https://c8.alamy.com/zooms/9/4d76e5d5579640bcb9300af816a2c771/2acmw09.jpg',
        },
      },
      {
        value: '2',
        lable: 'Whole (20g)',
        image: {
          uri: 'https://c8.alamy.com/zooms/9/4d76e5d5579640bcb9300af816a2c771/2acmw09.jpg',
        },
      },
    ],
    count: 1,
    calories: 40,
    carbs: 20,
    protein: 10,
    fat: 12,
    list: [
      {title: '20 min', id: 0},
      {title: 'French', id: 1},
      {title: 'Gluten Free', id: 2},
      {title: 'Egg Free', id: 3},
    ],
    description:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised.',
    ingridients: [
      {
        id: 0,
        title: 'Potato',
        weight: '400g',
      },
      {
        id: 1,
        title: 'Corn',
        weight: '200g',
      },
      {
        id: 2,
        title: 'Tomat',
        weight: '400g',
      },
      {
        id: 3,
        title: 'Beef',
        weight: '300g',
      },
    ],
    steps: [
      {
        title: 'Step 1',
        text: 'Contrary to popular belasief, Lorem Ipsum is not simply random text. has roots in a piece of clasassical Latin literature from BC, making over 2000 years . Richard McCsasalintock, a Latin fessor at Hampden Sydney College in Virginia, looked up one of the mdfdore obscure.',
      },
      {
        title: 'Step 2',
        text: 'Contrary to popular belasief, Lorem Ipsum is not simply random text. has roots in a piece of clasassical Latin literature from BC, making over 2000 years . Richard McCsasalintock, a Latin fessor at Hampden Sydney College in Virginia, looked up one of the mdfdore obscure.',
      },
      {
        title: 'Step 3',
        text: 'Contrary to popular belasief, Lorem Ipsum is not simply random text. has roots in a piece of clasassical Latin literature from BC, making over 2000 years . Richard McCsasalintock, a Latin fessor at Hampden Sydney College in Virginia, looked up one of the mdfdore obscure.',
      },
    ],
  },
};
const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case RecipeTypes.SET_SELECTED_FILTER:
      return {
        ...state,
        recipeSelectedFilterList: action.payload,
      };
    default:
      return state;
  }
};
export default recipeReducer;
