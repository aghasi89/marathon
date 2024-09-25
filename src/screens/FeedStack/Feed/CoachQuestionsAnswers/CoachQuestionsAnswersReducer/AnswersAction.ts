import {
  IFeedCategoryItem,
  IFeedCoachQuestionItem,
} from '../../../../../types/types';
import {IAnswerState} from './AnswersReducer';
import {userAnswerTypes} from './AnswersTypes';

export const setAnswerStateAction = (payload?: IAnswerState) => {
  return {
    type: userAnswerTypes.SET_STATE,
    payload,
  };
};
export const setCoachQuestionsListAction = (payload?: IFeedCategoryItem[]) => {
  return {
    type: userAnswerTypes.SET_COACH_QUESTION_LIST,
    payload,
  };
};
export const setMeasurmentsListAction = (
  payload?: IFeedCoachQuestionItem[],
) => {
  return {
    type: userAnswerTypes.SET_MEASURMENTS_LIST,
    payload,
  };
};
