import {useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationParamList} from '../../../navigation/ExerciseNavigation';
import {
  myExercisesListSelector,
  selectedExerciseSelector,
} from '../../../store/selectors/feed-selector';
import {IExercise, ISelectedFeedData} from '../../../types/types';
import {downloadMediaFromBunny} from '../../../utils/bunny.net';
import {
  deleteExercise,
  getExercise,
  getMyExercisesList,
  setExercise,
} from '../../../store/actions/feed-action';
import {BunnyAdministrativeDirectories} from '../../../utils/bunny.net/bunnyConfig';

type Props = NativeStackScreenProps<
  NavigationParamList,
  'EXERCISE_DETAIL_PAGE'
>;

export default () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const execisesList = useSelector(myExercisesListSelector);
  const selectedExercise = useSelector(selectedExerciseSelector);
  const {id} = route.params;
  const [actionSheetVisibility, setActionSheetVisibility] =
    useState<boolean>(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getExercise(id));
    }
  }, [id]);

  const goBack = () => {
    dispatch(setExercise(undefined));
    navigation.goBack();
  };

  const onDotsIconPress = useCallback(() => {
    setActionSheetVisibility(true);
  }, []);

  const data = useMemo(() => {
    if (selectedExercise) {
      const coverMedia = downloadMediaFromBunny({
        public_key: selectedExercise?.video || '',
        mediaType: 'video',
        aspectRatio: selectedExercise.size,
        userDir: selectedExercise.creator,
        imageDir: 'feed',
      });
      const feedData: ISelectedFeedData = {
        mediaData: {
          mediaList: [
            {
              url: coverMedia?.url ?? '',
              thumbnail: coverMedia?.thumbnailURL ?? '',
              animationURL: coverMedia?.previewAnimationURL ?? '',
              size: selectedExercise.size ?? '16:9',
              type: 'video',
              uploadingProgress: 100,
              inProgress: false,
            },
          ],
        },
        description: selectedExercise.description ?? '',
      };
      return feedData;
    }
  }, [selectedExercise]);

  const getDifference = (array1: any[], array2?: IExercise[]) => {
    if (array1.length > 0 && array2 && array2.length > 0) {
      return array1.filter(object1 => {
        return array2.some(object2 => {
          return object1.id === object2.id;
        });
      });
    } else {
      return [];
    }
  };

  const actionSheetCloseHandle = useCallback(() => {
    setActionSheetVisibility(false);
  }, []);

  const editPressHandle = useCallback(() => {
    setActionSheetVisibility(false);
    //@ts-ignore
    navigation.navigate('CREATE_EXERCISE');
  }, []);

  const deletePressHandle = useCallback(() => {
    setActionSheetVisibility(false);
    setLoader(true);
    dispatch(
      deleteExercise(selectedExercise.id, () => {
        dispatch(getMyExercisesList());
        setLoader(false);
        dispatch(setExercise(undefined));
        navigation.goBack();
      }),
    );
  }, [selectedExercise]);

  const equipmentModalData = useMemo(() => {
    if (selectedExercise && selectedExercise?.equipments) {
      return selectedExercise.equipments.map(item => ({
        name: item.name_en,
        url: downloadMediaFromBunny({
          public_key: item.image,
          mediaType: 'image',
          customDir: BunnyAdministrativeDirectories.EQUIPMENT,
        })?.url,
        id: item.id,
      }));
    } else {
      return [];
    }
  }, [selectedExercise]);

  return {
    t,
    goBack,
    execisesList,
    onDotsIconPress,
    data,
    selectedExercise,
    getDifference,
    actionSheetCloseHandle,
    editPressHandle,
    deletePressHandle,
    actionSheetVisibility,
    loader,
    equipmentModalData,
  };
};
