import {useCallback, useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {selectedFeedSelector} from '../../../../store/selectors/feed-selector';
import {MainNavigationParamList} from '../../../../navigation/MainNavigation';
import {IAnswerItem, IFeedJoinMember} from '../../../../types/types';

type listData = {
  question?: string;
  answer?: string;
};

type Props = NativeStackScreenProps<
  MainNavigationParamList,
  'JOINED_MEMBER_DETAILS'
>;
export default () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const {t} = useTranslation();
  const selectedFeed = useSelector(selectedFeedSelector);
  const [selectedMember, setSelectedMember] = useState<
    IFeedJoinMember | undefined
  >(undefined);
  const {memberId} = route?.params;

  useEffect(() => {
    memberId &&
      setSelectedMember(
        selectedFeed.members?.find(el => el.user.id === memberId),
      );
  }, []);

  const backIconPressHandle = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const dataList = useMemo(() => {
    let data: {
      measurementData: listData[] | undefined;
      coachQuestionData: listData[] | undefined;
    } = {measurementData: [], coachQuestionData: []};
    const answers: IAnswerItem = selectedMember?.measurement_answer
      ? JSON.parse(selectedMember?.measurement_answer)
      : '';
    data.measurementData = selectedFeed?.measurement?.map(el => ({
      question: el.name_en,
      answer: `${
        answers?.measurements?.find(item => item.id === el.id)?.answer??'- '
      } ${el.unit_of_measurement?.name_en}`,
    }));
    data.coachQuestionData = selectedFeed?.coach_question?.map(el => ({
      question: el.text,
      answer: `${
        answers?.coach_questions?.find(item => item.id === el.id)?.answer??'- '
      }`,
    }));
    return data;
  }, [selectedMember, selectedFeed]);

  return {
    t,
    backIconPressHandle,
    selectedFeed,
    selectedMember,
    dataList,
  };
};
