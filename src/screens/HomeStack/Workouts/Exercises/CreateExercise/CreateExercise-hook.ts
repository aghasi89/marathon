import { Dispatch, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import CreateExerciseReducer from './CreateExercise-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getExercisesEquipement, getExercisesMuscules, getExercisesTags } from '../../../../../store/actions/exercises-action';
import { execiseDetailSelector } from '../../../../../store/selectors/execise-selector';

export default props => {
  const { state, dispatchState } = CreateExerciseReducer();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const route = useRoute<any>();
  const dispatch = useDispatch<Dispatch<any>>();
  const isNew = route.params?.isNew;
  const exerciseDetail = useSelector(execiseDetailSelector);

  const equipements = route.params?.equipementList ? route.params?.equipementList : isNew === false ? exerciseDetail.equipents : [];
  const muscles = route.params?.muscleList ? route.params?.muscleList : isNew === false ? exerciseDetail.muscules : [];
  const tags = route.params?.tagList ? route.params?.tagList : isNew === false ? exerciseDetail.tags : [];
  
  useEffect(() => {
    dispatch(getExercisesTags());
    dispatch(getExercisesMuscules());
    dispatch(getExercisesEquipement());
  }, [])
  useEffect(() => {
    if (isNew === false && exerciseDetail) {
      dispatchState({type:'SET_ISNEW',payload:false})
      setName(exerciseDetail?.name)
      setType(exerciseDetail?.type)
    }else if (isNew === true){
      dispatchState({type:'SET_ISNEW',payload:true})

    }
  }, [isNew, exerciseDetail])
  useEffect(() => {
    equipements.length > 0 &&
      dispatchState({ type: 'SET_SELECTED_EQUIPEMENT', payload: equipements });
  }, [equipements]);
  useEffect(() => {
    muscles.length > 0 &&
      dispatchState({ type: 'SET_SELECTED_MUSCLES', payload: muscles });
  }, [muscles]);
  useEffect(() => {
    tags.length > 0 &&
      dispatchState({ type: 'SET_SELECTED_TAGS', payload: tags });
  }, [tags]);

  const deleteEquipementItem = (value: any) => {
    state.selectedEquipement.map((equipement, index) => {
      if (equipement.id === value.id) {
        let list = [...state.selectedEquipement];
        list.splice(index, 1);
        dispatchState({ type: 'SET_SELECTED_EQUIPEMENT', payload: list });
      }
    });
  };
  const deleteMuscleItem = (value: any) => {
    state.selectedMuscles.map((muscle, index) => {
      if (muscle.id === value.id) {
        let list = [...state.selectedMuscles];
        list.splice(index, 1);
        dispatchState({ type: 'SET_SELECTED_MUSCLES', payload: list });
      }
    });
  };
  const deleteTagItem = (value: any) => {
    state.selectedTags.map((tag, index) => {
      if (tag.id === value.id) {
        let list = [...state.selectedTags];
        list.splice(index, 1);
        dispatchState({ type: 'SET_SELECTED_TAGS', payload: list });
      }
    });
  };
  const setName = (value: string) => {
    dispatchState({ type: 'SET_EXERCISE_NAME', payload: value });
  }
  const setType = (value: string) => {
    dispatchState({ type: 'SET_TYPE_VALUE', payload: value });
  }
  return {
    state,
    dispatchState,
    isOpen,
    setIsOpen,
    deleteEquipementItem,
    deleteMuscleItem,
    deleteTagItem,
    dispatch,
    setName,
    setType,
    isNew,
    exerciseDetail,
  };
};
