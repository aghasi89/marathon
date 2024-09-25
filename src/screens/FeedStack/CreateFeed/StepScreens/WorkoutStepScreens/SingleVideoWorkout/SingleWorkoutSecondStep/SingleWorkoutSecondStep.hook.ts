import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {createFeedStateSelector} from '../../../../../../../store/selectors/create-feed-selector';
import {
  setCalorieAction,
  setWorkoutLevelAction,
  setWorkoutPermissionAction,
} from '../../../../../../../store/actions/createFeed-action';
import {WorkoutLevel} from '../../../../../../../types/enums';

export default () => {
  const {t} = useTranslation();
  const state = useSelector(createFeedStateSelector);
  const dispatch = useDispatch();
  const permissionSwitchOptons = [
    {label: t('public'), value: 'public'},
    {label: t('private'), value: 'private'},
  ];
  const caloriesValueChangeHandle = useCallback((value: string) => {
    dispatch(setCalorieAction(parseInt(value)));
  }, []);
  const levelSelectHandle = useCallback(
    (selected: WorkoutLevel) => {
      dispatch(setWorkoutLevelAction(selected));
    },
    [state],
  );
  const permissionValueChangeHandle = useCallback((value: string) => {
    if (value === 'public') {
      dispatch(setWorkoutPermissionAction(false));
    } else {
      dispatch(setWorkoutPermissionAction(true));
    }
  }, []);
  return {
    t,
    caloriesValueChangeHandle,
    levelSelectHandle,
    state,
    permissionSwitchOptons,
    permissionValueChangeHandle,
  };
};
