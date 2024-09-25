import {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {NavigationParamList} from '../../../../navigation/ChatNavigation';
import {getFollowings} from '../../../../store/actions/followers-action';
import {followingsSelector} from '../../../../store/selectors/follower-selector';
import {
  profileSelector,
  searchInputSelector,
} from '../../../../store/selectors/profile-selector';
import {getSearchUsers} from '../../../../store/actions/profile-action';
import useSendMessage from '../useSendMessage';
import {debounce} from '../../../../utils/debounce';
import { Keyboard } from 'react-native';

type Props = NativeStackScreenProps<NavigationParamList, 'CHANNELLIST'>;

export default () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const {onPressToChat} = useSendMessage();
  const [inputValue, setInputValue] = useState<string>('');
  const followings = useSelector(followingsSelector);
  const user = useSelector(profileSelector);
  const [openSearch, setOpenSearch] = useState(false);
  const searchedUsers = useSelector(searchInputSelector);

  const handleItemPress = (type: string) => {
    switch (type) {
      case t(`newGroup`):
        navigation.navigate('ADDMEMBERS', {
          isNewCreating: true,
          isGroupChat: true,
        });
        break;
      case t(`newChannel`):
        navigation.navigate('ADDMEMBERS', {
          isReadOnly: true,
          isNewCreating: true,
        });
        break;
      case t(`newGroupFromPacks`):
        navigation.navigate('CHANNELFROMPACK', {
          newgroup: true,
        });
        break;
      case t(`newChannelFromPack`):
        navigation.navigate('CHANNELFROMPACK', {
          newchannel: true,
        });
        break;
    }
  };

  const handlerGoBack = useCallback(() => {
    navigation.goBack();
  }, []);

  useEffect(() => {
    dispatch(getFollowings());
  }, []);

  const handleShowSearching = useCallback(() => {
    setOpenSearch(!openSearch);
    setInputValue('');
  }, [openSearch]);

  const debounceSearch = debounce((text: string) => {
    setInputValue(text);
    dispatch(getSearchUsers(text));
  }, 500);

  const handleMoveToChat = useCallback((id: string) => {
    onPressToChat(id);
  }, []);

  const onPressToDismiss = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  return {
    t,
    onPressToDismiss,
    navigation,
    inputValue,
    user,
    handleItemPress,
    followings,
    handlerGoBack,
    handleShowSearching,
    openSearch,
    debounceSearch,
    searchedUsers,
    handleMoveToChat,
  };
};
