import {CreateExerciseTypes} from '../costants';
import {WorkoutLevel} from '../../types/enums';
import {ICreateExercise} from '../../types/types';

const initState: ICreateExercise | undefined = {
  media: [],
  title: undefined,
  errorMessages: {
    coverMedia: '',
    title: '',
    duration: '',
    body_parts: '',
  },
  description: undefined,
  body_parts: [],
  equipments: [],
  duration: '0',
  level: WorkoutLevel.Beginner,
};
function createExerciseReducer(
  state: ICreateExercise | undefined = initState,
  action: any,
) {
  switch (action.type) {
    case CreateExerciseTypes.SET_MEDIA:
      return {...state, media: action.payload};
    case CreateExerciseTypes.SET_TITLE:
      return {...state, title: action.payload};
    case CreateExerciseTypes.SET_ERROR_MESSAGES:
      return {...state, errorMessages: action.payload};
    case CreateExerciseTypes.SET_DESCRIPTION:
      return {...state, description: action.payload};
    case CreateExerciseTypes.SET_BODY_PARTS:
      return {...state, body_parts: action.payload};
    case CreateExerciseTypes.SET_SELECTED_EQUIPMENTS:
      return {...state, equipments: action.payload};
    case CreateExerciseTypes.SET_DURATION:
      return {...state, duration: action.payload};
    case CreateExerciseTypes.SET_LEVEL:
      return {...state, level: action.payload};
    case CreateExerciseTypes.SET_STATE:
      return {...state, ...action.payload};
    case CreateExerciseTypes.DELETE_ALL_STATE:
      return {state: action.payload};
    default:
      return state;
  }
}

export default createExerciseReducer;
