import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedFilterList} from '../../../../store/actions/program-action';
import {IFilterPrograme} from '../../../../store/reducers/programs-reducer';
import {
  filterListSelector,
  programSelectedFilterListSelector,
} from '../../../../store/selectors/programs-selector';

export default () => {
  const [isFocus, setIsfocus] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const dispatch = useDispatch();
  const filterText = text => {
    setSearchText(text);
  };
  const filterList = useSelector(filterListSelector);
  const selectedFilterList = useSelector(programSelectedFilterListSelector);
  const checksetSelectedItems = (selectedItem: IFilterPrograme) => {
    for (let index = 0; index < selectedFilterList.length; index++) {
      if (selectedFilterList[index].id === selectedItem.id) {
        let list = [...selectedFilterList];
        list.splice(index, 1);
        dispatch(setSelectedFilterList(list));
        return;
      }
    }
    dispatch(setSelectedFilterList([...selectedFilterList, selectedItem]));
  };
  return {
    isFocus,
    setIsfocus,
    searchText,
    setSearchText,
    filterText,
    filterList,
    selectedFilterList,
    checksetSelectedItems,
  };
};
