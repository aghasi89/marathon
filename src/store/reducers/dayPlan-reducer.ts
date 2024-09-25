import {DayPlanTypes} from '../costants';
export interface IDayPlan {
  id: number;
  title: string;
  imageUrl: string;
  amount: string;
  saleType: string;
  type: string;
}

export interface IFilterDayPlan {
  id: number;
  title: string;
}

export interface IDayPlanDetail {
  imageUrl: string;
  title: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  list: Array<any>;
  description: string;
}
interface IInitialState {
  dayPlanList: Array<IDayPlan>;
  filterList: Array<IFilterDayPlan>;
  dayPlanSelectedFilterList: Array<IFilterDayPlan>;
  dayPlanDetail: IDayPlanDetail;
}

export const initialState: IInitialState = {
  dayPlanList: [
    {
      id: 0,
      title: 'Day Plan Name',
      imageUrl:
        'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
      amount: '1240 kcal',
      saleType: 'Soy Free',
      type: 'Salad',
    },
    {
      id: 1,
      title: 'Day Plan Name',
      imageUrl:
        'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
      amount: '2600 kcal',
      saleType: 'Soy Free',
      type: 'Salad',
    },
    {
      id: 2,
      title: 'Day Plan Name',
      imageUrl:
        'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
      amount: '2600 kcal',
      saleType: 'Soy Free',
      type: 'Salad',
    },
  ],

  dayPlanDetail: {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
    title: 'Day Plan Name',
    calories: 40,
    carbs: 20,
    protein: 10,
    fat: 12,
    list: [{title: 'French'}, {title: 'Gluten Free'}, {title: 'Egg Free'}],
    description:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised.',
  },

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
  dayPlanSelectedFilterList: [],
};

const dayPlanReducer = (state = initialState, action) => {
  switch (action.type) {
    case DayPlanTypes.SET_SELECTED_FILTER:
      return {
        ...state,
        dayPlanSelectedFilterList: action.payload,
      };
    default:
      return state;
  }
};
export default dayPlanReducer;
