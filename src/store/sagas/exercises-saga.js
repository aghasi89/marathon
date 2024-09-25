import { put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import exercies from '../../services/api/routes/exercise';
import { setEquipements, setExercise, setExercises, setMuscles, setTags } from '../actions/exercises-action';
import { ExerciseTypes } from '../costants';


function* getExercisesTags() {
  try {
    const res = yield exercies.getExercisesTags();
    yield put(setTags(res))
  } catch (ex) {
    console.log("exxxxxxxx", ex)
  }
}
function* getExercisesMuscules() {
  try {
    const res = yield exercies.getExercisesMuscules();
    yield put(setMuscles(res))
  } catch (ex) {
    console.log("exxxxxxxx", ex)
  }
}
function* getExercisesEquipement() {
  try {
    const res = yield exercies.getExercisesEquipement();
    yield put(setEquipements(res))
  } catch (ex) {
    console.log("exxxxxxxx", ex)
  }
}
function* createExercise({ payload }) {
  try {
    const res = yield exercies.createExercise(payload);
    const data = yield exercies.getExercises();
    yield put(setExercises(data.exercieses))
  } catch (ex) {
    console.log("exxxxxxxx", ex)
  }
}
function* getExercises() {
  try {
    const res = yield exercies.getExercises();
    yield put(setExercises(res.exercieses))
  } catch (ex) {
    console.log("exxxxxxxx", ex)
  }
}
function* deleteExercise({ payload }) {
  try {
    const res = yield exercies.deleteExercise(payload);
    const data = yield exercies.getExercises();
    yield put(setExercises(data.exercieses))
  } catch (ex) {
    console.log("exxxxxxxx", ex)
  }
}
function* getExerciseById({ payload }) {
  try {
    const res = yield exercies.getExerciseById(payload);
    yield put(setExercise(res.exercieses))
  } catch (ex) {
    console.log("exxxxxxxx", ex)
  }
}
function* changeExercise({ payload }) {
  try {
    const res = yield exercies.changeExercise(payload.exerciese,payload.id);
    const data = yield exercies.getExercises();
    yield put(setExercises(data.exercieses))
  } catch (ex) {
    console.log("exxxxxxxx", ex)
  }
}
export function* watchExercises() {
  yield takeEvery(
    ExerciseTypes.GET_TAGS,
    getExercisesTags,
  );
  yield takeEvery(
    ExerciseTypes.GET_MUSCULES,
    getExercisesMuscules,
  );
  yield takeEvery(
    ExerciseTypes.GET_EQUIPEMENT,
    getExercisesEquipement,
  );
  yield takeEvery(
    ExerciseTypes.CREATE_EXERCISE,
    createExercise,
  );
  yield takeEvery(
    ExerciseTypes.GET_EXERCISES,
    getExercises,
  );
  yield takeEvery(
    ExerciseTypes.DELETE_EXERCISE,
    deleteExercise,
  );
  yield takeEvery(
    ExerciseTypes.GET_EXERCISE_BY_ID,
    getExerciseById,
  );
  yield takeEvery(
    ExerciseTypes.CHANGE_EXECISE,
    changeExercise,
  );
}
createExercise