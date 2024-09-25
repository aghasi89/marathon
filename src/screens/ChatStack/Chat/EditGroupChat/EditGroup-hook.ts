import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {ChannelMemberResponse} from 'stream-chat';
import ImagePicker from 'react-native-image-crop-picker';
import {IError} from '../../../../types/types';
import {
  setError,
  uploadImageToBunnyAction,
} from '../../../../store/actions/administrative-action';
import {NavigationParamList} from '../../../../navigation/ChatNavigation';
import {downloadMediaFromBunny} from '../../../../utils/bunny.net';
import {sendAddMembersNotification} from '../../../../store/actions/chat-actions';
import {StreamChatGenerics, useAppContext} from '../../AppContext';
import {profileSelector} from '../../../../store/selectors/profile-selector';

type Props = NativeStackScreenProps<NavigationParamList, 'CHANNELLIST'>;

export default () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const user = useSelector(profileSelector);
  const {channel} = useAppContext();
  const [newmembers, setnewMembers] = useState<
    ChannelMemberResponse<StreamChatGenerics>[]
  >([]);
  const [deletedMemberIds, setDeletedMemberIds] = useState<string[]>([]);
  const [addedMemberIds, setAddedMemberIds] = useState<string[]>([]);
  const [imageURI, setImageURI] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (channel) {
      channel.queryMembers({}).then(response => {
        setnewMembers(response?.members);
      });
      const handleMemberAdded = (event: any) => {
        setnewMembers(prevMembers => [...prevMembers, event.member]);
        setAddedMemberIds(prevIds => [...prevIds, event.member?.user_id]);
      };
      channel.on('member.added', handleMemberAdded);
      return () => {
        channel.off('member.added', handleMemberAdded);
      };
    }
  }, [channel]);
  useEffect(() => {
    channel?.data?.name && setInputValue(channel?.data?.name);
    //@ts-ignore
    setImageURI(channel?.data?.image);
  }, [newmembers, channel]);

  const onSelectImage = useCallback(async () => {
    try {
      setLoading(true);
      const image = await ImagePicker.openPicker({});
      if (image.path) {
        setImageURI(image.path);
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
  const deleteItem = useCallback(
    (id: string) => {
      const memberToDelete = newmembers.find(member => {
        member.user_id === id;
      });
      if (memberToDelete?.role !== 'owner') {
        const updatedMembers = newmembers.filter(
          member => member.user_id !== id,
        );
        setnewMembers(updatedMembers);
        setDeletedMemberIds(prevState => [...prevState, id]);
      } else {
        const data: IError = {
          title: 'Something went wrong ...',
          text: 'Channel owner can not be deleted',
          buttonTitle: 'OK',
        };
        dispatch(setError(data));
      }
    },
    [newmembers, deletedMemberIds],
  );

  const onChangeGroupName = useCallback(
    (value: string) => {
      setInputValue(value);
    },
    [inputValue],
  );

  const handlerAddMember = useCallback(() => {
    navigation.navigate('ADDMEMBERS', {});
  }, [navigation]);

  const handlerOnPressSave = useCallback(async () => {
    try {
      await channel?.update({
        creator:user?.id,
        name: inputValue,
        image: image
          ? downloadMediaFromBunny({
              public_key: image,
              mediaType: 'image',
              userDir: user?.id,
              imageDir: 'feed',
            })?.url
          : channel?.data?.image,
        feedid: channel?.data?.feedid ? channel?.data?.feedid : '',
        isFeed: channel?.data?.feedid ? true : false,
      });
      deletedMemberIds.length > 0 &&
        (await channel?.removeMembers(deletedMemberIds));
      if (addedMemberIds.length > 0) {
        for (let i = 0; i < addedMemberIds.length; i++) {
          const memberId = addedMemberIds[i];
          dispatch(
            sendAddMembersNotification({
              user: parseInt(memberId),
              channel_id: channel?.id ?? '',
            }),
          );
        }
      }
    //@ts-ignore
    navigation.navigate("CHAT_NAVIGATION_STACK");
    } catch (error) {
      const data: IError = {
        title: 'Something went wrong ...',
        text: 'You are not allowed to update channel settings ',
        buttonTitle: 'OK',
      };
      dispatch(setError(data));
    }
  }, [
    image,
    inputValue,
    navigation,
    channel?.data?.image,
    deletedMemberIds,
    channel,
    addedMemberIds,
  ]);

  const handlerOnPressCancel = useCallback(() => {
    //@ts-ignore
    navigation.navigate('CHANNELLIST');
  }, [navigation]);

  return {
    t,
    imageURI,
    inputValue,
    image,
    newmembers,
    onSelectImage,
    deleteItem,
    onChangeGroupName,
    handlerAddMember,
    handlerOnPressSave,
    handlerOnPressCancel,
    loading,
    user
  };
};
