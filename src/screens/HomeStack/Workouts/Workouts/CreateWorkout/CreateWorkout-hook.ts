import {useRoute} from '@react-navigation/native';
import {Dispatch, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { workoutDetailSelector } from '../../../../../store/selectors/workout-selector';
import CreateWorkoutReducer from './CreateWorkout-reducer';

export default () => {
  const {state, dispatchState} = CreateWorkoutReducer();
  const dispatch=useDispatch<Dispatch<any>>()
  const route = useRoute<any>();
  const isNew = route.params?.isNew;
  const workoutDetail = useSelector(workoutDetailSelector);

  const exercises = route.params?.exercises ?route.params?.exercises :isNew === false ? workoutDetail.exercises : [];
  const equipements = route.params?.equipementList ? route.params?.equipementList : isNew === false ? workoutDetail.equipents : [];
  const muscles = route.params?.muscleList ? route.params?.muscleList : isNew === false ? workoutDetail.muscules : [];
  const tags = route.params?.tagList ? route.params?.tagList : isNew === false ? workoutDetail.tags : [];

  useEffect(() => {
    if (isNew === false && workoutDetail) {
      dispatchState({type:'SET_ISNEW',payload:false})
      setImageUrl(workoutDetail?.imageUrl)
      setName(workoutDetail?.name)
      dispatchState({type: 'SET_EXERCISES', payload: workoutDetail.exercises});
      dispatchState({type: 'SET_REST', payload: workoutDetail.rests});
      setKcal(workoutDetail.kcal)
      setSelectedLevel(workoutDetail.level)
      setType(workoutDetail?.type)
              dispatchState({
          type: 'SET_SELECTED_LEVEL',
          payload: workoutDetail.level,
        });
    }else if (isNew === true){
      dispatchState({type:'SET_ISNEW',payload:true})

    }
  }, [isNew, workoutDetail])
  useEffect(() => {
    exercises.length > 0 &&
      dispatchState({type: 'SET_EXERCISES', payload: exercises});
  }, [exercises]);
  useEffect(() => {
    equipements.length > 0 &&
      dispatchState({type: 'SET_SELECTED_EQUIPEMENT', payload: equipements});
  }, [equipements]);
  useEffect(() => {
    muscles.length > 0 &&
      dispatchState({type: 'SET_SELECTED_MUSCLES', payload: muscles});
  }, [muscles]);
  useEffect(() => {
    tags.length > 0 &&
      dispatchState({type: 'SET_SELECTED_TAGS', payload: tags});
  }, [tags]);

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(0);

  const restItem = {
    restCount: 2,
    restTime: '2 min 10 sec',
    value: 20,
  };

  const deleteEquipementItem = (value: any) => {
    state.selectedEquipement.map((equipement, index) => {
      if (equipement.id === value.id) {
        let list = [...state.selectedEquipement];
        list.splice(index, 1);
        dispatchState({type: 'SET_SELECTED_EQUIPEMENT', payload: list});
      }
    });
  };
  const deleteMusclesItem = (value: any) => {
    state.selectedMuscles.map((muscle, index) => {
      if (muscle.id === value.id) {
        let list = [...state.selectedMuscles];
        list.splice(index, 1);
        dispatchState({type: 'SET_SELECTED_MUSCLES', payload: list});
      }
    });
  };
  const deleteTagsItem = (value: any) => {
    state.selectedTags.map((tag, index) => {
      if (tag.id === value.id) {
        let list = [...state.selectedTags];
        list.splice(index, 1);
        dispatchState({type: 'SET_SELECTED_TAGS', payload: list});
      }
    });
  };
  const deleteRestItem = (index: number) => {
    let list = [...state.rest];
    list.splice(index, 1);
    dispatchState({type: 'SET_REST', payload: list});
  };
  const deleteExercise = (index: number) => {
    let list = [...state.exercises];
    list.splice(index, 1);
    dispatchState({type: 'SET_EXERCISES', payload: list});
  };
  const setSelectedLevel = (selected: any) => {
            dispatchState({
          type: 'SET_SELECTED_LEVEL',
          payload: selected,
        });
    // let list = [...state.levelList];
    // for (let index = 0; index < state.levelList.length; index++) {
    //   list[index].selected = false;
    //   if (state.levelList[index].id === selected.id) {
    //     list[index].selected = !list[index].selected;
    //     dispatchState({
    //       type: 'SET_SELECTED_LEVEL',
    //       payload: list[index],
    //     });
    //   }
    // }
  };
  const addRest = () => {
    dispatchState({
      type: 'SET_REST',
      payload: [...state.rest, restItem],
    });
  };
  const setKcal = (val: string) => {
    dispatchState({type: 'SET_VALUE_KCAL', payload: val});
  };
  const setImageUrl=(value:string)=>{
    dispatchState({ type: 'SET_EXERCISE_IMAGE_URL', payload: value })
  }
  const setName=(value:string)=>{
    dispatchState({ type: 'SET_EXERCISE_NAME', payload: value });
  }
  const setType=(value:string)=> {
    dispatchState({ type: 'SET_TYPE_VALUE', payload: value });
  }
  return {
    state,
    dispatchState,
    isOpen,
    setIsOpen,
    deleteEquipementItem,
    deleteMusclesItem,
    deleteTagsItem,
    setValue,
    setSelectedLevel,
    restItem,
    deleteRestItem,
    deleteExercise,
    addRest,
    setKcal,
    dispatch,
    setImageUrl,
    setName,
    setType,
    workoutDetail
  };
};
