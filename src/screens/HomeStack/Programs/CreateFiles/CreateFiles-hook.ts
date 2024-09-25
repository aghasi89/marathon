import {useRoute, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {programDaySelector} from '../../../../store/selectors/programs-selector';
import {setDays} from '../../../../store/actions/program-action';
import CreateFilesReducer from './CreateFiles-reducer';

export default props => {
  const {state, dispatchState} = CreateFilesReducer();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isOpenEditSheet, setIsOpenEditSheet] = useState<boolean>(false);
  const days = useSelector(programDaySelector);

  const route = useRoute<any>();
  const dayIndex = route.params?.dayIndex ?? null;
  const fileList = route.params?.fileList ?? [];

  useEffect(() => {
    if (fileList.length > 0) {
      dispatchState({
        type: 'SET_FILE',
        payload: fileList,
      });
    }
  }, [fileList]);

  const deleteFile = (index: number) => {
    let list = [...state.files];
    list.splice(index, 1);
    dispatchState({
      type: 'SET_FILE',
      payload: {...state, files: list},
    });
  };

  const importFiles = () => {
    let array = [...days];
    ImagePicker.openPicker({
      multiple: false,
    }).then(images => {
      array[dayIndex].files = [
        ...array[dayIndex].files,
        {fileName: images.path, fileType: images.path},
      ];
    });
    dispatch(setDays(array));
  };

  const onSelect = () => {
    setIsOpenEditSheet(false);
  };
  const openEditSheet = useCallback(() => {
    setIsOpenEditSheet(!isOpenEditSheet);
  }, [isOpenEditSheet]);

  const leftIconPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    state,
    days,
    deleteFile,
    importFiles,
    dayIndex,
    isOpenEditSheet,
    setIsOpenEditSheet,
    onSelect,
    openEditSheet,
    leftIconPress,
  };
};
