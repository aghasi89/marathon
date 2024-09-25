import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useChatContext } from 'stream-chat-react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { chatClient } from '../../../../services/chatConfig';
import { NavigationParamList } from '../../../../navigation/ChatNavigation';
import { IError, IFollower } from '../../../../types/types';
import {
  setError,
  uploadImageToBunnyAction,
} from '../../../../store/actions/administrative-action';
import { downloadMediaFromBunny } from '../../../../utils/bunny.net';
import {
  followingsSelector,
  profileSelector,
  searchInputSelector,
} from '../../../../store/selectors/profile-selector';
import { selectedFeedSelector } from '../../../../store/selectors/feed-selector';
import { getFeedByIdAction } from '../../../../store/actions/feed-action';
import { getFollowings } from '../../../../store/actions/profile-action';
import { useAppContext } from '../../AppContext';
import videoLink from '../../../../utils/videoLink';
import { Keyboard } from 'react-native';

type Props = NativeStackScreenProps<NavigationParamList, 'ADDMEMBERS'>;

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const { t } = useTranslation();
  const { client } = useChatContext();
  const { setChannel, channel } = useAppContext();
  const route = useRoute<Props['route']>();
  const {
    isNewCreating,
    isReadOnly,
    feedId,
    isGroupFromPack,
    isGroupChat,
    isChannelFromPack,
  } = route?.params!;
  const [inputValue, setInputValue] = useState<string>('');
  const [groupName, setGroupName] = useState<string>('');
  const [groupImage, setGroupImage] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const searchedUsers = useSelector(searchInputSelector);
  // const selectedFeed = useSelector(selectedFeedSelector);
  const followings = useSelector(followingsSelector);
  const user = useSelector(profileSelector);  
  
  // useEffect(() => {
  //   feedId &&
  //     'feed' &&
  //     dispatch(
  //       getFeedByIdAction({
  //         id: feedId,
  //         type: 'feed',
  //       }),
  //     );
  // }, [feedId]);

  useEffect(() => {
    user && dispatch(getFollowings(user?.id));
  }, []);
  useEffect(() => {    
    setSearchResults(followings);
  }, [followings]);

  // const handleSearch = useCallback(
  //   (text: string) => {
  //     setInputValue(text)
  //     dispatch(getSearchUsers(text))
  //   },
  //   [inputValue],
  // );

  const handleSearch = useCallback(
    (text: string) => {
      setInputValue(text);
      const filteredUsers = followings.filter((user: IFollower) => {
        return user.whom_user.user.first_name
          .toLowerCase()
          .includes(text.toLowerCase());
      });
      setSearchResults(filteredUsers);
    },
    [followings, searchResults],
  );

  const onPressToDismiss = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const toggleSelectedItem = useCallback(
    (item: IFollower) => {
      const ids = selectedItems.map(obj => {
        return obj.whom_user.get_stream_id;
      });
      if (ids.includes(item.whom_user.get_stream_id)) {
        setSelectedItems(
          selectedItems.filter(
            el => el.whom_user.get_stream_id !== item.whom_user.get_stream_id,
          ),
        );
      } else {
        setSelectedItems([...selectedItems, item]);
      }
    },
    [selectedItems],
  );
  const handlerOnPressCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handlerModalOnPressCancel = useCallback(async () => {
    setGroupImage('');
    setGroupName('');
    setVisible(false);
  }, [groupImage, groupName, visible]);

  // const createChannel = async (
  //   selectedItems: any,
  //   channelType: string,
  //   isReadOnly?: boolean,
  // ) => {
  //   const channelId = `${channelType}-${Date.now()}`;
  //   const userIds = selectedItems?.map((item: IFollower) =>
  //     item.whom_user?.get_stream_id?.toString(),
  //   );
  //   setCreateLoading(true);
  //   try {
  //     if (isGroupFromPack || isChannelFromPack) {
  //       const channel = chatClient.channel(channelType, channelId, {
  //         members: [client.userID, ...userIds],
  //         readOnly: isReadOnly || false,
  //         name: groupName ? groupName : selectedFeed.feed?.title,
  //         creator: user?.id,
  //         image: image
  //           ? downloadMediaFromBunny({
  //             public_key: image,
  //             mediaType: 'image',
  //             userDir: selectedFeed?.feed?.creator,
  //             imageDir: 'feed',
  //           })?.url
  //           : selectedFeed?.feed?.media[0].type === 'videoLink'
  //             ? videoLink(selectedFeed?.feed?.media[0].url)
  //             : selectedFeed?.feed?.media[0].type === 'video'
  //               ? downloadMediaFromBunny({
  //                 public_key: selectedFeed?.feed?.media[0].url,
  //                 mediaType: selectedFeed?.feed?.media[0].type,
  //                 userDir: selectedFeed?.feed?.creator,
  //                 imageDir: 'feed',
  //               })?.thumbnailURL
  //               : downloadMediaFromBunny({
  //                 public_key: selectedFeed?.feed?.media[0].url,
  //                 mediaType: selectedFeed?.feed?.media[0].type,
  //                 userDir: selectedFeed?.feed?.creator,
  //                 imageDir: 'feed',
  //               })?.url,
  //         feedid: feedID,
  //         isFeed: true,
  //       });
  //       await channel.create();
  //       await channel.watch();
  //       setChannel(channel);
  //     } else {
  //       const channel = chatClient.channel(channelType, channelId, {
  //         members: [client.userID, ...userIds],
  //         readOnly: isReadOnly || false,
  //         name: groupName,
  //         creator: user?.id,
  //         image: image
  //           ? downloadMediaFromBunny({
  //             public_key: image,
  //             mediaType: 'image',
  //             userDir: selectedFeed?.feed?.creator,
  //             imageDir: 'feed',
  //           })?.url
  //           : selectedFeed?.feed?.media[0].type === 'videoLink'
  //             ? videoLink(selectedFeed?.feed?.media[0].url)
  //             : selectedFeed?.feed?.media[0].type === 'video'
  //               ? downloadMediaFromBunny({
  //                 public_key: selectedFeed?.feed?.media[0].url,
  //                 mediaType: selectedFeed?.feed?.media[0].type,
  //                 userDir: selectedFeed?.feed?.creator,
  //                 imageDir: 'feed',
  //               })?.thumbnailURL
  //               : downloadMediaFromBunny({
  //                 public_key: selectedFeed?.feed?.media[0].url,
  //                 mediaType: selectedFeed?.feed?.media[0].type,
  //                 userDir: selectedFeed?.feed?.creator,
  //                 imageDir: 'feed',
  //               })?.url,
  //         feedid: '',
  //         isFeed: false,
  //       });
  //       await channel.create();
  //       await channel.watch();
  //       setChannel(channel);
  //       setCreateLoading(false);
  //     }
  //     setVisible(false);
  //     navigation.navigate('CHANNELLIST');
  //   } catch (error: any) {
  //     console.log(error);
  //     const data: IError = {
  //       title: 'Something went wrong ...',
  //       text: `${channelType === 'group' ? 'Chat' : 'Channel'} creation error `,
  //       buttonTitle: 'OK',
  //     };
  //     dispatch(setError(data));
  //   }
  // };

  const handlerOnPressNext = () => {
    const ids = selectedItems.map((obj: any) => obj?.whom_user?.id);    
    navigation.navigate('GROUPDETAIL', {
      selectedIds: ids,
      isNewCreating,
      isReadOnly,
      feedId,
      isGroupFromPack,
      isGroupChat,
      isChannelFromPack,
    });
  };

  const handlerAddUserList = useCallback(async () => {
    const channelState = channel?.state;
    const members =
      channelState &&
      Object.values(channelState.members).map(member => member?.user?.id);
    const newMembers = selectedItems
      .filter((item: any) => !members?.includes(item.whom_user.get_stream_id))
      .map((item: IFollower) => {
        return item?.whom_user?.get_stream_id?.toString();
      });
    try {
      if (newMembers.length > 0) {
        //@ts-ignore
        await channel?.addMembers((newMembers));
      }
    } catch (error) {
      console.log(error);
    }
    navigation.goBack();
  }, [selectedItems, channel, navigation]);

  // const onSelectImage = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     const image = await ImagePicker.openPicker({});
  //     if (image.path) {
  //       setGroupImage(image.path);
  //       dispatch(
  //         uploadImageToBunnyAction([image], 'feed', public_id => {
  //           public_id && setImage(public_id);
  //           setLoading(false);
  //         }),
  //       );
  //     }
  //   } catch (error) {
  //     const data: IError = {
  //       title: 'Something went wrong ...',
  //       text: 'Image loading error',
  //       buttonTitle: 'OK',
  //     };
  //     dispatch(setError(data));
  //   }
  // }, []);

  const handlerOnChangeGroupName = useCallback(
    (value: string) => {
      setGroupName(value);
    },
    [groupName],
  );

  // const handlerSetChannelInfo = async () => {
  //   if (isReadOnly) {
  //     createChannel(selectedItems, 'channel', true);
  //   } else if (isGroupChat) {
  //     createChannel(selectedItems, 'group');
  //   } else if (isGroupFromPack) {
  //     createChannel(selectedItems, 'group');
  //   } else if (isChannelFromPack) {
  //     createChannel(selectedItems, 'channel');
  //   }
  // };

  return {
    t,
    onPressToDismiss,
    inputValue,
    selectedItems,
    visible,
    groupImage,
    groupName,
    isNewCreating,
    searchedUsers,
    handleSearch,
    toggleSelectedItem,
    handlerOnPressCancel,
    handlerOnPressNext,
    // onSelectImage,
    handlerModalOnPressCancel,
    handlerOnChangeGroupName,
    // handlerSetChannelInfo,
    handlerAddUserList,
    // selectedFeed,
    followings,
    searchResults,
    loading,
    createLoading,
  };
};
