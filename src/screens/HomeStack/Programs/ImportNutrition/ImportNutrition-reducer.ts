import {useReducer} from 'react';
import {IDayPlan} from '../../../../store/reducers/dayPlan-reducer';
import {IFood} from '../../../../store/reducers/food-reducer';
import {IMeal} from '../../../../store/reducers/meal-reducer';
import {IRecipe} from '../../../../store/reducers/recipe-reducer';
import {IAction, ITag} from '../../../../types/types';

interface INutrition {
  recipes: Array<IRecipe>;
  foods: Array<IFood>;
  meals: Array<IMeal>;
  dayPlans: Array<IDayPlan>;
}

interface IinitialState {
  submitedNutritions: INutrition;
}

export default () => {
  const initialState = {
    submitedNutritions: {
      recipes: [],
      foods: [],
      meals: [],
      dayPlans: [],
    },
  };
  function reducer(state: IinitialState, action: IAction) {
    switch (action.type) {
      // case 'SET_ADD_NUTRITION':
      //   return {...state, submitedNutritions: action.payload};
      case 'SET_ADD_RECIPE':
        return {
          ...state,
          submitedNutritions: {
            ...state.submitedNutritions,
            recipes: action.payload,
          },
        };
      case 'SET_ADD_FOOD':
        return {
          ...state,
          submitedNutritions: {
            ...state.submitedNutritions,
            foods: action.payload,
          },
        };
      case 'SET_ADD_MEAL':
        return {
          ...state,
          submitedNutritions: {
            ...state.submitedNutritions,
            meals: action.payload,
          },
        };
      case 'SET_ADD_DAYPLAN':
        return {
          ...state,
          submitedNutritions: {
            ...state.submitedNutritions,
            dayPlans: action.payload,
          },
        };
      default:
        throw new Error();
    }
  }
  const [state, dispatchState] = useReducer(reducer, initialState);

  return {
    state,
    dispatchState,
  };
};
