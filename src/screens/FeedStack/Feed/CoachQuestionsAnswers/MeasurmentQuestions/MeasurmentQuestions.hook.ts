import {Dispatch, useCallback, useContext, useRef} from 'react';
import { FlatList } from 'react-native';
import {useTranslation} from 'react-i18next';
import {AnswersContext} from '../context/cotnext';
import {IFeedCategoryItem, IFeedCoachQuestionItem} from '../../../../../types/types';
import {setMeasurmentsListAction} from '../CoachQuestionsAnswersReducer/AnswersAction';
import {IAnswerState} from '../CoachQuestionsAnswersReducer/AnswersReducer';

type StateType = {
  state: IAnswerState;
  dispatchState: Dispatch<any>;
};

export default () => {
  const {state, dispatchState}: StateType = useContext(AnswersContext);
  const {t} = useTranslation();
  const listRef = useRef<FlatList<IFeedCoachQuestionItem>>(null);
  const inputValueChangeHandle = useCallback(
    (value: string, item: IFeedCategoryItem) => {
      const newList = state.measurments ? [...state.measurments] : [];
      const index = newList.findIndex(el => el.id === item.id);
      if (index > -1) {
        newList[index] = {
          ...newList[index],
          measurement_answer: {
            id: item.id,
            answer: value,
          },
        };
      }
      dispatchState(setMeasurmentsListAction(newList));
    },
    [state],
  );
  const inputFocusHandle = useCallback(
    (index: number) => {
      if (listRef.current) {
        setTimeout(() => {
          listRef?.current?.scrollToIndex({animated: true, index});
        }, 100);
      }
    },
    [listRef],
  );
  return {t, state, inputValueChangeHandle,inputFocusHandle,listRef};
};
