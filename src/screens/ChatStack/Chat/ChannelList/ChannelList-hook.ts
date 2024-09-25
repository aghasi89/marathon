import {useCallback, useEffect, useMemo, useState} from 'react';
import {Animated, Keyboard} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {profileSelector} from '../../../../store/selectors/profile-selector';
import {NavigationParamList} from '../../../../navigation/ChatNavigation';
import {chatFeedsSelector} from '../../../../store/selectors/feed-selector';
import {chatClient} from '../../../../services/chatConfig';
import {getChatFeeds} from '../../../../store/actions/feed-action';
import {useAppContext} from '../../AppContext';
import {debounce} from '../../../../utils/debounce';
import { deleteAssistantChannelItem, getAssistantChannels } from '../../../../store/actions/assistant-actions';
import { assistantActiveSelector, assistantChannelsSelector } from '../../../../store/selectors/assistant-selector';

type Props = NativeStackScreenProps<NavigationParamList, 'CHANNELLIST'>;

export default () => {
  const isAssistantActive = useSelector(assistantActiveSelector);  
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const {setChannel, channel} = useAppContext();
  const user = useSelector(profileSelector);
  const chatfeeds = useSelector(chatFeedsSelector);
  const assistantChannels = useSelector(assistantChannelsSelector);
  const [showGroupChats, setShowGroupChats] = useState<boolean>(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [isExpanded, setIsExpanded] = useState<number>(-1);
  const [otherExpanded, setIsotherExpanded] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<
    `allChats` | 'personalChats' | `groupChats` | `assistant`
  >(isAssistantActive ? `assistant` : 'allChats');
  const [chatTypeFilter, setChatTypeFilter] = useState<
    undefined | 'messaging' | 'group'
  >(undefined);
  const tabFilter = [`allChats`, 'personalChats', `groupChats`, `assistant`];
  const [key, setKey] = useState(0);
  const [searchText, setSearchText] = useState<string>('');    

  useEffect(() => {
    if(isAssistantActive) {
      onSelectToAssistant(undefined);
    }
  },[isAssistantActive]);
  
  const feedFilter = {
    members: {
      $in: user?.get_stream_id ? [user.get_stream_id.toString()] : [],
    },
    isFeed: true,
  };
  const groupFilter: any = useMemo(() => {
    if (searchText === '') {
      return {
        members: {
          $in: user?.get_stream_id ? [user.get_stream_id.toString()] : [],
        },
        type: {$in: ['group', 'channel']},
        feedid: '',
        isFeed: false,
      };
    } else {
      return {
        $or: [
          {name: {$autocomplete: searchText}},
          {
            $and: [
              {type: 'messaging'},
              {'member.user.name': {$autocomplete: searchText}},
            ],
          },
        ],
        members: {
          $in: user?.get_stream_id ? [user.get_stream_id.toString()] : [],
        },
        type: {$in: ['group', 'channel']},
        feedid: '',
        isFeed: false,
      };
    }
  }, [searchText, user]);
  const filter: any = useMemo(() => {
    if (searchText === '') {
      return {
        members: {
          $in: user?.get_stream_id ? [user.get_stream_id.toString()] : [],
        },
        type: chatTypeFilter,
      };
    } else {
      return {
        $or: [
          {name: {$autocomplete: searchText}},
          {
            $and: [
              {type: 'messaging'},
              {'member.user.name': {$autocomplete: searchText}},
            ],
          },
        ],
        members: {
          $in: user?.get_stream_id ? [user.get_stream_id.toString()] : [],
        },
        type: chatTypeFilter,
      };
    }
  }, [searchText, chatTypeFilter, user]);

  useEffect(() => {
    chatClient.on(event => {
      if (event.type === 'channel.updated') {
        setKey(previousKey => previousKey + 1);
      }
    });
  }, [channel]);

  const fetchChannels = async () => {
    const channels = await chatClient.queryChannels(feedFilter);

    const feedIds = channels.map(channel => channel?.data?.feedid);
    const uniqueArray = feedIds.filter((item, index) => {
      return feedIds.indexOf(item) === index;
    });
    const payload = {
      feeds: uniqueArray,
    };
    dispatch(getChatFeeds(payload));
  };

  useEffect(() => {
    if(user) {
      dispatch(getAssistantChannels(user.id))
    }
  },[user])

  const onPressToDismiss = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const handlerSendMessage = useCallback(() => {
    navigation.navigate('NEWMESSAGE');
  }, []);

  const onSelect = useCallback(
    (channel: any) => {
      setChannel(channel);
      //@ts-ignore
      navigation.navigate('CHANNEL');
    },
    [navigation, setChannel],
  );

  const onSelectToAssistant = useCallback(
    (id: number | undefined) => {      
      //@ts-ignore
      navigation.navigate('ASSISTANT', {assistantId: id});
    },
    [navigation],
  );

  const handleDeleteAssistant = useCallback((id: number) => {
    dispatch(deleteAssistantChannelItem(id))
  }, [dispatch]);
  
  const debounceSearch = debounce((value: string) => {
    setSearchText(value);
  }, 1000);

  const handleFilterSelection = useCallback(
    (
      activeFilter: `allChats` | 'personalChats' | `groupChats` | `assistant`,
    ) => {
      setActiveFilter(activeFilter);
      setShowGroupChats(activeFilter === 'groupChats');
    },
    [activeFilter, showGroupChats],
  );

  const toggleAccordion = (index: number) => {
    setIsExpanded(isExpanded === index ? -1 : index);
    Animated.timing(animation, {
      toValue: isExpanded === index ? 0 : 1,
      duration: 300,
      //@ts-ignore
      useNativeDriver: false,
    }).start();
  };
  const toggleAnotherAccordeon = () => {
    setIsotherExpanded(!otherExpanded);
  };
  useEffect(() => {
    switch (activeFilter) {
      case `allChats`:
        setChatTypeFilter(undefined);
        break;
      case 'personalChats':
        setChatTypeFilter('messaging');
        break;
      case 'groupChats':
        setChatTypeFilter('group');
        break;
      default:
        break;
    }
  }, [activeFilter, chatTypeFilter]);

  useEffect(() => {
    fetchChannels();
  }, [showGroupChats]);

  return {
    onPressToDismiss,
    searchText,
    groupFilter,
    t,
    navigation,
    filter,
    tabFilter,
    activeFilter,
    channel,
    assistantChannels,
    showGroupChats,
    user,
    isExpanded,
    otherExpanded,
    chatfeeds,
    handlerSendMessage,
    handleFilterSelection,
    onSelect,
    onSelectToAssistant,
    handleDeleteAssistant,
    toggleAccordion,
    toggleAnotherAccordeon,
    key,
    dispatch,
    debounceSearch,
  };
};
