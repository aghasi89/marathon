import {useCallback, useContext, useEffect} from 'react';
import {useSelector} from 'react-redux';
import uuid from 'react-native-uuid';
import moment from 'moment';
import {marathonsDetailSelector} from '../../../../../../../store/selectors/marathons-selector';
import {StateContext, StateContextType} from '../../../../../contexts';

export default navigation => {
  const {state, dispatchState} = useContext<StateContextType>(StateContext);
  const inputList = state.inputList ? state.inputList : [];
  const marathonDetail = useSelector(marathonsDetailSelector);

  useEffect(() => {
    if (state.isNew === false && marathonDetail) {
      dispatchState && dispatchState({type: 'SET_ISNEW', payload: false});
      dispatchState &&
        dispatchState({
          type: 'SET_INPUT_AND_VALUE',
          payload: marathonDetail.inputList,
        });
    } else if (state.isNew === true) {
      dispatchState && dispatchState({type: 'SET_ISNEW', payload: true});
    }
  }, [state.isNew, marathonDetail]);

  useEffect(() => {
    let start = moment(
      state?.calendarRange && state?.calendarRange[1],
      'YYYY-MM-DD',
    );
    let end = moment(
      state?.calendarRange && state?.calendarRange[0],
      'YYYY-MM-DD',
    );
    dispatchState &&
      dispatchState({
        type: 'SET_DURATION',
        payload: moment.duration(start.diff(end)).asDays(),
      });
  }, [state.calendarRange]);

  const addQuestion = useCallback(() => {
    const newList = [...inputList, {id: uuid.v4(), value: ''}];
    dispatchState &&
      dispatchState({type: 'SET_INPUT_AND_VALUE', payload: newList});
  }, [inputList, uuid]);
  const changeInputValue = useCallback(
    (id: string, value: string) => {
      const newList = [...inputList];
      const listItem = newList[newList.findIndex(item => item.id === id)];
      listItem.value = value;
      dispatchState &&
        dispatchState({type: 'SET_INPUT_AND_VALUE', payload: newList});
    },
    [inputList],
  );
  const deleteInput = useCallback(
    (id: string) => {
      const newList = [...inputList];
      const listItem = newList.findIndex(item => item.id === id);
      newList.splice(listItem, 1);
      dispatchState &&
        dispatchState({type: 'SET_INPUT_AND_VALUE', payload: newList});
    },
    [inputList],
  );
  return {
    deleteInput,
    addQuestion,
    changeInputValue,
    inputList,
  };
};
