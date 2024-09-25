import {useState, useCallback, useEffect, useContext} from 'react';
import {useSelector} from 'react-redux';
import {tagListSelector} from '../../../../../../store/selectors/marathons-selector';
import {ITag} from '../../../../../../types/types';
import {StateContext, StateContextType} from '../../../../contexts';

const props = navigation => {
  const {state, dispatchState} = useContext<StateContextType>(StateContext);
  const tagList = useSelector(tagListSelector);
  const [selectedTags, setSelectedTags] = useState<Array<ITag>>([]);
  const newList = state?.selectedTags?.map(item =>
    JSON.parse(JSON.stringify(item)),
  );

  useEffect(() => {
    if (state && state.selectedTags && state.selectedTags.length > 0) {
      setSelectedTags(newList ? newList : []);
    }
  }, [state?.selectedTags]);

  const checkIsSubmited = useCallback(
    (id: number) => {
      let isSubmited = selectedTags.find(item => item.id == id);
      if (isSubmited) {
        return true;
      }
      return false;
    },
    [selectedTags],
  );

  const selectTag = useCallback(
    (tag: ITag) => {
      if (!checkIsSubmited(tag.id)) {
        setSelectedTags([...selectedTags, tag]);
      } else {
        let array = [...selectedTags];
        const findIndex = array.findIndex(element => {
          return element.id == tag.id;
        });
        array.splice(findIndex, 1);
        setSelectedTags(array);
      }
    },
    [selectedTags],
  );

  const leftIconPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onApply = useCallback(() => {
    if (dispatchState) {
      dispatchState({
        type: 'SET_SELECTED_TAGS',
        payload: selectedTags,
      });
    }
    navigation.navigate('CreateGroupMarathon', {tagList: state.selectedTags});
  }, [navigation, selectedTags]);

  const onTagSelect = useCallback(
    (value: ITag) => {
      selectTag(value);
    },
    [selectedTags],
  );

  const onClearAll = useCallback(() => {
    setSelectedTags([]);
  }, []);

  return {
    leftIconPress,
    onApply,
    selectedTags,
    setSelectedTags,
    onClearAll,
    state,
    tagList,
    onTagSelect,
  };
};
export default props;
