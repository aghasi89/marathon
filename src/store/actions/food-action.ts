import { IAmount, ICategory, IFood, ITag } from '../../types/types';
import { FoodTypes } from '../costants';

export const setFoodSelectedFilterList = (payload: any) => {
  return {
    type: FoodTypes.SET_SELECTED_FILTER,
    payload,
  };
};

export const getFoods = () => {
  return {
    type: FoodTypes.GET_FOODS,
  };
};

export const setFoods = (payload: Array<IFood>) => {
  return {
    type: FoodTypes.SET_FOODS,
    payload,
  };
};

export const createFood = (payload: IFood, cb: () => void) => {
  return {
    type: FoodTypes.CREATE_FOOD,
    payload,
    cb
  };
};

export const deleteFood = (payload: number, cb: () => void) => {
  return {
    type: FoodTypes.DELETE_FOOD,
    payload,
    cb
  };
};

export const editFood = (payload: IFood, cb: () => void) => {
  return {
    type: FoodTypes.EDIT_FOOD,
    payload,
    cb
  };
};

export const getFoodsCategories = () => {
  return {
    type: FoodTypes.GET_FOODS_CATEGORIES,
  };
};

export const setFoodsCategories = (payload: Array<ICategory>) => {
  return {
    type: FoodTypes.SET_FOODS_CATEGORIES,
    payload,
  };
};

export const getFoodsTags = () => {
  return {
    type: FoodTypes.GET_FOODS_TAGS,
  };
};

export const setFoodsTags = (payload: Array<ITag>) => {
  return {
    type: FoodTypes.SET_FOODS_TAGS,
    payload,
  };
};

export const getFoodsAmounts = () => {
  return {
    type: FoodTypes.GET_FOODS_AMOUNTS,
  };
};

export const setFoodsAmounts = (payload: Array<IAmount>) => {
  return {
    type: FoodTypes.SET_FOODS_AMOUNTS,
    payload,
  };
};

export const selectedFoodItem = (payload: IFood) => {
  return {
    type: FoodTypes.SELECTED_FOOD_ITEM,
    payload,
  };
};