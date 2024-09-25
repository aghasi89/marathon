import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {MainNavigationParamList} from '../../../../../../navigation/MainNavigation';
import {
  deleteAssistantById,
  editAssistant,
  getAssistantById,
  getAssistantChannels,
} from '../../../../../../store/actions/assistant-actions';
import {profileSelector} from '../../../../../../store/selectors/profile-selector';

type Props = NativeStackScreenProps<MainNavigationParamList, 'EDIT_ASSISTANT'>;

export default () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const user = useSelector(profileSelector);
  const {assistantId, assistantTitle} = route?.params!;
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setInputValue(assistantTitle);
  }, [assistantTitle]);

  const handleEditAssistant = useCallback(() => {
    if (inputValue) {
      dispatch(
        editAssistant(assistantId, inputValue, () => {
          dispatch(deleteAssistantById());
          dispatch(
            getAssistantById(assistantId, 1, () => {
              navigation.goBack();
            }),
          );
          user && dispatch(getAssistantChannels(user.id));
        }),
      );
    }
  }, [dispatch, assistantId, inputValue, user]);

  const onChangeGroupName = useCallback(
    (value: string) => {
      setInputValue(value);
    },
    [inputValue],
  );

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    t,
    inputValue,
    onChangeGroupName,
    loading,
    handleCancel,
    handleEditAssistant,
  };
};
