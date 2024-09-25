import {useState, useCallback, useContext, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  cencelationPriodListSelector,
  marathonsDetailSelector,
} from '../../../../../../../store/selectors/marathons-selector';
import {StateContext, StateContextType} from '../../../../../contexts';

export default navigation => {
  const {state, dispatchState} = useContext<StateContextType>(StateContext);
  const [calendarVisibility, setCalendarVisibility] = useState<boolean>(false);
  const cancellationPeriodList = useSelector(cencelationPriodListSelector);
  const marathonDetail = useSelector(marathonsDetailSelector);

  useEffect(() => {
    if (state.isNew === false && marathonDetail) {
      dispatchState && dispatchState({type: 'SET_ISNEW', payload: false});
      onPriceValueChange(marathonDetail.price);
      onAvailablePlacesChange(marathonDetail.count);
      onChangeVisibility(marathonDetail?.marathonVisibility);
      onCalendarApplay(marathonDetail?.calendarRange);
      dispatchState &&
        dispatchState({
          type: 'SET_SELECTED_CANCELLATION_PERIOD',
          payload: marathonDetail.cancellationPeriod.value,
        });
    } else if (state.isNew === true) {
      dispatchState && dispatchState({type: 'SET_ISNEW', payload: true});
    }
  }, [state.isNew, marathonDetail]);

  const onDateRangeSelect = useCallback(() => {
    setCalendarVisibility(true);
  }, []);
  const onPriceValueChange = useCallback((value: string) => {
    if (dispatchState) {
      dispatchState({type: 'SET_PRICE', payload: value});
    }
  }, []);
  const onAvailablePlacesChange = useCallback((value: string) => {
    if (dispatchState) {
      dispatchState({type: 'SET_AVAILABLE_PLICES', payload: value});
    }
  }, []);
  const onCncellationPeriodSelect = useCallback(
    (selected: string) => {
      cancellationPeriodList?.map(item => {
        if (item.value === selected) {
          if (dispatchState) {
            dispatchState({
              type: 'SET_SELECTED_CANCELLATION_PERIOD',
              payload: item,
            });
          }
        }
      });
    },
    [cancellationPeriodList],
  );
  const onChangeVisibility = useCallback(
    (value: boolean) => {
      if (dispatchState) {
        dispatchState({type: 'SET_VISIBILITY', payload: value});
      }
    },
    [state.marathonVisibility],
  );
  const onCalendarApplay = useCallback((value: string[]) => {
    if (value.length === 4) {
      if (dispatchState) {
        dispatchState({type: 'SET_MARATHON_RANGE', payload: value});
      }
      setCalendarVisibility(false);
    } else {
      if (value.length < 1) {
        setCalendarVisibility(false);
      } else {
        alert('Pleas select end date');
      }
    }
  }, []);
  const onCalendarCancle = useCallback(() => {
    setCalendarVisibility(false);
  }, []);
  return {
    onPriceValueChange,
    onAvailablePlacesChange,
    onCncellationPeriodSelect,
    onChangeVisibility,
    onDateRangeSelect,
    calendarVisibility,
    onCalendarApplay,
    onCalendarCancle,
    state,
    cancellationPeriodList,
  };
};
