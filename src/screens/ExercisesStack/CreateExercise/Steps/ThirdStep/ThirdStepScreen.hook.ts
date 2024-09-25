import {useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {SheetManager} from 'react-native-actions-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {downloadMediaFromBunny} from '../../../../../utils/bunny.net';
import {IExercise, IWorkoutSelectedMultiItem} from '../../../../../types/types';
import {equipmentsListSelector} from '../../../../../store/selectors/feed-selector';
import {
  getBodyPartsList,
  getEquipmentsList,
} from '../../../../../store/actions/feed-action';
import {
  setBodyPartsAction,
  setErrorMessageAction,
  setSelectedEquipmentsAction,
} from '../../../../../store/actions/createExercise-action';
import {createExerciseStateSelector} from '../../../../../store/selectors/create-exercise-selector';
import { BunnyAdministrativeDirectories } from '../../../../../utils/bunny.net/bunnyConfig';

export interface IData {
  image: string;
  id: number;
}
export default () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const equipmentsList = useSelector(equipmentsListSelector);
  const state = useSelector(createExerciseStateSelector);
  const [equipmentModalVisibility, setEquipmentModalVisibility] =
    useState<boolean>(false);
  useEffect(() => {
    dispatch(getEquipmentsList());
    dispatch(getBodyPartsList());
  }, []);

  const openBodyPartsModal = useCallback(() => {
    SheetManager.show('bodyPartsSheet', {
      payload: {
        selectedes: state.body_parts,
        onSave: (selecteds: IExercise[]) => {
          dispatch(setBodyPartsAction(selecteds));
          if (selecteds.length > 0) {
            dispatch(
              setErrorMessageAction({...state.errorMessages, body_parts: ''}),
            );
          }
        },
      },
    });
  }, [state]);

  const handleChooseBodyParts = useCallback(
    (data: IExercise) => {
      var newArr = state.body_parts ? [...state.body_parts] : [];
      const index = newArr.findIndex(el => el.id === data?.id);
      if (index >= 0) {
        newArr.splice(index, 1);
      } else {
        newArr.push(data);
        dispatch(
          setErrorMessageAction({...state.errorMessages, body_parts: ''}),
        );
      }
      dispatch(setBodyPartsAction(newArr));
    },
    [state],
  );

  const getDifference = (array1: any[], array2?: IExercise[]) => {
    if (array1.length > 0 && array2 && array2.length > 0) {
      return array1.filter(object1 => {
        return array2.some(object2 => {
          return object1.id === object2.id;
        });
      });
    } else {
      return [];
    }
  };

  const equipmentButtonPressHandle = useCallback(() => {
    setEquipmentModalVisibility(true);
  }, []);

  const equipmentsModalCloseHandle = useCallback(() => {
    setEquipmentModalVisibility(false);
  }, []);

  const equipmentsSearchValueChange = useCallback((value: string) => {}, []);

  const equipmentSelectHandle = useCallback(
    (selected?: IWorkoutSelectedMultiItem) => {
      let newList: IWorkoutSelectedMultiItem[] = state.equipments
        ? [...state.equipments]
        : [];
      const index = newList.findIndex(el => el.id === selected?.id);
      if (index >= 0) {
        newList.splice(index, 1);
      } else {
        if (selected) newList = newList ? [...newList, selected] : [selected];
      }
      dispatch(setSelectedEquipmentsAction(newList));
    },
    [state],
  );

  const equipmentDeletHandle = useCallback(
    (deleteItem: IWorkoutSelectedMultiItem) => {
      if (state.equipments) {
        let newList: IWorkoutSelectedMultiItem[] = [...state.equipments];
        const index = newList.findIndex(el => el.id === deleteItem.id);
        newList.splice(index, 1);
        dispatch(setSelectedEquipmentsAction(newList));
      }
    },
    [state],
  );

  const equipmentModalData = useMemo(
    () =>
      equipmentsList?.map(item => ({
        name: item.name_en,
        url: downloadMediaFromBunny({
          public_key: item.image,
          mediaType: 'image',
          customDir:BunnyAdministrativeDirectories.EQUIPMENT
        })?.url,
        id: item.id,
      })),
    [equipmentsList],
  );

  return {
    t,
    state,
    handleChooseBodyParts,
    openBodyPartsModal,
    getDifference,
    equipmentButtonPressHandle,
    equipmentDeletHandle,
    equipmentsList,
    equipmentsSearchValueChange,
    equipmentModalVisibility,
    equipmentsModalCloseHandle,
    equipmentSelectHandle,
    equipmentModalData,
  };
};
