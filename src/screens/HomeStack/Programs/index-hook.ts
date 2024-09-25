import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedFilterList} from '../../../store/actions/program-action';
import {
  programeListSelector,
  programSelectedFilterListSelector,
} from '../../../store/selectors/programs-selector';

export default props => {
  const dispatch = useDispatch();
  const [isFocus, setIsfocus] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [indexTab, setIndexTab] = useState<number>(0);
  const filterText = text => {
    setSearchText(text);
  };
  const [isOpenedEditSheet, setIsOpenedEditSheet] = useState<boolean>(false);
  const programsList = useSelector(programeListSelector);
  const navigateFilter = () => {
    props.navigate('programeFilter');
  };

  const badges = [
    {
      title: 'Recent',
    },
    {
      title: 'Library',
    },
    {
      title: 'Tags',
    },
    {
      title: 'Bookmarks',
    },
  ];
  const selectedFilterListPrograme = useSelector(
    programSelectedFilterListSelector,
  );
  const deleteItem = (value: any) => {
    for (let index = 0; index < selectedFilterListPrograme.length; index++) {
      if (selectedFilterListPrograme[index].id === value.id) {
        let list = [...selectedFilterListPrograme];
        list.splice(index, 1);
        dispatch(setSelectedFilterList(list));
      }
    }
  };
  const search = (searchItem: any) => {
    return (
      searchText.toLowerCase() ===
        searchItem.title.slice(0, searchText.length).toString().toLowerCase() ||
      searchText === ''
    );
  };

  return {
    isFocus,
    setIsfocus,
    searchText,
    indexTab,
    setIndexTab,
    filterText,
    navigateFilter,
    deleteItem,
    selectedFilterListPrograme,
    badges,
    isOpenedEditSheet,
    setIsOpenedEditSheet,
    programsList,
    search,
  };
};
