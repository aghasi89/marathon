import {useCallback, useState, useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {
  IExercise,
  IWorkoutSelectedMultiItem,
} from '../../../../../../../types/types';
import {useDispatch, useSelector} from 'react-redux';
import {createFeedStateSelector} from '../../../../../../../store/selectors/create-feed-selector';
import {
  bodyPartsListSelector,
  equipmentsListSelector,
} from '../../../../../../../store/selectors/feed-selector';
import {
  getBodyPartsList,
  getEquipmentsList,
} from '../../../../../../../store/actions/feed-action';
import {
  setSelectedBodyPartsAction,
  setSelectedEquipmentsAction,
} from '../../../../../../../store/actions/createFeed-action';
import {downloadMediaFromBunny} from '../../../../../../../utils/bunny.net';
import {BunnyAdministrativeDirectories} from '../../../../../../../utils/bunny.net/bunnyConfig';

export default () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector(createFeedStateSelector);
  const bodyPartsList = useSelector(bodyPartsListSelector);
  const equipmentsList = useSelector(equipmentsListSelector);
  const [bodyPartModalVisibility, setBodyPartModalVisibility] =
    useState<boolean>(false);
  const [equipmentModalVisibility, setEquipmentModalVisibility] =
    useState<boolean>(false);

  useEffect(() => {
    dispatch(getEquipmentsList());
    dispatch(getBodyPartsList());
  }, []);

  const bodyPartButtonPressHandle = useCallback(() => {
    setBodyPartModalVisibility(true);
  }, []);
  const bodyPartModalCloseHandle = useCallback(() => {
    setBodyPartModalVisibility(false);
  }, []);
  const equipmentButtonPressHandle = useCallback(() => {
    setEquipmentModalVisibility(true);
  }, []);

  const equipmentsModalCloseHandle = useCallback(() => {
    setEquipmentModalVisibility(false);
  }, []);
  const equipmentsSearchValueChange = useCallback((value: string) => {}, []);
  const equipmentSelectHandle = useCallback(
    (selected?: IWorkoutSelectedMultiItem) => {
      let newList: IWorkoutSelectedMultiItem[] = state.selectedEquipments
        ? [...state.selectedEquipments]
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
      let newList: IWorkoutSelectedMultiItem[] = state.selectedEquipments
        ? [...state.selectedEquipments]
        : [];
      const index = newList.findIndex(el => el.id === deleteItem.id);
      newList.splice(index, 1);
      dispatch(setSelectedEquipmentsAction(newList));
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
  const handleChooseBodyParts = useCallback(
    (data: IExercise) => {
      var newArr = state.selectedBodyParts ? [...state.selectedBodyParts] : [];
      const index = newArr.findIndex(el => el.id === data?.id);
      if (index >= 0) {
        newArr.splice(index, 1);
      } else {
        newArr.push(data);
      }
      dispatch(setSelectedBodyPartsAction(newArr));
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
          customDir: BunnyAdministrativeDirectories.EQUIPMENT,
        })?.url,
        id: item.id,
      })),
    [equipmentsList],
  );
  const selectAllBodyParts = useCallback(() => {
    if (state.selectedBodyParts && state.selectedBodyParts.length == 14) {
      dispatch(setSelectedBodyPartsAction([]));
    } else {
      dispatch(setSelectedBodyPartsAction(bodyPartsList));
    }
  }, [state]);

  return {
    t,
    state,
    bodyPartButtonPressHandle,
    equipmentButtonPressHandle,
    equipmentsList,
    equipmentModalVisibility,
    equipmentsModalCloseHandle,
    equipmentsSearchValueChange,
    equipmentSelectHandle,
    equipmentDeletHandle,
    getDifference,
    handleChooseBodyParts,
    bodyPartModalVisibility,
    setBodyPartModalVisibility,
    bodyPartsList,
    bodyPartModalCloseHandle,
    equipmentModalData,
    selectAllBodyParts,
  };
};
