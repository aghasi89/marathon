import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setExerciseSelectedFilterList} from '../../../../../store/actions/exercises-action';
import {
  execiseSelectedFilterListSelector,
  exerciseListSelector,
} from '../../../../../store/selectors/execise-selector';
import { IExercise } from '../../../../../types/types';
import ImportExerciseReducer from './ImportExercise-reducer';

export default props => {
  const dispatch = useDispatch();
  const {state, dispatchState} = ImportExerciseReducer();
  const [isFocus, setIsfocus] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>();
  const [indexTab, setIndexTab] = useState<number>(0);
  const exerciseList = useSelector(exerciseListSelector);
  const exerciseSelectedFilterList = useSelector(
    execiseSelectedFilterListSelector,
  );
  const badges = [
    {
      title: 'Recent',
    },
    {
      title: 'Library',
    },
    {
      title: 'Bookmarks',
    },
  ];
  const deleteItem = (value: any) => {
    for (let index = 0; index < exerciseSelectedFilterList.length; index++) {
      if (exerciseSelectedFilterList[index].id === value.id) {
        let list = [...exerciseSelectedFilterList];
        list.splice(index, 1);
        dispatch(setExerciseSelectedFilterList(list));
      }
    }
  };
  const checkIsSubmitedExercise = (id: number) => {
    for (let index = 0; index < state.isSubmitedExercises.length; index++) {
      const isSubmitedExercise = state.isSubmitedExercises[index];
      if (isSubmitedExercise.id == id) {
        return true;
      }
    }
    return false;
  };
  const addExercise = (execise: IExercise) => {
    if (!checkIsSubmitedExercise(execise.id)) {
      dispatchState({
        type: 'SET_ADD_EXERCISE',
        payload: [...state.isSubmitedExercises, execise],
      });
    } else {
      let array = [...state.isSubmitedExercises];
      const findIndex = array.findIndex(element => {
        return element.id == execise.id;
      });
      array.splice(findIndex, 1);
      dispatchState({type: 'SET_ADD_EXERCISE', payload: array});
    }
    console.log([...state.isSubmitedExercises]);
  };

  const filterText = text => {
    setSearchText(text);
  };

  return {
    badges,
    addExercise,
    state,
    checkIsSubmitedExercise,
    exerciseSelectedFilterList,
    deleteItem,
    exerciseList,
    isFocus,
    setIsfocus,
    searchText,
    filterText,
    indexTab,
    setIndexTab,
  };
};
