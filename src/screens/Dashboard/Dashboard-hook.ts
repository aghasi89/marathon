import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setIsNew } from '../../store/actions/registration-action';
import { storeData } from '../../utils/local_storage';

export default () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const navigateToHome = () => {
    storeData('isNew', 'no')
    dispatch(setIsNew('no'))
  }

  return {
    t,
    navigateToHome
  };
};
