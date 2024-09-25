import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setExerciseSelectedFilterList } from '../../../../store/actions/exercises-action';
import { setWorkoutSelectedFilterList } from '../../../../store/actions/workout-action';
import { execiseSelectedFilterListSelector, exerciseFilterListSelector } from '../../../../store/selectors/execise-selector';
import { workoutFilterListSelector, workoutSelectedFilterListSelector } from '../../../../store/selectors/workout-selector';

export default props => {
  const dispatch = useDispatch();
  const route = useRoute<any>();
  const index = route.params?.index ?? null;
  const exerciseFilterList = useSelector(exerciseFilterListSelector)
  const workoutFilterList = useSelector(workoutFilterListSelector)
  const exerciseSelectedFilterList = useSelector(execiseSelectedFilterListSelector);
  const workoutSelectedFilterList = useSelector(workoutSelectedFilterListSelector);
  
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const filterList = () => {
    switch (index) {
      case 0:
        return exerciseFilterList;
      case 1:
        return workoutFilterList;
      default:
        break;
    }
  };

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
    setData(filterList());
    setSelectedData(selectedFilterList());
  }, [index, selectedFilterList, filterList]);

  const checksetSelectedItems = (selectedItem: any) => {
    for (let i = 0; i < selectedData.length; i++) {
      if (selectedData[i].id === selectedItem.id) {
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
        return;
      }
    }
    switch (index) {
      case 0:
        dispatch(setExerciseSelectedFilterList([...selectedData, selectedItem]));
        break;
      case 1:
        dispatch(setWorkoutSelectedFilterList([...selectedData, selectedItem]));
        break;
      default:
        break;
    }
  };
  return {
    data,
    selectedData,
    checksetSelectedItems,
  };
};
