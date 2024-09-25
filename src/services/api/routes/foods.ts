import authApi from '../authInstance';
import { IFood } from '../../../types/types';
import Window from '../../../server/server'

Window
class Foods {
  getFoods = async () => {
    try {
      const res = await authApi.get("/foods");
      return res.data.foods;
    } catch (ex) {
      throw ex.response.data
    }
  }
  createFood = async (requestBody: IFood) => {
    try {
      const res = await authApi.post("/foods", requestBody);
      return res.data;
    } catch (ex) {
      throw ex.response.data
    }
  }
  deleteFood = async (id: number) => {
    try {
      const res = await authApi.delete(`/foods/${id}`);
      return res.data;
    } catch (ex) {
      throw ex.response.data
    }
  }
  editFood = async (requestBody: IFood) => {
    try {
      const res = await authApi.put(`/foods/${requestBody.id}`, requestBody);
      return res.data;
    } catch (ex) {
      throw ex.response.data
    }
  }
  foodsCategories = async () => {
    try {
      const res = await authApi.get(`/foods/categories`);
      return res.data;
    } catch (ex) {
      throw ex.response.data
    }
  }
  foodsTags = async () => {
    try {
      const res = await authApi.get(`/foods/tags`);
      return res.data;
    } catch (ex) {
      throw ex.response.data
    }
  }
  foodsAmounts = async () => {
    try {
      const res = await authApi.get(`/foods/amounts`);
      return res.data;
    } catch (ex) {
      throw ex.response.data
    }
  }
}

const foods = new Foods();
export default foods;