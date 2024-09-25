import {useCallback} from 'react';
import {FlatList, Pressable, View} from 'react-native';
import Icons from '../../../../assets/icons/svg';
import ChannelTypeCard from '../../../../components/channelTypeCard/channelTypeCard';
import {downloadMediaFromBunny} from '../../../../utils/bunny.net';
import ChatHeader from '../Components/ChatHeader';
import InputComponent from '../../../FeedStack/CreateFeed/components/InputComponent/InputComponent';
import AddUserCard from '../AddMembers/components/addUserCard/addUserCard';
import NewMessageHook from './newMessage-hook';
import styles from './newMessage.style';

const NewMessage: React.FC = () => {
  const {
    t,
    onPressToDismiss,
    inputValue,
    followings,
    user,
    handleItemPress,
    handlerGoBack,
    openSearch,
    debounceSearch,
    searchedUsers,
    handleMoveToChat,
  } = NewMessageHook();

  const groupeType = [
    {icon: <Icons.newChatGroup />, type: t(`newGroup`)},
    {icon: <Icons.newChatChannel />, type: t(`newChannel`)},
    ...(user?.role_mode === 'client'
      ? []
      : [
          {icon: <Icons.newChatGroup />, type: t(`newGroupFromPacks`)},
          {icon: <Icons.newChatChannel />, type: t(`newChannelFromPack`)},
        ]),
  ];

  const renderUserCard = useCallback(({item}: {item: any}) => {
    return (
      <AddUserCard
        id={item.whom_user ? item.whom_user.id : item.id}
        name={
          item.whom_user ? item?.whom_user?.user?.first_name + " " + item?.whom_user?.user?.last_name : item?.user?.first_name + " " + item?.user?.last_name
        }
        username={item.whom_user ? item?.whom_user?.user?.username : item?.user?.username}
        imageUrl={
          downloadMediaFromBunny({
            public_key: item.whom_user ? item.whom_user.image : item.image,
            mediaType: 'image',
            userDir: item.whom_user ? item.whom_user.id : item.id,
            imageDir: 'profile',
          })?.url ?? ''
        }
        onSelectItem={() =>
          handleMoveToChat(
            item.whom_user ? item.whom_user.get_stream_id : item.get_stream_id,
          )
        }
      />
    );
  }, []);

  return (
    <Pressable onPress={onPressToDismiss} style={styles.container}>
      <ChatHeader goBack={handlerGoBack} title={t(`newMessages`) ?? ''} />
      <InputComponent
        onChange={debounceSearch}
        placeholder={'People, groups, messages...' ?? ''}
        icon={<Icons.ChatSearchIcon />}
        containerStyle={styles.searchInputContainer}
        inputStyle={styles.searchInput}
      />
      {inputValue === '' && (
        <ChannelTypeCard
          handleItemPress={handleItemPress}
          groupeType={groupeType}
        />
      )}
      {followings && (
        <FlatList
          style={styles.usersList}
          data={inputValue.length > 0 ? searchedUsers : followings}
          renderItem={renderUserCard}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item?.id?.toString()}
        />
      )}
    </Pressable>
  );
};

export default NewMessage;
