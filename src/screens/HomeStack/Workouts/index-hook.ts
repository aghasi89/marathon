import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setExerciseSelectedFilterList} from '../../../store/actions/exercises-action';
import {setWorkoutSelectedFilterList} from '../../../store/actions/workout-action';
import {execiseSelectedFilterListSelector} from '../../../store/selectors/execise-selector';
import {workoutSelectedFilterListSelector} from '../../../store/selectors/workout-selector';

export default props => {
  const dispatch = useDispatch();
  const [isFocus, setIsfocus] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>();
  const [index, setIndex] = useState<number>(0);
  const [indexTab, setIndexTab] = useState<number>(0);
  const filterText = text => {
    setSearchText(text);
  };
  const badges = [
    {
      title: 'Recent',
    },
    {
      title: 'Library',
    },
    {
      title: 'Bookmarks',
    },
  ];
  const exerciseSelectedFilterList = useSelector(
    execiseSelectedFilterListSelector,
  );
  const workoutSelectedFilterList = useSelector(
    workoutSelectedFilterListSelector,
  );
  const [selectedData, setSelectedData] = useState([]);

  const selectedFilterList = () => {
    switch (index) {
      case 0:
        return exerciseSelectedFilterList;
      case 1:
        return workoutSelectedFilterList;
      default:
        break;
    }
  };
  useEffect(() => {
    setSelectedData(selectedFilterList());
  }, [index, selectedFilterList]);

  const deleteItem = (value: any) => {
    for (let i = 0; i < selectedData.length; i++) {
      if (selectedData[i].id === value.id) {
        let list = [...selectedData];
        list.splice(i, 1);
        switch (index) {
          case 0:
            dispatch(setExerciseSelectedFilterList(list));
            break;
          case 1:
            dispatch(setWorkoutSelectedFilterList(list));
            break;
          default:
            break;
        }
      }
    }
  };
  return {
    isFocus,
    setIsfocus,
    searchText,
    setSearchText,
    index,
    setIndex,
    indexTab,
    setIndexTab,
    filterText,
    badges,
    selectedData,
    deleteItem,
  };
};
