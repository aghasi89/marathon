import {useCallback, useState} from 'react';
import {ISpeciality} from '../../../../types/types';
import SpecilitiesReducer from './Specialities-reducer';

export default navigation => {
  const {state, dispatchState} = SpecilitiesReducer();
  const [searchText, setSearchText] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const filterText = text => {
    setSearchText(text);
  };

  const checkIsSubmited = (id: number) => {
    let speciality = state.selectedList.find(item => item.id == id);
    if (speciality) {
      return true;
    }
    return false;
  };

  const addSpeciality = (speciality: ISpeciality) => {
    if (!checkIsSubmited(speciality.id)) {
      dispatchState({
        type: 'SET_ADD_SPECIALITY',
        payload: [...state.selectedList, speciality],
      });
    } else {
      let array = [...state.selectedList];
      const findIndex = array.findIndex(element => {
        return element.id == speciality.id;
      });
      array.splice(findIndex, 1);
      dispatchState({type: 'SET_ADD_SPECIALITY', payload: array});
    }
  };

  const leftIconPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    state,
    checkIsSubmited,
    addSpeciality,
    searchText,
    filterText,
    leftIconPress,
    isOpen,
    setIsOpen,
  };
};
