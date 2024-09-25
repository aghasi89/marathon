import {useRoute, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {programDaySelector} from '../../../../store/selectors/programs-selector';
import {setDays} from '../../../../store/actions/program-action';
import CreateNotesReducer from './CreateNotes-reducer';

export default props => {
  const {state, dispatchState} = CreateNotesReducer();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isOpenEditSheet, setIsOpenEditSheet] = useState<boolean>(false);
  const days = useSelector(programDaySelector);

  const route = useRoute<any>();
  const dayIndex = route.params?.dayIndex ?? null;
  const noteList = route.params?.noteList ?? [];

  useEffect(() => {
    if (noteList.length > 0) {
      dispatchState({
        type: 'SET_NOTE',
        payload: noteList,
      });
    }
  }, [noteList]);

  const addNote = () => {
    dispatchState({
      type: 'SET_NOTE',
      payload: [...state.notes, {text: state.inputNote}],
    });
  };

  const deleteNote = (index: number) => {
    let list = [...state.notes];
    list.splice(index, 1);
    dispatchState({
      type: 'SET_NOTE',
      payload: {...state, notes: list},
    });
  };

  const onSelect = () => {
    setIsOpenEditSheet(false);
  };
  const openEditSheet = useCallback(() => {
    setIsOpenEditSheet(!isOpenEditSheet);
  }, [isOpenEditSheet]);

  const leftIconPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    state,
    dispatchState,
    days,
    deleteNote,
    dayIndex,
    isOpenEditSheet,
    setIsOpenEditSheet,
    onSelect,
    openEditSheet,
    leftIconPress,
    addNote,
  };
};
