import {useCallback, useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationParamList} from '../../../navigation/ExerciseNavigation';
import {
  getMyExercisesList,
  setExercise,
} from '../../../store/actions/feed-action';
import {myExercisesListSelector} from '../../../store/selectors/feed-selector';
import {downloadMediaFromBunny} from '../../../utils/bunny.net';

type Props = NativeStackScreenProps<NavigationParamList, 'EXERCISE'>;

export default () => {
  const navigation = useNavigation<Props['navigation']>();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const execisesList = useSelector(myExercisesListSelector);

  useEffect(() => {
    dispatch(getMyExercisesList());
  }, []);

  const createExercice = () => {
    //@ts-ignore
    navigation.navigate('CREATE_EXERCISE');
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(setExercise(undefined));
    });
    return unsubscribe;
  }, [navigation]);

  const goBack = () => {
    navigation.goBack();
  };

  const execisesListModalData = useMemo(
    () =>
      execisesList?.map(item => ({
        name: item.title,
        url: item.video
          ? downloadMediaFromBunny({
              public_key: item.video,
              mediaType: 'video',
              aspectRatio: item.size,
              userDir:item.creator,
              imageDir:'feed'
            })?.thumbnailURL
          : '',
        id: item.id,
        time: `${item.time} min`,
      })),
    [execisesList],
  );

  const onSearchInputValueChange = useCallback(() => {}, []);

  const onDotsIconPress = useCallback(() => {}, []);

  const moveDetailPage = useCallback((id: number) => {
    navigation.navigate('EXERCISE_DETAIL_PAGE', {id: id});
  }, []);

  return {
    t,
    createExercice,
    goBack,
    execisesList,
    execisesListModalData,
    onSearchInputValueChange,
    onDotsIconPress,
    moveDetailPage,
  };
};
