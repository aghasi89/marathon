import React, {useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Search from '../../../../components/search/Search';
import Icons from '../../../../assets/icons/svg/index';
import {PrimeryButton} from '../../../../components/buttons';
import ModalComponent from '../../../../components/modal/ModalComponent';
import {
  primaryBlue,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import {downloadMediaFromBunny} from '../../../../utils/bunny.net';
import videoLink from '../../../../utils/videoLink';
import {ISelectedUser} from '../../chatTypes';
import styles from './AddMembers.style';
import AddMembersHook from './AddMembers-hook';
import UserCard from './components/userCard/userCard';
import GroupeChatInfo from './components/groupChatInfo/groupeChatInfo';
import ChatHeader from '../Components/ChatHeader';
import InputComponent from '../../../FeedStack/CreateFeed/components/InputComponent/InputComponent';
import AddUserCard from './components/addUserCard/addUserCard';
import SelectedUsers from './components/selectedUsers/selectedUsers';

const AddMembers: React.FC = () => {
  const {
    t,
    onPressToDismiss,
    inputValue,
    selectedItems,
    handleSearch,
    toggleSelectedItem,
    handlerOnPressCancel,
    handlerOnPressNext,
    // visible,
    // onSelectImage,
    // groupImage,
    // groupName,
    // handlerModalOnPressCancel,
    // handlerOnChangeGroupName,
    // handlerSetChannelInfo,
    isNewCreating,
    // selectedFeed,
    handlerAddUserList,
    followings,
    searchResults,
    loading,
    // createLoading,
  } = AddMembersHook();  

  const renderUserCard = useCallback(
    ({item}: {item: any}) => {
      const ids = selectedItems.map((obj: any) => obj?.whom_user?.id);
      const isSelected = ids.includes(item.whom_user?.id);
      return (
        <AddUserCard
          selected={isSelected}
          onSelectItem={() => toggleSelectedItem(item)}
          id={item?.whom_user?.id}
          name={
            item?.whom_user?.user?.first_name +
            ' ' +
            item?.whom_user?.user?.last_name
          }
          username={item?.whom_user?.user?.username}
          imageUrl={
            downloadMediaFromBunny({
              public_key: item?.whom_user?.image,
              mediaType: 'image',
              imageDir: 'profile',
              userDir: item?.whom_user?.id,
            })?.url
          }
        />
      );
    },
    [selectedItems],
  );
  if (loading) {
    return <ActivityIndicator style={{flex: 1}} color={primaryBlue} />;
  }
  return (
    <Pressable onPress={onPressToDismiss} style={styles.container}>
      <ChatHeader goBack={handlerOnPressCancel} title={t('addMembers') ?? ''} />
      <SelectedUsers selectedUsers={selectedItems}></SelectedUsers>
      <InputComponent
        onChange={handleSearch}
        placeholder={'People, groups, messages...' ?? ''}
        icon={<Icons.ChatSearchIcon />}
        containerStyle={styles.searchInputContainer}
        inputStyle={styles.searchInput}
      />
      {followings?.length ? (
        <FlatList
          style={styles.usersList}
          data={searchResults}
          renderItem={renderUserCard}
          keyExtractor={item => item?.id?.toString()}
        />
      ) : (
        <Text>{t('emptyFollowings')}</Text>
      )}
        <TouchableOpacity
          disabled={!selectedItems.length}
          style={styles.createButton}
          onPress={isNewCreating ? handlerOnPressNext : handlerAddUserList}>
          <Icons.newChatNext opacity={selectedItems.length ? 1 : 0.5}/>
        </TouchableOpacity>
      {/* <ModalComponent
        isVisible={visible}
        content={
          <>
            <GroupeChatInfo
              imageUrl={
                groupImage
                  ? groupImage
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
                    })?.url
              }
              inputValue={groupName ? groupName : selectedFeed?.feed?.title}
              onChangeText={handlerOnChangeGroupName}
              onSelectImage={onSelectImage}
            />
            <View style={styles.buttonsView}>
              <TouchableOpacity onPress={handlerModalOnPressCancel}>
                <Text style={styles.back}>{t(`back`)}</Text>
              </TouchableOpacity>
              <PrimeryButton
                Icon={
                  createLoading && (
                    <ActivityIndicator size={'small'} color={primaryWhite} />
                  )
                }
                disable={
                  !groupName.trim().length &&
                  !selectedFeed?.feed?.title?.trim().length
                }
                title={createLoading ? '' : t(`next`) ?? ''}
                type="default"
                onPress={handlerSetChannelInfo}
                rightIcon={
                  createLoading ? null : (
                    <Icons.ArrowRight fill={primaryWhite} {...styles.icon} />
                  )
                }
              />
            </View>
          </>
        }
      /> */}
    </Pressable>
  );
};

export default AddMembers;
