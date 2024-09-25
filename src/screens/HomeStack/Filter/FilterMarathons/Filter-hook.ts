import {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedFilterList} from '../../../../store/actions/marathon-action';
import {IFilterMarathons} from '../../../../store/reducers/marathons-reducer';
import {
  filterListSelector,
  marathonsSelectedFilterListSelector,
} from '../../../../store/selectors/marathons-selector';

export default navigation => {
  const dispatch = useDispatch();
  const filterList = useSelector(filterListSelector);
  const selectedFilterList = useSelector(marathonsSelectedFilterListSelector);
  const [isFocus, setIsfocus] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const filterText = text => {
    setSearchText(text);
  };
  const checksetSelectedItems = useCallback(
    (selectedItem: IFilterMarathons) => {
      for (let index = 0; index < selectedFilterList.length; index++) {
        if (selectedFilterList[index].id === selectedItem.id) {
          let list = [...selectedFilterList];
          list.splice(index, 1);
          dispatch(setSelectedFilterList(list));
          return;
        }
      }
      dispatch(setSelectedFilterList([...selectedFilterList, selectedItem]));
    },
    [selectedFilterList],
  );
  const leftIconPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return {
    isFocus,
    setIsfocus,
    searchText,
    setSearchText,
    filterText,
    filterList,
    selectedFilterList,
    checksetSelectedItems,
    leftIconPress,
  };
};
