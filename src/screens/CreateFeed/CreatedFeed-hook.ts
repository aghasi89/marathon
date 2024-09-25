import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {createFeedModalVisibilitySelector} from '../../store/selectors/administrative-selector';
import {setCreateFeedModalVisibility} from '../../store/actions/administrative-action';
import { profileSelector } from '../../store/selectors/profile-selector';
import {IFeedMultiItem} from '../../types/types';
import {MainNavigationParamList} from '../../navigation/MainNavigation';
import { setAssistantActive } from '../../store/actions/assistant-actions';

type Props = NativeStackScreenProps<
  MainNavigationParamList,
  'CREATED_FEED_NAVIGATION'
>;

export default () => {
  const navigation = useNavigation<Props['navigation']>();
  const modalVisbility = useSelector(createFeedModalVisibilitySelector);
  const user = useSelector(profileSelector)
  const {t} = useTranslation();
  const dispatch = useDispatch();
 
  const modalCloseHandle = useCallback(() => {
    dispatch(setCreateFeedModalVisibility(false));
    navigation.goBack();
  }, [modalVisbility]);

  const handleCreateFeed = useCallback(
    (item: IFeedMultiItem) => {
      modalCloseHandle();
      if(item.code === "assistant") {
        dispatch(setAssistantActive(true));
        //@ts-ignore
        navigation.navigate('CHAT_NAVIGATION_STACK');
      }else {
      //@ts-ignore
      navigation.navigate(item.code !== 'workout' ? 'CREATE_FEED' : 'WORKOUT_TYPE_SELECT',
        {type: item.code},
      );
      }
    },
    [modalVisbility],
  );
  return {
    modalCloseHandle,
    handleCreateFeed,
    t,
    modalVisbility,
    user
  };
};
