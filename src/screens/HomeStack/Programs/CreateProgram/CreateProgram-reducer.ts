import {useReducer} from 'react';
import {IAction, ITag} from '../../../../types/types';

interface IinitialState {
  programImageUrl: string;
  programName: string;
  duration: string;
  weekDay: Array<IWeekDay>;
  selectedTags: Array<ITag>;
  typeValue: string;
}

interface IWeekDay {
  value: string;
  lable: string;
}

export default () => {
  const week = [
    {
      value: '1',
      label: 'Monday',
    },
    {
      value: '2',
      label: 'Tuesday',
    },
    {
      value: '3',
      label: 'Wednesday',
    },
    {
      value: '4',
      label: 'Thursday',
    },
    {
      value: '5',
      label: 'Friday',
    },
    {
      value: '6',
      label: 'Saturday',
    },
    {
      value: '7',
      label: 'Sunday',
    },
  ];

  const initialState = {
    programImageUrl: '',
    programName: '',
    duration: '7',
    weekDay: week[0],
    selectedTags: [],
    typeValue: '',
  };

  function reducer(state: IinitialState, action: IAction) {
    switch (action.type) {
      case 'SET_PROGRAM_IMAGE_URL':
        return {...state, programImageUrl: action.payload};
      case 'SET_PROGRAM_NAME':
        return {...state, programName: action.payload};
      case 'SET_DURATION':
        return {...state, duration: action.payload};
      case 'SET_WEEKDAY':
        return {...state, weekDay: action.payload};
      case 'SET_SELECTED_TAGS':
        return {...state, selectedTags: action.payload};
      case 'SET_TYPE_VALUE':
        return {...state, typeValue: action.payload};
      default:
        throw new Error();
    }
  }
  const [state, dispatchState] = useReducer(reducer, initialState);

  return {
    state,
    dispatchState,
    week,
  };
};
