import {Dispatch, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {
  setComponentsAction,
  setErrorMessageAction,
  setIngredientsAction,
} from '../../../../../../store/actions/createFeed-action';
import {ICreateFeed} from '../../../../../../types/types';
import {useDispatch, useSelector} from 'react-redux';
import {createFeedStateSelector} from '../../../../../../store/selectors/create-feed-selector';

type StateType = {
  state: ICreateFeed;
  dispatch: Dispatch<any>;
};

export default () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector(createFeedStateSelector);

  const ingridientsValueChangeHandle = useCallback(
    (text: string, index?: number) => {
      if (index || index === 0) {
        const newList = state.components ? [...state.components] : [];
        if (newList[index]) newList[index].name = text;
        dispatch(setComponentsAction(newList));
      } else {
        dispatch(setIngredientsAction(text));
        dispatch(
          setErrorMessageAction({...state.errorMessages, ingredients: ''}),
        );
      }
    },
    [state],
  );
  const buttonPressHandle = useCallback(() => {
    if (state?.ingredients_string && !!!state?.components?.length) {
      const ingridientsList = state.ingredients_string
        ?.trim()
        .split(`\n`)
        .filter(el => el)
        .map(el => ({name: el}));
      dispatch(setComponentsAction([...ingridientsList, {name: ''}]));
    } else if (
      state.components &&
      state.components.length > 0 &&
      !!state?.components[state.components.length - 1]?.name?.length
    ) {
      const newList = [...state.components];
      dispatch(setComponentsAction([...newList, {name: ''}]));
    }
  }, [state]);
  const ingredientDeleteHandle = useCallback(
    (index: number) => {
      const newList = state.components ? [...state.components] : [];
      newList.splice(index, 1);
      dispatch(setComponentsAction(newList));
    },
    [state],
  );

  return {
    t,
    state,
    ingridientsValueChangeHandle,
    buttonPressHandle,
    ingredientDeleteHandle,
  };
};
