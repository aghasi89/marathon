import { useCallback, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useTranslation} from 'react-i18next';
import {  setErrorMessageAction, setPreparationStepsAction } from '../../../../../../store/actions/createFeed-action';
import { createFeedStateSelector } from '../../../../../../store/selectors/create-feed-selector';

export default () => {
  const {t} = useTranslation();
  const state = useSelector(createFeedStateSelector);
  const dispatch = useDispatch();
  const listRef = useRef <any>()
  const stepDeleteHandle = useCallback((index: number) => {
      if (state.preparation_steps && state?.preparation_steps?.length > 1) {
        const newList = [...state.preparation_steps];
        newList.splice(index, 1);
        dispatch(setPreparationStepsAction(newList));
      }
    },[state]);
  const inputValueChangeHandle = useCallback((text: string, index: number) => {
      const newList = state.preparation_steps
        ? [...state.preparation_steps]
        : [];
      if (newList[index]) newList[index].text = text;
      dispatch(setPreparationStepsAction(newList));
      if(newList&&newList[0].text&&newList[0].text?.length>0)
      dispatch(setErrorMessageAction({...state.errorMessages,preparation_steps:''}))
    },[state]);
  const buttonPressHandle = useCallback(() => {
    if (state.preparation_steps) {
      dispatch(
        setPreparationStepsAction([...state.preparation_steps, {text: ''}]),
      );
    }
  }, [state]);
  const inputFocusHandle =useCallback((index:number)=>{
    if (listRef.current) {
      setTimeout(()=>{listRef?.current?.scrollToIndex({animated: true, index})},100)
    }
  },[listRef.current])
  return {
    t,
    state,
    stepDeleteHandle,
    inputValueChangeHandle,
    buttonPressHandle,
    inputFocusHandle,
    listRef
  };
};
