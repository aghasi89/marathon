import {useState} from 'react';
import {useSelector} from 'react-redux';
import {programTagListSelector} from '../../../../store/selectors/programs-selector';
import {ITag} from '../../../../types/types';
import ImportTagReducer from './ProgramTag-reducer';

export default props => {
  const {state, dispatchState} = ImportTagReducer();
  const [searchText, setSearchText] = useState<string>('');
  const filterText = text => {
    setSearchText(text);
  };
  const tagList = useSelector(programTagListSelector);

  const checkIsSubmitedTag = (id: number) => {
    for (let index = 0; index < state.isSubmitedTags.length; index++) {
      const isSubmitedTag = state.isSubmitedTags[index];
      if (isSubmitedTag.id === id) {
        return true;
      }
    }
    return false;
  };

  const addTag = (tag: ITag) => {
    if (!checkIsSubmitedTag(tag.id)) {
      dispatchState({
        type: 'SET_ADD_TAGS',
        payload: [...state.isSubmitedTags, tag],
      });
    } else {
      let array = [...state.isSubmitedTags];
      const findIndex = array.findIndex(element => {
        return element.id == tag.id;
      });
      array.splice(findIndex, 1);
      dispatchState({type: 'SET_ADD_TAGS', payload: array});
    }
  };

  return {
    state,
    tagList,
    checkIsSubmitedTag,
    addTag,
    searchText,
    filterText,
  };
};
