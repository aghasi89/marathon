import {useCallback, useContext, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {marathonsDetailSelector} from '../../../../../../../store/selectors/marathons-selector';
import {StateContext, StateContextType} from '../../../../../contexts';

export default () => {
  const {state, dispatchState} = useContext<StateContextType>(StateContext);
  const marathonDetail = useSelector(marathonsDetailSelector);

  useEffect(() => {
    if (state.isNew === false && marathonDetail) {
      dispatchState && dispatchState({type: 'SET_ISNEW', payload: false});
      onChangeNutrition(marathonDetail?.isNutritionsActive);
      onChangeTraining(marathonDetail?.isTrainingsActive);
      onChangeGroupChat(marathonDetail?.isGroupChatActive);
      onChangeUserMeasurements(marathonDetail?.isMeasurmentsActive);
    } else if (state.isNew === true) {
      dispatchState && dispatchState({type: 'SET_ISNEW', payload: true});
    }
  }, [state.isNew, marathonDetail]);

  const onChangeNutrition = useCallback(
    (value: boolean) => {
      dispatchState && dispatchState({type: 'SET_NUTRITION', payload: value});
    },
    [state.isNutritionSelected],
  );
  const onChangeTraining = useCallback((value: boolean) => {
    dispatchState && dispatchState({type: 'SET_TRANING', payload: value});
  }, []);
  const onChangeGroupChat = useCallback((value: boolean) => {
    dispatchState && dispatchState({type: 'SET_GROUP_CHAT', payload: value});
  }, []);
  const onChangeUserMeasurements = useCallback((value: boolean) => {
    dispatchState && dispatchState({type: 'SET_MEASUREMENTS', payload: value});
  }, []);
  return {
    state,
    onChangeNutrition,
    onChangeTraining,
    onChangeGroupChat,
    onChangeUserMeasurements,
  };
};
