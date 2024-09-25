import React, { useReducer } from 'react';
import { userAnswerTypes } from './AnswersTypes';
import { IAction, IFeedCategoryItem, IFeedCoachQuestionItem } from '../../../../../types/types';

export interface IAnswerState {
  measurments?:IFeedCategoryItem[]
  coach_question?:IFeedCoachQuestionItem[]
}
export default () => {
  const initState: IAnswerState | undefined = {
    measurments:[],
    coach_question:[]

  };
  function userAnswersReducer(state: IAnswerState | undefined, action: IAction) {
    switch (action.type) {
      case userAnswerTypes.SET_STATE:
        return { ...action.payload };
      case userAnswerTypes.SET_MEASURMENTS_LIST:
        return { ...state, measurments: action.payload };
      case userAnswerTypes.SET_COACH_QUESTION_LIST:
        return { ...state, coach_question: action.payload };
      default:
        return state;
    }
  }
  const [state, dispatchState] = useReducer(userAnswersReducer, initState);
  return {
    state,
    dispatchState,
  };
};
