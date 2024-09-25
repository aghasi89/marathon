import { takeLatest, all, put } from 'redux-saga/effects';
import foods from '../../services/api/routes/foods';
import { setFoods, setFoodsAmounts, setFoodsCategories, setFoodsTags } from '../actions/food-action';
import { FoodTypes } from '../costants';

function* getFoods() {
  try {
    const foodsList = yield foods.getFoods();
    yield put(setFoods(foodsList))
  } catch (ex) {
    console.log(ex, "error");
  }
}
function* createFood({ payload, cb }) {
  try {
    yield foods.createFood(payload);
    cb()
  } catch (ex) {
    console.log(ex, "error");
  }
}
function* deleteFood({ payload, cb }) {
  try {
    yield foods.deleteFood(payload);
    cb()
  } catch (ex) {
    console.log(ex, "error");
  }
}
function* editFood({ payload, cb }) {
  try {
    yield foods.editFood(payload);
    cb()
  } catch (ex) {
    console.log(ex, "error");
  }
}
function* getFoodsCategories() {
  try {
    const foodsCategoriesList = yield foods.foodsCategories();
    yield put(setFoodsCategories(foodsCategoriesList))
  } catch (ex) {
    console.log(ex, "error");
  }
}
function* getFoodsTags() {
  try {
    const foodsTagsList = yield foods.foodsTags();
    yield put(setFoodsTags(foodsTagsList))
  } catch (ex) {
    console.log(ex, "error");
  }
}
function* getFoodsAmounts() {
  try {
    const foodsAmountsList = yield foods.foodsAmounts();
    yield put(setFoodsAmounts(foodsAmountsList))
  } catch (ex) {
    console.log(ex, "error");
  }
}

export function* watchFoods() {
  yield all([
    takeLatest(FoodTypes.GET_FOODS as any, getFoods),
    takeLatest(FoodTypes.CREATE_FOOD as any, createFood),
    takeLatest(FoodTypes.DELETE_FOOD as any, deleteFood),
    takeLatest(FoodTypes.EDIT_FOOD as any, editFood),
    takeLatest(FoodTypes.GET_FOODS_CATEGORIES as any, getFoodsCategories),
    takeLatest(FoodTypes.GET_FOODS_TAGS as any, getFoodsTags),
    takeLatest(FoodTypes.GET_FOODS_AMOUNTS as any, getFoodsAmounts),
  ]);
}