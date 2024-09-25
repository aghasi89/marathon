import { Dispatch, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { selectedFeedSelector } from '../../../../store/selectors/feed-selector';
import {
  getFeedByIdAction,
  setCoachQuestionAnswerAction,
} from '../../../../store/actions/feed-action';
import { profileSelector } from '../../../../store/selectors/profile-selector';
import { setError } from '../../../../store/actions/administrative-action';
import { MainNavigationParamList } from '../../../../navigation/MainNavigation';
import { IRequestStatusType } from '../../../../types/types';
import { chatClient } from '../../../../services/chatConfig';
import { useAppContext } from '../../../ChatStack/AppContext';
import AnswersReducer, {
  IAnswerState,
} from './CoachQuestionsAnswersReducer/AnswersReducer';
import { setAnswerStateAction } from './CoachQuestionsAnswersReducer/AnswersAction';

type StateType = {
  state?: IAnswerState;
  dispatchState: Dispatch<any>;
};

type Props = NativeStackScreenProps<
  MainNavigationParamList,
  'ANSWER_COACH_QUESTIONS'
>;
export default () => {
  const navigation = useNavigation<Props['navigation']>();
  const { state, dispatchState }: StateType = AnswersReducer();
  const user = useSelector(profileSelector);
  const route = useRoute<Props['route']>();
  const dispatch = useDispatch();
  const selectedFeed = useSelector(selectedFeedSelector);
  const { t } = useTranslation();
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const { id } = route?.params;

  useEffect(() => {
    if (id)
      dispatch(
        getFeedByIdAction({
          id,
          type: 'feed',
          cb: () => {
            setLoading(false);
          },
        }),
      );
  }, []);

  useEffect(() => {
    if (
      selectedFeed &&
      (!!!state?.measurments?.length || !!!state?.coach_question?.length)
    ) {
      dispatchState(
        setAnswerStateAction({
          measurments: selectedFeed.measurement,
          coach_question: selectedFeed.coach_question,
        }),
      );
    }
  }, [selectedFeed]);

  const backIconPressHandle = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const stepButtonPressHandle = useCallback((type: 'next' | 'previous') => {
    setSelectedStepIndex(current => {
      if (type === 'next') {
        return current + 1;
      } else {
        return current - 1;
      }
    });
  }, []);

  const saveButtonPressHandle = useCallback(() => {
    if (!inProgress&&id && user?.id)
    setInProgress(true)
      dispatch(
        setCoachQuestionAnswerAction(
          {
            feed: id??0,
            user: user?.id??0,
            measurement_answer: JSON.stringify({
              coach_questions: state?.coach_question?.map(el => ({
                id: el.answer?.id,
                answer: el.answer?.answer,
              })),
              measurements: state?.measurments?.map(el => ({
                id: el.measurement_answer?.id,
                answer: el.measurement_answer?.answer,
              })),
            }),
          },
          (status: IRequestStatusType) => {
            if (status === 'success') {
              navigation.goBack()
              openChannel();
            } else {
              dispatch(
                setError({
                  title: `${t('error')}`,
                  buttonTitle: t('close'),
                  text: t('somethingWrong'),
                }),
              );
            }
            setInProgress(false)
          },
        ),
      );
  }, [state,inProgress]);

  const openChannel = useCallback(async () => {
    if (selectedFeed.chat_type && selectedFeed.channel_id) {
      //@ts-ignore
      navigation.navigate('CHANNEL', {
        channelId: selectedFeed.channel_id,
        type: selectedFeed.chat_type
      });
    }
  }, [selectedFeed]);
  return {
    t,
    dispatchState,
    selectedStepIndex,
    state,
    backIconPressHandle,
    selectedFeed,
    stepButtonPressHandle,
    saveButtonPressHandle,
    loading,
    inProgress
  };
};
