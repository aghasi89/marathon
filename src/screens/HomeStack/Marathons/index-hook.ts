import {useState,useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {marathonsSelectedFilterListSelector} from '../../../store/selectors/marathons-selector';
import {setSelectedFilterList} from '../../../store/actions/marathon-action';
import { IFilterMarathons } from '../../../store/reducers/marathons-reducer';

const props=(navigation)=> {
  const dispatch = useDispatch();
  const selectedFilterListMarathons = useSelector(marathonsSelectedFilterListSelector);
  const [isFocus, setIsfocus] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [indexTab, setIndexTab] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [isOpenedEditSheet, setIsOpenedEditSheet] = useState<boolean>(false);
  const badges = [
    {
      title: 'Active',
    },
    {
      title: 'Upcoming',
    },
    {
      title: 'Finished',
    },
  ];
  const navigateFilter = useCallback(() => {
    navigation.navigate('FilterMarathons');
  },[navigation])
  const filterText = useCallback((text:string) => {
    setSearchText(text);
  },[])
  const deleteItem = useCallback((value: IFilterMarathons) => {
    for (let index = 0; index < selectedFilterListMarathons.length; index++) {
      if (selectedFilterListMarathons[index].id === value.id) {
        let list = [...selectedFilterListMarathons];
        list.splice(index, 1);
        dispatch(setSelectedFilterList(list));
      }
    }
  },[selectedFilterListMarathons])
  const leftIconPress = useCallback(() => {
    navigation.goBack();
  },[navigation])
  return {
    isFocus,
    setIsfocus,
    searchText,
    indexTab,
    setIndexTab,
    index,
    setIndex,
    filterText,
    navigateFilter,
    deleteItem,
    selectedFilterListMarathons,
    badges,
    isOpenedEditSheet,
    setIsOpenedEditSheet,
    leftIconPress
  };
};
export default props