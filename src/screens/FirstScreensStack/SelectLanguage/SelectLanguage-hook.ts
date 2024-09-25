import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getCountry } from 'react-native-localize';
import { ILanguageItem } from '../../../types/types';
import { languagesSelector } from '../../../store/selectors/profile-selector';
import { languages } from '../../../store/actions/profile-action';
import { storeData } from '../../../utils/local_storage';
import { setIsNew } from '../../../store/actions/registration-action';
import { setShowSelectedLanguagePage } from '../../../store/actions/administrative-action';
import i18n from '../../../locale/i18n';

export default () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const languagesList = useSelector(languagesSelector)
  const [selectedLanguage, setSelectedLanguage] = useState<ILanguageItem | undefined>()
  const [languageModalVisibility, setLanguageModalVisibility] = useState<boolean>(false);
  const [country, setCountry] = useState('')

  useEffect(() => {
    if (languagesList) {
      if (country && languagesList?.filter((item) => item.code == country).length > 0) {
        return setSelectedLanguage(languagesList?.filter((item) => item.code == country)[0])
      } else {
        return setSelectedLanguage(languagesList?.filter(el => el.id == 1)[0])
      }
    }
  }, [languagesList, country])

  useEffect(() => {
    dispatch(languages())
    if (getCountry() == 'US') {
      setCountry('UK')
    } else {
      setCountry(getCountry())
    }
  }, [])

  const handleSave = useCallback(() => {
    storeData('selectedLanguage', selectedLanguage)
    i18n.changeLanguage(selectedLanguage?.code?.toLowerCase())
    storeData('isNew', 'no')
    dispatch(setIsNew('no'))
    dispatch(setShowSelectedLanguagePage(false))
  }, [selectedLanguage])

  const languageSelectHandle = useCallback(
    (language: ILanguageItem) => {
      setSelectedLanguage(language)
      setLanguageModalVisibility(false);
    },
    [],
  );

  const languageModalCloseHandle = useCallback(() => {
    setLanguageModalVisibility(false);
  }, []);

  const languageSelectButtonPressHandle = useCallback(() => {
    setLanguageModalVisibility(true);
  }, []);

  return {
    t,
    handleSave,
    languagesList,
    selectedLanguage,
    languageModalCloseHandle,
    languageSelectHandle,
    languageModalVisibility,
    languageSelectButtonPressHandle
  };
};
