import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { measurmentsListSelector } from '../../../../../../store/selectors/feed-selector';
import { IFeedMultiItem } from '../../../../../../types/types';
import { getData } from '../../../../../../utils/local_storage';
import { setQuestionAction, setSelectedMeasurementAction } from '../../../../../../store/actions/createFeed-action';
import { createFeedStateSelector } from '../../../../../../store/selectors/create-feed-selector';

export default () => {
  const { t } = useTranslation();
  const state = useSelector(createFeedStateSelector)
  const dispatch = useDispatch()
  const questionInputRef = useRef<any>();
  const measurmentsList = useSelector(measurmentsListSelector);
  const [measurementModalVisibility, setMeasurementModalVisibility] =
    useState<boolean>(false);
  const [language, setLanguage] = useState<number | undefined>()

  useEffect(() => {
    getData('selectedLanguage').then(language => {
      if (language) {
        setLanguage(language.id)
      }
    })
  }, [])

  const measurmentText = (item: any) => {
    switch (language?.toString()) {
      case '2':
        return item.name_fr;
      case '4':
        return item.name_en;
      case '1':
        return item.name_hy;
      case '3':
        return item.name_ru;
      default:
        return item.name_en
    }
  }

  const measurmentsSelectButtonPressHandle = useCallback(() => {
    setMeasurementModalVisibility(true);
  }, []);

  const questionInputValuChangeHandle = useCallback(
    (text: string, index: number) => {
      const questionsList = state?.coach_question
        ? [...state?.coach_question]
        : [];
      questionsList[index] = { ...questionsList[index], text };
      dispatch(setQuestionAction(questionsList));
    },
    [state.coach_question],
  );

  const addquestionButtonPressHandle = useCallback(() => {
    dispatch(
      setQuestionAction(
        state?.coach_question
          ? [...state?.coach_question, { text: '' }]
          : [{ text: '' }],
      ),
    );
    // questionInputRef.current.focus();
  }, [state.coach_question]);

  const questionDeleteHandle = useCallback(
    (index: number) => {
      const newList = state.coach_question ? [...state.coach_question] : [];
      newList.splice(index, 1);
      dispatch(setQuestionAction(newList));
    },
    [state],
  );
  const measurementModalCloseHandle = useCallback(() => {
    setMeasurementModalVisibility(false);
  }, []);
  const measurementSelectHandle = useCallback(
    (item: IFeedMultiItem) => {
      let newList = state.selectedMeasurements
        ? [...state.selectedMeasurements]
        : [];
      const index = newList.findIndex(el => el.id === item.id);
      if (index >= 0) {
        newList.splice(index, 1);
      } else {
        if (item) newList = newList ? [...newList, item] : [item];
      }
      dispatch(setSelectedMeasurementAction(newList));
    },
    [state],
  );
  const measurementData = useMemo(() => {
    if (measurmentsList && language)
      return measurmentsList.map(el => ({
        ...el,
        name: measurmentText(el),
      }));
  }, [measurmentsList, language]);

  return {
    t,
    measurmentsSelectButtonPressHandle,
    questionInputValuChangeHandle,
    addquestionButtonPressHandle,
    questionDeleteHandle,
    state,
    measurementModalVisibility,
    measurementModalCloseHandle,
    measurementSelectHandle,
    measurementData,
    questionInputRef,
  };
};
