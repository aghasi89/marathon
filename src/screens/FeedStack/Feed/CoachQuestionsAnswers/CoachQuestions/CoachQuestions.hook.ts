import {
  Dispatch,
  useCallback,
  useContext,
  useRef,
} from 'react';
import { FlatList } from 'react-native';
import {useTranslation} from 'react-i18next';
import {IFeedCoachQuestionItem} from '../../../../../types/types';
import {setCoachQuestionsListAction} from '../CoachQuestionsAnswersReducer/AnswersAction';
import {IAnswerState} from '../CoachQuestionsAnswersReducer/AnswersReducer';
import {AnswersContext} from '../context/cotnext';

type StateType = {
  state: IAnswerState;
  dispatchState: Dispatch<any>;
};

export default () => {
  const {state, dispatchState}: StateType = useContext(AnswersContext);
  const {t} = useTranslation();
  const listRef = useRef<FlatList<IFeedCoachQuestionItem>>(null);
  const inputValueChangeHandle = useCallback(
    (value: string, item: IFeedCoachQuestionItem) => {
      const newList = state.coach_question ? [...state.coach_question] : [];
      const index = newList.findIndex(el => el.id === item.id);
      if (index > -1) {
        newList[index] = {
          ...newList[index],
          answer: {id: item.id ?? 0, answer: value},
        };
      }
      dispatchState(setCoachQuestionsListAction(newList));
    },
    [state],
  );
  const inputFocusHandle = useCallback(
    (i: number) => {
      if (listRef.current!==null) {
        setTimeout(() => {
          listRef?.current?.scrollToIndex({animated: true, index: i});
        }, 100);
      }
    },
    [listRef],
  );
  return {
    t,
    state,
    inputValueChangeHandle,
    inputFocusHandle,
    listRef,
  };
};
