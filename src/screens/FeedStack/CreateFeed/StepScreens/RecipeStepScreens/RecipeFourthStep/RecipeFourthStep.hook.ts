import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {
  setCarbsAction,
  setDurationAction,
  setErrorMessageAction,
  setFatAction,
  setIsMoreInfoAction,
  setKcalMeasurementAction,
  setMeasurementSelectedUnitAction,
  setPortionAction,
  setProteinAction,
  setServingSizeAction,
  setTotalKcalAction,
  setUnitOfMeasurementAction,
  setWorkoutPermissionAction,
} from '../../../../../../store/actions/createFeed-action';
import {createFeedStateSelector} from '../../../../../../store/selectors/create-feed-selector';
import {getFeedMeasurmentUnitsListAction} from '../../../../../../store/actions/feed-action';
import {measurmentUnitsListSelector} from '../../../../../../store/selectors/feed-selector';
import {IFeedMultiItem} from '../../../../../../types/types';

export default () => {
  const {t} = useTranslation();
  const state = useSelector(createFeedStateSelector);
  const dispatch = useDispatch();
  const measurementUnitsList = useSelector(measurmentUnitsListSelector);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [measurementModalVisibility, setMeasurementModalVisibility] =
    useState<boolean>(false);
  const [selectedMeasurment, setSelectedMeasurment] = useState<number[]>([1]);
  const permissionSwitchOptons = [
    {label: t('public'), value: 'public'},
    {label: t('private'), value: 'private'},
  ];
  const measurmentsList: IFeedMultiItem[] = [
    {
      id: 1,
      name: t('per-serving') ?? '',
    },
    {
      id: 2,
      name: t('for-100-grams') ?? '',
    },
  ];

  useEffect(() => {
    dispatch(getFeedMeasurmentUnitsListAction());
  }, []);

  const proteinValueChange = useCallback(
    (count: string) => {
      const Kcal = calcCalories(
        count ? parseInt(count) : undefined,
        state.fat,
        state.carbohydrates,
      );
      dispatch(setTotalKcalAction(Kcal));
      dispatch(setProteinAction(count ? parseInt(count) : undefined));
      if (parseInt(count) > 0)
        dispatch(setErrorMessageAction({...state.errorMessages, protein: ''}));
    },
    [state],
  );
  const carbsValueChange = useCallback(
    (count: string) => {
      const Kcal = calcCalories(
        state.protein,
        state.fat,
        count ? parseInt(count) : undefined,
      );
      dispatch(setTotalKcalAction(Kcal));
      dispatch(setCarbsAction(count ? parseInt(count) : undefined));
      if (parseInt(count) > 0)
        dispatch(
          setErrorMessageAction({...state.errorMessages, carbohydrates: ''}),
        );
    },
    [state],
  );
  const fatValueChange = useCallback(
    (count: string) => {
      const Kcal = calcCalories(
        state.protein,
        count ? parseInt(count) : undefined,
        state.carbohydrates,
      );
      dispatch(setTotalKcalAction(Kcal));
      dispatch(setFatAction(count ? parseInt(count) : undefined));
      if (parseInt(count) > 0)
        dispatch(setErrorMessageAction({...state.errorMessages, fat: ''}));
    },
    [state],
  );
  const measurementButtonPressHandle = useCallback(() => {
    setSelectedMeasurment(state.kcal_measurement === 'per-serving' ? [1] : [2]);
    setModalVisibility(true);
  }, [state]);
  const modalCloseHandle = useCallback(() => {
    setModalVisibility(false);
  }, []);
  const measurementSelectHandle = useCallback((selected: IFeedMultiItem) => {
    if (selected.id) {
      dispatch(
        setKcalMeasurementAction(
          selected.id === 1 ? 'per-serving' : 'for-100-grams',
        ),
      );
    }
    setModalVisibility(false);
  }, []);
  const calcCalories = useCallback(
    (protein?: number, fat?: number, carbs?: number) => {
      return 4 * (protein ?? 0) + 9 * (fat ?? 0) + 4 * (carbs ?? 0);
    },
    [state],
  );
  const portionValueChangeHandle = useCallback((count: string) => {
    dispatch(setPortionAction(count ? parseInt(count) : undefined));
  }, []);
  const servingSizeValueChangeHandle = useCallback((count: string) => {
    dispatch(setServingSizeAction(count ? parseInt(count) : undefined));
  }, []);
  const measurementUnitSelectButtonPressHandle = useCallback(() => {
    setMeasurementModalVisibility(true);
  }, []);
  const measurementUnitModalCloseHandle = useCallback(() => {
    setMeasurementModalVisibility(false);
  }, []);
  const measurementUnitSelectHandle = useCallback((unit: IFeedMultiItem) => {
    dispatch(setMeasurementSelectedUnitAction(unit));
    dispatch(setUnitOfMeasurementAction(unit.id));
    setMeasurementModalVisibility(false);
  }, []);

  const moreInfoButtonPressHandle = useCallback(() => {
    dispatch(setIsMoreInfoAction(!state.is_more));
    if (!state.is_more) {
      dispatch(setPortionAction(undefined));
      dispatch(setServingSizeAction(undefined));
      dispatch(setUnitOfMeasurementAction(undefined));
    }
  }, [state]);
  const durationChangeHandle = useCallback(
    (duration?: string) => {
      dispatch(setDurationAction(duration ? parseInt(duration) : undefined));
      dispatch(setErrorMessageAction({...state.errorMessages, duration: ''}));
    },
    [state],
  );
  const permissionValueChangeHandle = useCallback(
    (value: string) => {
      if (value === 'public') {
        dispatch(setWorkoutPermissionAction(false));
      } else {
        dispatch(setWorkoutPermissionAction(true));
      }
    },
    [state],
  );
  return {
    t,
    state,
    proteinValueChange,
    carbsValueChange,
    fatValueChange,
    modalVisibility,
    modalCloseHandle,
    measurementSelectHandle,
    measurmentsList,
    measurementButtonPressHandle,
    selectedMeasurment,
    portionValueChangeHandle,
    servingSizeValueChangeHandle,
    measurementUnitSelectButtonPressHandle,
    measurementModalVisibility,
    measurementUnitModalCloseHandle,
    measurementUnitSelectHandle,
    measurementUnitsList,
    moreInfoButtonPressHandle,
    durationChangeHandle,
    permissionSwitchOptons,
    permissionValueChangeHandle,
  };
};
