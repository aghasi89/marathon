import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import CreateProgramReducer from './CreateProgram-reducer';

export default () => {
  const {state, dispatchState, week} = CreateProgramReducer();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const route = useRoute<any>();
  const tags = route.params?.tagList ?? [];

  useEffect(() => {
    tags.length > 0 &&
      dispatchState({type: 'SET_SELECTED_TAGS', payload: tags});
  }, [tags]);

  const deleteTagItem = (value: any) => {
    state.selectedTags.map((tag, index) => {
      if (tag.id === value.id) {
        let list = [...state.selectedTags];
        list.splice(index, 1);
        dispatchState({type: 'SET_SELECTED_TAGS', payload: list});
      }
    });
  };

  return {
    state,
    dispatchState,
    deleteTagItem,
    isOpen,
    setIsOpen,
    week,
  };
};
