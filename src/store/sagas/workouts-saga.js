import { put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import workout from '../../services/api/routes/workout';
import { setWorkout, setWorkouts } from '../actions/workout-action';
import {WorkoutTypes } from '../costants';



function* createWorkout({ payload }) {
  try {
    const res = yield workout.createWorkout(payload);
    const data = yield workout.getWorkouts();
   yield put(setWorkouts(data.workouts))
  } catch (ex) {
    console.log("exxxxxxxx", ex)
  }
}
function* getWorkouts() {
  try {
    const res = yield workout.getWorkouts();
    yield put(setWorkouts(res.workouts))
  } catch (ex) {
    console.log("exxxxxxxx", ex)
  }
}
function* deleteWorkOut({ payload }) {
  try {
    const res = yield workout.deleteWorkout(payload);
    const data = yield workout.getWorkouts();
    yield put(setWorkouts(data.workouts))
  } catch (ex) {
    console.log("exxxxxxxx", ex)
  }
}
function* getWorkOutById({ payload }) {
  try {
    console.log(payload,"iddddddddddddddddddd")
    const res = yield workout.getWorkoutById(payload);
    console.log("res by id",res)
    yield put(setWorkout(res.workouts))
  } catch (ex) {
    console.log("exxxxxxxx", ex)
  }
}
function* changeWorkout({ payload }) {
  try {
    const res = yield workout.changeWorkout(payload.workout,payload.id);
    const data = yield workout.getWorkouts();
    yield put(setWorkouts(data.workouts))
  } catch (ex) {
    console.log("exxxxxxxx", ex)
  }
}
export function* watchWorkOut() {
  yield takeEvery(
    WorkoutTypes.CREATE_WORKOUT,
    createWorkout,
  );
  yield takeEvery(
    WorkoutTypes.GET_WORKOUTS,
    getWorkouts,
  );
  yield takeEvery(
    WorkoutTypes.DELETE_WORKOUT,
    deleteWorkOut,
  );
  yield takeEvery(
    WorkoutTypes.GET_WORKOUT_BY_ID,
    getWorkOutById,
  );
  yield takeEvery(
    WorkoutTypes.CHANGE_WORKOUT,
    changeWorkout,
  );
}
