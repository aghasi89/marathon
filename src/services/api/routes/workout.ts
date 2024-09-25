import authApi from '../mainInstance';
import Window from '../../../server/server'
import { IWorkout } from '../../../store/reducers/workout-reducer';

Window
class WorkOut {

  createWorkout = async (requestBody: IWorkout) => {
    try {
      const res = await authApi.post("/workout", requestBody);
      return res.data;
    } catch (ex) {
      throw ex.response.data
    }
  }
  getWorkouts = async () => {
    try {
      const res = await authApi.get("/workouts");
      return res.data;
    } catch (ex) {
      throw ex.response.data
    }
  }
  deleteWorkout = async (id: number) => {
    try {
      const res = await authApi.delete(`/workouts/${id}`);
      return res.data;
    } catch (ex) {
      throw ex.response.data
    }
  }
  getWorkoutById = async (id: number) => {
    try {
      const res = await authApi.get(`/workouts/${id}`);
      return res.data;
    } catch (ex) {
      throw ex.response.data
    }
  }
  changeWorkout = async (requestBody: IWorkout, id: number) => {
    try {
      const res = await authApi.patch(`/workouts/${id}`, requestBody);
      return res.data;
    } catch (ex) {
      throw ex.response.data
    }
  }
}

const workout = new WorkOut();
export default workout;