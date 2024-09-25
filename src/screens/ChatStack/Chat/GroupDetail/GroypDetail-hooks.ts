import {useCallback, useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useChatContext} from 'stream-chat-react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {NavigationParamList} from '../../../../navigation/ChatNavigation';
import {getFeedByIdAction, setSelectedFeedAction} from '../../../../store/actions/feed-action';
import {selectedFeedSelector} from '../../../../store/selectors/feed-selector';
import {IError, IFollower} from '../../../../types/types';
import {chatClient} from '../../../../services/chatConfig';
import {
  followingsSelector,
  profileSelector,
  searchInputSelector,
} from '../../../../store/selectors/profile-selector';
import {getFollowings} from '../../../../store/actions/profile-action';
import {downloadMediaFromBunny} from '../../../../utils/bunny.net';
import videoLink from '../../../../utils/videoLink';
import {
  setError,
  uploadImageToBunnyAction,
} from '../../../../store/actions/administrative-action';
import {useAppContext} from '../../AppContext';

type Props = NativeStackScreenProps<NavigationParamList, 'GROUPDETAIL'>;

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const {t} = useTranslation();
  const {client} = useChatContext();
  const {setChannel, channel} = useAppContext();
  const route = useRoute<Props['route']>();
  const {
    selectedIds,
    isNewCreating,
    isReadOnly,
    feedId,
    isGroupFromPack,
    isGroupChat,
    isChannelFromPack,
  } = route?.params!;
  const [groupName, setGroupName] = useState<string>('');
  const [groupImage, setGroupImage] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const selectedFeed = useSelector(selectedFeedSelector);
  const followings = useSelector(followingsSelector);
  const user = useSelector(profileSelector);  

  useEffect(() => {    
    if (feedId && 'feed') {
      dispatch(
        getFeedByIdAction({
          id: feedId,
          type: 'feed',
        }),
      );
    } else {
      dispatch(setSelectedFeedAction(undefined))
    }
  }, [feedId]);

  useEffect(() => {
    user && dispatch(getFollowings(user?.id));
  }, []);
  useEffect(() => {
    if (followings && selectedIds && user) {
      const findSelectedUsers: any[] = followings.filter((item: any) =>
        selectedIds.includes(item.whom_user?.id),
      );
      findSelectedUsers.unshift(user);
      setSelectedUsers(findSelectedUsers);
    }
  }, [followings, selectedIds, user]);

  const handleGoBack = useCallback(() => {
    setGroupImage('');
    setGroupName('');
    navigation.goBack();
  }, [navigation]);

  const createChannel = async (
    selectedUsers: any,
    channelType: string,
    isReadOnly?: boolean,
  ) => {
    const selectedItems = selectedUsers.slice(1);
    const channelId = `${channelType}-${Date.now()}`;
    const userIds = selectedItems?.map((item: IFollower) =>
      item.whom_user?.get_stream_id?.toString(),
    );
    setCreateLoading(true);
    try {
      if (isGroupFromPack || isChannelFromPack) {
        const channel = chatClient.channel(channelType, channelId, {
          members: [client.userID, ...userIds],
          readOnly: isReadOnly || false,
          name: groupName ? groupName : selectedFeed?.feed?.title,
          creator: user?.id,
          image: image
            ? downloadMediaFromBunny({
                public_key: image,
                mediaType: 'image',
                userDir: selectedFeed?.feed?.creator,
                imageDir: 'feed',
              })?.url
            : selectedFeed?.feed?.media[0].type === 'videoLink'
            ? videoLink(selectedFeed?.feed?.media[0].url)
            : selectedFeed?.feed?.media[0].type === 'video'
            ? downloadMediaFromBunny({
                public_key: selectedFeed?.feed?.media[0].url,
                mediaType: selectedFeed?.feed?.media[0].type,
                userDir: selectedFeed?.feed?.creator,
                imageDir: 'feed',
              })?.thumbnailURL
            : downloadMediaFromBunny({
                public_key: selectedFeed?.feed?.media[0].url,
                mediaType: selectedFeed?.feed?.media[0].type,
                userDir: selectedFeed?.feed?.creator,
                imageDir: 'feed',
              })?.url,
          feedid: feedId,
          isFeed: true,
        });
        await channel.create();
        await channel.watch();
        setChannel(channel);
      } else {
        const channel = chatClient.channel(channelType, channelId, {
          members: [client.userID, ...userIds],
          readOnly: isReadOnly || false,
          name: groupName,
          creator: user?.id,
          image: image
            ? downloadMediaFromBunny({
                public_key: image,
                mediaType: 'image',
                userDir: selectedFeed?.feed?.creator,
                imageDir: 'feed',
              })?.url
            : selectedFeed?.feed?.media[0].type === 'videoLink'
            ? videoLink(selectedFeed?.feed?.media[0].url)
            : selectedFeed?.feed?.media[0].type === 'video'
            ? downloadMediaFromBunny({
                public_key: selectedFeed?.feed?.media[0].url,
                mediaType: selectedFeed?.feed?.media[0].type,
                userDir: selectedFeed?.feed?.creator,
                imageDir: 'feed',
              })?.thumbnailURL
            : downloadMediaFromBunny({
                public_key: selectedFeed?.feed?.media[0].url,
                mediaType: selectedFeed?.feed?.media[0].type,
                userDir: selectedFeed?.feed?.creator,
                imageDir: 'feed',
              })?.url,
          feedid: '',
          isFeed: false,
        });
        await channel.create();
        await channel.watch();
        setChannel(channel);
      }
      //@ts-ignore
      navigation.navigate('CHANNEL');
    } catch (error: any) {
      console.log(error);
      const data: IError = {
        title: 'Something went wrong ...',
        text: `${channelType === 'group' ? 'Chat' : 'Channel'} creation error `,
        buttonTitle: 'OK',
      };
      dispatch(setError(data));
    }
  };

  const onSelectImage = useCallback(async () => {
    try {
      setLoading(true);
      const image = await ImagePicker.openPicker({});
      if (image.path) {
        setGroupImage(image.path);
        dispatch(
          uploadImageToBunnyAction([image], 'feed', public_id => {
            public_id && setImage(public_id);
            setLoading(false);
          }),
        );
      }
    } catch (error) {
      const data: IError = {
        title: 'Something went wrong ...',
        text: 'Image loading error',
        buttonTitle: 'OK',
      };
      dispatch(setError(data));
    }
  }, []);

  const handlerOnChangeGroupName = useCallback(
    (value: string) => {
      setGroupName(value);
    },
    [groupName],
  );

  const onPressToDismiss = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const handlerSetChannelInfo = async () => {
    if (isReadOnly) {
      createChannel(selectedUsers, 'channel', true);
    } else if (isGroupChat) {
      createChannel(selectedUsers, 'group');
    } else if (isGroupFromPack) {
      createChannel(selectedUsers, 'group');
    } else if (isChannelFromPack) {
      createChannel(selectedUsers, 'channel');
    }
  };

  return {
    t,
    user,
    selectedUsers,
    onPressToDismiss,
    handleGoBack,
    groupImage,
    selectedFeed,
    groupName,
    handlerOnChangeGroupName,
    onSelectImage,
    createLoading,
    loading,
    handlerSetChannelInfo,
  };
};
