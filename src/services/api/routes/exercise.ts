import authApi from '../mainInstance';
import { IExercise, ILogin } from '../../../types/types';
import Window from '../../../server/server'

Window
class Exercie {
  getExercisesTags = async () => {
    try {
      const res = await authApi.get("/tags");
      return res.data;
    } catch (ex) {
      throw ex.response.data
    }
  }
  getExercisesEquipement = async () => {
    try {
      const res = await authApi.get("/equipement");
      return res.data;
    } catch (ex) {
      throw ex.response.data
    }
  }
  getExercisesMuscules = async () => {
    try {
      const res = await authApi.get("/muscules");
      return res.data;
    } catch (ex) {
      throw ex.response.data
    }
  }
  createExercise = async (requestBody: IExercise) => {
    try {
      const res = await authApi.post("/exercise", requestBody);
      return res.data;
    } catch (ex) {
      throw ex.response.data
    }
  }
  getExercises = async () => {
    try {
      const res = await authApi.get("/exercises");
      return res.data;
    } catch (ex) {
      throw ex.response.data
    }
  }
  deleteExercise = async (id: number) => {
    try {
      const res = await authApi.delete(`/exercises/${id}`);
      return res.data;
    } catch (ex) {
      throw ex.response.data
    }
  }
  getExerciseById = async (id: number) => {
    try {
      const res = await authApi.get(`/exercises/${id}`);
      return res.data;
    } catch (ex) {
      throw ex.response.data
    }
  }
  changeExercise = async (requestBody: IExercise, id: number) => {
    try {
      const res = await authApi.patch(`/exercises/${id}`, requestBody);
      return res.data;
    } catch (ex) {
      throw ex.response.data
    }
  }
}

const exercies = new Exercie();
export default exercies;