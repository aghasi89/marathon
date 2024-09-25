import {MEDIA_PATH, WorkoutLevel} from '../../types/enums';
import {
  IAction,
  ICreateFeed,
  IFeedMediaItem,
  IMediaForTypes,
} from '../../types/types';
import {CreateFeedTypes} from '../costants';

export const initialState: ICreateFeed | undefined = {
  feed_id: undefined,
  creator: undefined,
  coach_question: [{text: ''}],
  duration: undefined,
  currency: undefined,
  feed_category: [],
  is_public: false,
  language: null,
  selectedMeasurements: [],
  media: [],
  price: 0,
  start_day: undefined,
  tag: [],
  title: undefined,
  user_count: 1,
  wallet: undefined,
  context: [],
  chat_type: 'group',
  feedType: undefined,
  text: '',
  ingredients_string: undefined,
  components: [],
  preparation_steps: [{text: ''}],
  protein: undefined,
  carbohydrates: undefined,
  fat: undefined,
  kcal_measurement: 'per-serving',
  total_kcal: undefined,
  apportionment: undefined,
  serving_size: undefined,
  unit_of_measurement: undefined,
  is_more: false,
  measurementSelectedUnit: undefined,
  categoriesList: [],
  selectedCategories: [],
  selectedCurrency: {id: 0, wallet_id: 0},
  userWalletsList: [],
  is_individual: true,
  errorMessages: {
    coverMedia: '',
    title: '',
    category: '',
    language: '',
    datetime: '',
    duration: '',
    user_count: '',
    price: '',
    currency: '',
    ingredients: '',
    preparation_steps: '',
    protein: '',
    carbohydrates: '',
    fat: '',
    exercises: '',
  },
  feedPaymentType: 'paid',
  workoutType: undefined,
  level: WorkoutLevel.Beginner,
  calorie: undefined,
  selectedEquipments: [],
  trainings: [],
  selectedBodyParts: [],
  selectedExercises: [],
  selectedExeciseItem: undefined,
  is_protected: false,
  is_completed: false,
  is_draft: true,
  isEditing: false,
  compressingProgress: undefined,
  uploadingProgress: undefined,
};
function createFeedReducer(
  state: ICreateFeed | undefined = initialState,
  action: any,
) {
  switch (action.type) {
    case CreateFeedTypes.SET_CONTEXT:
      return {...state, context: action.payload};
    case CreateFeedTypes.SET_MEDIA:
      return {...state, media: action.payload};
    case CreateFeedTypes.SET_TITLE:
      return {...state, title: action.payload};
    case CreateFeedTypes.SET_START_DATE:
      return {...state, start_day: action.payload};
    case CreateFeedTypes.SET_START_DURATION:
      return {...state, duration: action.payload};
    case CreateFeedTypes.SET_USER_COUNT:
      return {...state, user_count: action.payload};
    case CreateFeedTypes.SET_PACKAGE_TYPE:
      return {...state, is_individual: action.payload};
    case CreateFeedTypes.SET_PRICE:
      return {...state, price: action.payload};
    case CreateFeedTypes.SET_COMMUNICATION:
      return {...state, chat_type: action.payload};
    case CreateFeedTypes.SET_QUESTION:
      return {...state, coach_question: action.payload};
    case CreateFeedTypes.SET_LANGUAGE:
      return {...state, language: action.payload};
    case CreateFeedTypes.SET_SELECTED_CATEGORIES:
      return {...state, selectedCategories: action.payload};
    case CreateFeedTypes.SET_SELECTED_MEASUREMENTS:
      return {...state, selectedMeasurements: action.payload};
    case CreateFeedTypes.SET_FEED_TYPE:
      return {...state, feedType: action.payload};
    case CreateFeedTypes.SET_DESCRIPTION:
      return {...state, text: action.payload};
    case CreateFeedTypes.SET_INGREDIENTS_STRING:
      return {...state, ingredients_string: action.payload};
    case CreateFeedTypes.SET_COMPONENTS:
      return {...state, components: action.payload};
    case CreateFeedTypes.SET_PREPARATION_STEPS:
      return {...state, preparation_steps: action.payload};
    case CreateFeedTypes.SET_PROTEIN:
      return {...state, protein: action.payload};
    case CreateFeedTypes.SET_CARBS:
      return {...state, carbohydrates: action.payload};
    case CreateFeedTypes.SET_FAT:
      return {...state, fat: action.payload};
    case CreateFeedTypes.SET_KCAL_MEASUREMENT:
      return {...state, kcal_measurement: action.payload};
    case CreateFeedTypes.SET_TOTAL_KCAL:
      return {...state, total_kcal: action.payload};
    case CreateFeedTypes.SET_PORTION:
      return {...state, apportionment: action.payload};
    case CreateFeedTypes.SET_SERVING_SIZE:
      return {...state, serving_size: action.payload};
    case CreateFeedTypes.SET_UNIT_OF_MEASUREMENT:
      return {...state, unit_of_measurement: action.payload};
    case CreateFeedTypes.SET_IS_MORE_INFO:
      return {...state, is_more: action.payload};
    case CreateFeedTypes.SET_MEASUREMENT_SELECTED_UNIT:
      return {...state, measurementSelectedUnit: action.payload};
    case CreateFeedTypes.SET_CATEGORIES_LIST:
      return {...state, categoriesList: action.payload};
    case CreateFeedTypes.SET_SELECTED_CURRENCY:
      return {...state, selectedCurrency: action.payload};
    case CreateFeedTypes.SET_CREATOR:
      return {...state, creator: action.payload};
    case CreateFeedTypes.SET_USER_WALLET_LIST:
      return {...state, userWalletsList: action.payload};
    case CreateFeedTypes.SET_ERROR_MESSAGES:
      return {...state, errorMessages: action.payload};
    case CreateFeedTypes.SET_FEED_PAYMENT_TYPE:
      return {...state, feedPaymentType: action.payload};
    case CreateFeedTypes.SET_STATE:
      return {...state, ...action.payload};
    case CreateFeedTypes.SET_WORKOUT_TYPE:
      return {...state, workoutType: action.payload};
    case CreateFeedTypes.SET_WORKOUT_LEVEL:
      return {...state, level: action.payload};
    case CreateFeedTypes.SET_CALORIE:
      return {...state, calorie: action.payload};
    case CreateFeedTypes.SET_SELECTED_BODY_PARTS:
      return {...state, selectedBodyParts: action.payload};
    case CreateFeedTypes.SET_SELECTED_EQUIPMENTS:
      return {...state, selectedEquipments: action.payload};
    case CreateFeedTypes.SET_SELECTED_EXERCISES:
      return {...state, selectedExercises: action.payload};
    case CreateFeedTypes.SET_SELECTED_EXERCISE_ITEM:
      return {...state, selectedExeciseItem: action.payload};
    case CreateFeedTypes.SET_WORKOUT_PERMISSION:
      return {...state, is_protected: action.payload};
    case CreateFeedTypes.SET_FEED_COMPRESSING_VIDEO_PROGRESS:
      return {...state, compressingProgress: action.payload};
    case CreateFeedTypes.SET_FEED_UPLOADING_VIDEO_PROGRESS:
      // console.log(action.payload, "REDUCERRRRRRRRRRR");
      
      return {...state, uploadingProgress: action.payload};
    case CreateFeedTypes.SET_FEED_VIDEO_UPLOAD_PROGRESS:
      const {
        mediaItem,
        mediaFor,
        contextIndex,
      }: {
        mediaItem: IFeedMediaItem;
        mediaFor: IMediaForTypes;
        contextIndex: number;
      } = action.payload;
      let newList: IFeedMediaItem[] = [...(state?.[mediaFor] || [])];
      const type = MEDIA_PATH?.[mediaFor];
      const index =
        contextIndex ?? newList.findIndex(el => el[type] === mediaItem[type]);
      if (index > -1) {
        newList[index] = mediaItem;
      } else {
        newList = [...newList, mediaItem];
      }
      return {...state, [mediaFor]: newList};
    default:
      return state;
  }
}
export default createFeedReducer;
