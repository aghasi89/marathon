import {useTranslation} from 'react-i18next';
import {WorkoutLevel} from '../../../../../types/enums';
import {
  setDuration,
  setErrorMessageAction,
  setLevel,
} from '../../../../../store/actions/createExercise-action';
import {useDispatch, useSelector} from 'react-redux';
import {createExerciseStateSelector} from '../../../../../store/selectors/create-exercise-selector';

export default () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector(createExerciseStateSelector);

  const handleChangeDuration = (data: number) => {
    if (data) {
      dispatch(setDuration(data.toString().split('.')[0]));
      dispatch(setErrorMessageAction({...state.errorMessages, duration: ''}));
    }
  };

  const levelSelectHandle = (selected: WorkoutLevel) => {
    dispatch(setLevel(selected));
  };

  return {
    t,
    state,
    handleChangeDuration,
    levelSelectHandle,
  };
};
