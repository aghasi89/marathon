import {useReducer} from 'react';
import {IInputListDetails} from '../../../../../store/reducers/marathons-reducer';
import {
  IAction,
  ICancellationPeriodList,
  ICategory,
  IGaleryImages,
  ILanguageList,
  ITag,
} from '../../../../../types/types';

export interface IinitialState {
  marathonImageUrl?: string;
  marathonName?: string;
  selectedLanguages?: Array<ILanguageList>;
  selectedCategories?: Array<ICategory>;
  selectedTags?: Array<ITag>;
  selectedGalleryImages?: Array<IGaleryImages>;
  marathonInfo?: string;
  isNutritionSelected?: boolean;
  isTraningSelected?: boolean;
  isGroupChatSelected?: boolean;
  isMeasurementsSelected?: boolean;
  calendarRange?: string[];
  duration?: string;
  price?: string;
  availablePlices?: string;
  selectedCancellationPeriod?: ICancellationPeriodList;
  marathonVisibility?: boolean;
  inputList?: Array<IInputListDetails>;
  isNew: boolean;
}

export default () => {
  const initialState = {
    marathonImageUrl: '',
    marathonName: '',
    selectedLanguages: [],
    selectedCategories: [],
    selectedTags: [],
    selectedGalleryImages: [],
    marathonInfo: '',
    isNutritionSelected: false,
    isTraningSelected: false,
    isGroupChatSelected: false,
    isMeasurementsSelected: false,
    calendarRange: [],
    duration: '0',
    price: '0',
    availablePlices: '0',
    selectedCancellationPeriod: {},
    marathonVisibility: false,
    inputList: [],
    isNew: false,
  };

  function reducer(state: IinitialState, action: IAction) {
    switch (action.type) {
      case 'SET_MARATHON_IMAGE_URL':
        return {...state, marathonImageUrl: action.payload};
      case 'SET_MARATHON_NAME':
        return {...state, marathonName: action.payload};
      case 'SET_MARATHON_LANGUAGE':
        return {...state, selectedLanguages: action.payload};
      case 'SET_SELECTED_CATEGORIES':
        return {...state, selectedCategories: action.payload};
      case 'SET_SELECTED_TAGS':
        return {...state, selectedTags: action.payload};
      case 'SET_GALLERY_IMAGES':
        return {...state, selectedGalleryImages: action.payload};
      case 'SET_MARATHON_INFO':
        return {...state, marathonInfo: action.payload};
      case 'SET_NUTRITION':
        return {...state, isNutritionSelected: action.payload};
      case 'SET_TRANING':
        return {...state, isTraningSelected: action.payload};
      case 'SET_GROUP_CHAT':
        return {...state, isGroupChatSelected: action.payload};
      case 'SET_MEASUREMENTS':
        return {...state, isMeasurementsSelected: action.payload};
      case 'SET_PRICE':
        return {...state, price: action.payload};
      case 'SET_AVAILABLE_PLICES':
        return {...state, availablePlices: action.payload};
      case 'SET_SELECTED_CANCELLATION_PERIOD':
        return {...state, selectedCancellationPeriod: action.payload};
      case 'SET_VISIBILITY':
        return {...state, marathonVisibility: action.payload};
      case 'SET_MARATHON_RANGE':
        return {...state, calendarRange: action.payload};
      case 'SET_INPUT_AND_VALUE':
        return {...state, inputList: action.payload};
      case 'SET_ISNEW':
        return {...state, isNew: action.payload};
      case 'SET_DURATION':
        return {...state, duration: action.payload};
      case 'RESET_DATA':
        return initialState;
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
