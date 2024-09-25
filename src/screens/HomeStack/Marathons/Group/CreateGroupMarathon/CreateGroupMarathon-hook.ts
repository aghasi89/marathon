import {useState, useCallback, Dispatch, useContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {
  getCategories,
  getMarathonGroupTags,
} from '../../../../../store/actions/marathon-action';
import {marathonsDetailSelector} from '../../../../../store/selectors/marathons-selector';
import {StateContext, StateContextType} from '../../../contexts';

export default navigation => {
  const {state, dispatchState} = useContext<StateContextType>(StateContext);
  const [active, setActive] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch<any>>();
  const marathonDetail = useSelector(marathonsDetailSelector);
  const leftIconPress = useCallback(() => {
    if (isNew === true) {
      dispatchState && dispatchState({type: 'RESET_DATA', payload: undefined});
    }
    navigation.goBack();
  }, [navigation]);
  const stepperIsActive = useCallback((value: number) => {
    setActive(value);
  }, []);
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getMarathonGroupTags());
  }, []);
  const route = useRoute<any>();
  const isNew = route.params?.isNew;
  useEffect(() => {
    if (isNew === false && marathonDetail) {
      dispatchState && dispatchState({type: 'SET_ISNEW', payload: false});
    } else if (isNew === true) {
      dispatchState && dispatchState({type: 'SET_ISNEW', payload: true});
    }
  }, [isNew, marathonDetail]);

  return {
    state,
    dispatchState,
    leftIconPress,
    active,
    stepperIsActive,
    isOpen,
    setIsOpen,
    dispatch,
    marathonDetail,
    isNew,
  };
};
