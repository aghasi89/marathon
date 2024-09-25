import React from 'react';
import {ActivityIndicator, FlatList, Pressable, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icons from '../../../../assets/icons/svg/index';
import videoLink from '../../../../utils/videoLink';
import {downloadMediaFromBunny} from '../../../../utils/bunny.net';
import {primaryBlue} from '../../../../assets/styles/colors.styles';
import GroupeChatInfo from '../AddMembers/components/groupChatInfo/groupeChatInfo';
import ChatHeader from '../Components/ChatHeader';
import AddUserCard from '../AddMembers/components/addUserCard/addUserCard';
import GroypDetailHooks from './GroypDetail-hooks';
import styles from './GroupDetail.style';

const GroupDetail: React.FC = () => {
  const {
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
    handlerSetChannelInfo,
    loading,
  } = GroypDetailHooks();
  if (loading) {
    return <ActivityIndicator style={{flex: 1}} color={primaryBlue} />;
  }
  return (
    <Pressable onPress={onPressToDismiss} style={styles.container}>
      <ChatHeader goBack={handleGoBack} title={t('groupDetail') ?? ''} />
      <View style={styles.groupInfoContainer}>
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
      </View>
      <View style={styles.line}></View>
      {selectedUsers && (
        <FlatList
          style={styles.usersList}
          data={selectedUsers}
          renderItem={({item, index}) => {
            return (
              <AddUserCard
                id={item?.whom_user?.id}
                isAdmin={index === 0 ? true : false}
                disable
                name={
                  index === 0
                    ? item?.user?.first_name + ' ' + item?.user?.last_name
                    : item?.whom_user?.user?.first_name +
                      ' ' +
                      item?.whom_user?.user?.last_name
                }
                username={
                  index === 0
                    ? item?.user?.username
                    : item?.whom_user?.user?.username
                }
                imageUrl={
                  index === 0
                    ? downloadMediaFromBunny({
                        public_key: item?.image ? item.image : undefined,
                        mediaType: 'image',
                        imageDir: 'profile',
                        userDir: item?.id,
                      })?.url
                    : downloadMediaFromBunny({
                        public_key: item?.whom_user?.image,
                        mediaType: 'image',
                        imageDir: 'profile',
                        userDir: item?.whom_user?.id,
                      })?.url
                }
              />
            );
          }}
          keyExtractor={item => item?.id?.toString()}
        />
      )}
      <View style={styles.createButton}>
        <TouchableOpacity
          disabled={
            !groupName.trim().length &&
            !selectedFeed?.feed?.title?.trim().length ||
            createLoading
          }
          onPress={handlerSetChannelInfo}>
          {createLoading ? (
            <View style={styles.loadingView}>
              <ActivityIndicator style={{flex: 1}} color={"white"}  />
            </View>
          ) : (
            <Icons.newChatNext
              opacity={
                !groupName.trim().length &&
                !selectedFeed?.feed?.title?.trim().length
                  ? 0.5
                  : 1
              }
            />
          )}
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};
export default GroupDetail;
