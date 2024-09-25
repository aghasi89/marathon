import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useStripe } from '@stripe/stripe-react-native';
import { profileSelector } from '../../../../store/selectors/profile-selector';
import AnalyticService from '../../../../utils/analytics/AnalyticService';
import { setError } from '../../../../store/actions/administrative-action';
import {
  feedListSelector,
  selectedFeedSelector,
} from '../../../../store/selectors/feed-selector';
import {
  getFeedByIdAction,
  setFeedListAction,
  setSelectedFeedAction,
} from '../../../../store/actions/feed-action';
import { IFeedJoinMember } from '../../../../types/types';

export default (data: any, handleBack: () => void) => {
  const navigation = useNavigation();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selectedFeed = useSelector(selectedFeedSelector);
  const feedList = useSelector(feedListSelector);
  const user = useSelector(profileSelector);
  const [maxCalls, setMaxCalls] = useState<number>(0)
  const [loader, setLoader] = useState(false)

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      paymentIntentClientSecret: data.token,
      allowsDelayedPaymentMethods: false,
    });
    setLoader(true)
    const { error: errorPresent } = await presentPaymentSheet();
    if (errorPresent) {
      handleBack()
      Alert.alert(errorPresent.message);
    } else {
      paymentSuccessfullyFinished()
    }
  };

  useEffect(() => {
    if (data.type == 'stripe' && selectedFeed && maxCalls < 1) {
      setMaxCalls(c => c + 1)
      setTimeout(() => {
        initializePaymentSheet();
      }, 500)
    }
  }, [data, selectedFeed, maxCalls]);

  useEffect(() => {
    data.id &&
      //@ts-ignore
      dispatch(getFeedByIdAction({ type: 'feed', id: data.id }));
  }, [data]);
  const openChannel = useCallback(async () => {
    if (selectedFeed?.chat_type && selectedFeed?.channel_id) {
      //@ts-ignore
      navigation.navigate('CHANNEL', {
        channelId: selectedFeed?.channel_id,
        type: selectedFeed?.chat_type,
      });
    }
  }, [selectedFeed]);

  const paymentSuccessfullyFinished = useCallback(() => {
    const newList = [...feedList];
    const index = newList.findIndex(el => el.id === selectedFeed?.feed?.id);
    if (index > -1 && user) {
      const newMember: IFeedJoinMember = {
        id: selectedFeed?.feed?.creator ?? -1,
        created_at: moment().toDate(),
        feed_id: selectedFeed?.id ?? -1,
        status: '',
        user: user,
      };
      newList[index].members = newList[index].members
        ? [...newList[index].members, newMember]
        : [newMember];
      dispatch(setFeedListAction(newList));
      dispatch(
        setSelectedFeedAction({
          ...selectedFeed,
          members: selectedFeed?.members
            ? [...selectedFeed?.members, newMember]
            : [newMember],
        }),
      );
    }
    handleBack()
    if (
      selectedFeed?.type === 'package' &&
      (!!selectedFeed?.coach_question?.length ||
        !!selectedFeed?.measurement?.length)
    ) {
      //@ts-ignore
      navigation.navigate('ANSWER_COACH_QUESTIONS', { id: data?.id });
    } else {
      openChannel();
    }
    if (selectedFeed?.id && selectedFeed?.type === 'package')
      AnalyticService.packageJoin(
        selectedFeed?.id,
        selectedFeed?.price ?? '0',
      );
    else if (selectedFeed?.id && selectedFeed?.type === 'live')
      AnalyticService.liveJoin(selectedFeed?.id, selectedFeed?.price ?? '0');
    dispatch(
      setError({
        title: `${t('congratulations')} !`,
        buttonTitle: t('close'),
        text: t('paymentComletedSuccessfully'),
      }),
    );
  }, [selectedFeed, feedList, user, data])

  const onMessage = useCallback(
    ({ nativeEvent }: { nativeEvent: { data: string } }) => {
      if (nativeEvent.data === 'succeed') {
        paymentSuccessfullyFinished()
      } else if (nativeEvent.data === 'finish') {
        handleBack()
        dispatch(
          setError({
            title: `${t('congratulations')} !`,
            buttonTitle: t('close'),
            text: t('paymantMethodeSuccessfullyCreated'),
          }),
        );
      }
    },
    [selectedFeed, feedList, user, data],
  );

  return {
    data,
    onMessage,
    handleBack,
    selectedFeed,
    feedList,
    user,
    loader
  };
};
