import {useEffect, useState} from 'react';
import ProgramDatesReducer from './ProgramDates-reducer';

export default props => {
  const {state, dispatchState} = ProgramDatesReducer();
  const [startDay, setStartDay] = useState<number>(0);
  const [endDay, setEndDay] = useState<number>(0);
  const week: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const addDays = () => {
    let array = state.days.slice(startDay, endDay);
    dispatchState({
      type: 'SET_ADD_DAYS',
      payload: array,
    });
  };
  useEffect(() => {
    addDays();
  }, [startDay, endDay]);

  const checkIsSubmitedDay = (id: number) => {
    let submitedDay = state.submitedDays.find(day => day.id == id);
    if (submitedDay) {
      return true;
    }
    return false;
  };
  const addDay = day => {
    if (!checkIsSubmitedDay(day.id)) {
      dispatchState({
        type: 'SET_ADD_DAYS',
        payload: [...state.submitedDays, day],
      });
    } else {
      let array = [...state.submitedDays];
      const findIndex = array.findIndex(element => {
        return element.id == day.id;
      });
      array.splice(findIndex, 1);
      dispatchState({
        type: 'SET_ADD_DAYS',
        payload: array,
      });
    }
  };

  const clearAll = () => {
    setStartDay(0);
    setEndDay(0);
    addDays();
  };

  return {
    week,
    startDay,
    setStartDay,
    endDay,
    setEndDay,
    state,
    dispatchState,
    addDays,
    checkIsSubmitedDay,
    clearAll,
    addDay,
  };
};
