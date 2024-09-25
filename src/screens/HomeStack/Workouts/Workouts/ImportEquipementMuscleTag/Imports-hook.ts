import { useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  IEquipement,
  IMuscle,
} from '../../../../../store/reducers/execises-reducer';
import {
  equipementListSelector,
  muscleListSelector,
  tagListSelector,
} from '../../../../../store/selectors/execise-selector';
import { ITag } from '../../../../../types/types';
import ImportsReducer from './Imports-reducer';

export default props => {
  const { state, dispatchState } = ImportsReducer();
  const equipementList = useSelector(equipementListSelector);
  const muscleList = useSelector(muscleListSelector);
  const tagList = useSelector(tagListSelector);
  const route = useRoute<any>();
  const type = route.params?.type ?? null;
  const equipements = route.params?.equipments ?? [];
  const muscles = route.params?.muscles ?? [];
  const tags = route.params?.tags ?? [];

  const checkIsSubmitedEquipement = (id: number) => {
    for (let index = 0; index < state.isSubmitedEquipements.length; index++) {
      const isSubmitedEquipement = state.isSubmitedEquipements[index];
      if (isSubmitedEquipement.id == id) {
        return true;
      }
    }
    return false;
  };
  useEffect((() => {
    equipements.length > 0 && dispatchState({
      type: 'SET_ADD_EQUIPEMENTS',
      payload: equipements,
    });


  }), [equipements,]);
  useEffect(() => {
    muscles.length > 0 && dispatchState({ type: 'SET_ADD_MUSCLES', payload: muscles });
  }, [muscles])
  useEffect(() => {
    tags.length > 0 && dispatchState({ type: 'SET_ADD_TAGS', payload: tags });
  }, [tags])
  const addEquipement = (equipement: IEquipement) => {
    if (!checkIsSubmitedEquipement(equipement.id)) {
      dispatchState({
        type: 'SET_ADD_EQUIPEMENTS',
        payload: [...state.isSubmitedEquipements, equipement],
      });
    } else {
      let array = [...state.isSubmitedEquipements];
      const findIndex = array.findIndex(element => {
        return element.id == equipement.id;
      });
      array.splice(findIndex, 1);
      dispatchState({ type: 'SET_ADD_EQUIPEMENTS', payload: array });
    }
  };

  const checkIsSubmitedMuscle = (id: number) => {
    for (let index = 0; index < state.isSubmitedMuscles.length; index++) {
      const isSubmitedMuscle = state.isSubmitedMuscles[index];
      if (isSubmitedMuscle.id == id) {
        return true;
      }
    }
    return false;
  };

  const addMuscle = (muscle: IMuscle) => {
    if (!checkIsSubmitedMuscle(muscle.id)) {
      dispatchState({
        type: 'SET_ADD_MUSCLES',
        payload: [...state.isSubmitedMuscles, muscle],
      });
    } else {
      let array = [...state.isSubmitedMuscles];
      const findIndex = array.findIndex(element => {
        return element.id == muscle.id;
      });
      array.splice(findIndex, 1);
      dispatchState({ type: 'SET_ADD_MUSCLES', payload: array });
    }
  };
  const checkIsSubmitedTag = (id: number) => {
    for (let index = 0; index < state.isSubmitedTags.length; index++) {
      const isSubmitedTag = state.isSubmitedTags[index];
      if (isSubmitedTag.id === id) {
        return true;
      }
    }
    return false;
  };

  const addTag = (tag: ITag) => {
    if (!checkIsSubmitedTag(tag.id)) {
      dispatchState({
        type: 'SET_ADD_TAGS',
        payload: [...state.isSubmitedTags, tag],
      });
    } else {
      let array = [...state.isSubmitedTags];
      const findIndex = array.findIndex(element => {
        return element.id == tag.id;
      });
      array.splice(findIndex, 1);
      dispatchState({ type: 'SET_ADD_TAGS', payload: array });
    }
  };

  return {
    state,
    equipementList,
    checkIsSubmitedEquipement,
    addEquipement,
    muscleList,
    checkIsSubmitedMuscle,
    addMuscle,
    tagList,
    checkIsSubmitedTag,
    addTag,
    type,
  };
};
