import {useState, useCallback, useEffect, useContext} from 'react';
import {useSelector} from 'react-redux';
import {categoryListSelector} from '../../../../../../store/selectors/marathons-selector';
import {ICategory, ITag} from '../../../../../../types/types';
import {StateContext, StateContextType} from '../../../../contexts';

const props = navigation => {
  const {state, dispatchState} = useContext<StateContextType>(StateContext);
  const categoryList = useSelector(categoryListSelector);
  const [selectrdCategories, setSelectrdCategories] = useState<
    Array<ICategory>
  >([]);
  const newList = state?.selectedCategories?.map(item =>
    JSON.parse(JSON.stringify(item)),
  );

  useEffect(() => {
    if (
      state &&
      state.selectedCategories &&
      state.selectedCategories.length > 0
    ) {
      setSelectrdCategories(newList ? newList : []);
    }
  }, [state?.selectedCategories]);
  const checkIsSubmited = useCallback(
    (id: number) => {
      let isSubmited = selectrdCategories.find(item => item.id == id);
      if (isSubmited) {
        return true;
      }

      return false;
    },
    [selectrdCategories],
  );
  const selectCategory = useCallback(
    (category: ITag) => {
      if (!checkIsSubmited(category.id)) {
        setSelectrdCategories([...selectrdCategories, category]);
      } else {
        let array = [...selectrdCategories];
        const findIndex = array.findIndex(element => {
          return element.id == category.id;
        });
        array.splice(findIndex, 1);
        setSelectrdCategories(array);
      }
    },
    [selectrdCategories],
  );
  const leftIconPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const onApply = useCallback(() => {
    if (dispatchState) {
      dispatchState({
        type: 'SET_SELECTED_CATEGORIES',
        payload: selectrdCategories,
      });
    }
    navigation.navigate('CreateGroupMarathon', {
      categoryList: state.selectedCategories,
    });
  }, [navigation, selectrdCategories]);
  const onCategorySelect = useCallback(
    (value: ITag) => {
      selectCategory(value);
    },
    [selectrdCategories],
  );
  const onClearAll = useCallback(() => {
    setSelectrdCategories([]);
  }, []);
  return {
    leftIconPress,
    onApply,
    onCategorySelect,
    selectrdCategories,
    onClearAll,
    state,
    categoryList,
  };
};
export default props;
