import {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, Text, View, Platform, Image, Pressable} from 'react-native';
import {
  Channel,
  MessageList,
  MessageInput,
  MessageAvatar,
} from 'stream-chat-react-native';
import moment from 'moment';
import EditSheet from '../../../../components/editSheet/EditSheet';
import {calcHeight} from '../../../../assets/dimensions';
import Icons from '../../../../assets/icons/svg/index';
import {
  primaryBlack,
  primaryBlue,
  primaryWhite,
  red,
} from '../../../../assets/styles/colors.styles';
import ModalComponent from '../../../../components/modal/ModalComponent';
import {PrimeryButton} from '../../../../components/buttons';
import {myMessageTheme} from '../chatTheme';
import styles from './ChannelScreen.style';
import ChannelHeader from './components/ChannelHeader/ChannelHeader';
import ChannelScreenHook from './ChannelScreen-hook';
import {reactTionsData} from './components/Emojis/Emojis';
import {CustomInput} from './components/CustomInput/CustomInput';
import AttachmentRenderer from './components/AtachementRenderer/AtachementRenderer';
import ActionModal from '../../../../components/actionModal/ActionModal';
import chatVideoCustomUpload from '../../../../utils/videoCompressor';
import LiveStream from '../LiveStream/LiveStream';
import { CreatorAddedInfo } from './components/CreatorAddedInfo/CreatorAddedInfo';

const ChannelScreen: React.FC = () => {
  const {
    channel,
    mutedStatus,
    visible,
    onPressToDismiss,
    isDirectChat,
    openLiveStream,
    setOpenLiveStrem,
    members,
    t,
    isModalVisible,
    isStreamActive,
    isCreator,
    handlerOpenEditChat,
    handlerOnClose,
    handlerOpenChatMenu,
    handlerGoBack,
    handlerMuteChannel,
    handlerOnThreadSelect,
    messageId,
    handlerOnPressNo,
    handlerOnPressYes,
    handlerOnPressModal,
    isLeaving,
    handlerOpenLiveStream,
    handlerOpenAiModal,
    user,
    otherUser,
    lastVisit,
    handlerGoToProfile,
    onPressToOpenWorkouts,
    handlerOpenRecipeModal,
    liveModalVisible,
    handlerCloseLiveModal,
    handlerNavigateToLiveStream,
    loading,
    questionsModalVisible,
    askQuestionsHandle,
    questionsModalCloseHandle,
    showMembersList,
  } = ChannelScreenHook();

  const data = isDirectChat
    ? [
        {
          title: t(mutedStatus ? 'unMuted' : 'muted'),
          onSelect: handlerMuteChannel,
          Icon: mutedStatus ? (
            <Icons.UnmutedRing
              {...styles.icon}
              fill="#45535C"
              stroke="#45535C"
            />
          ) : (
            <Icons.MutedRing {...styles.icon} fill="#45535C" />
          ),
        },
      ]
    : isCreator
    ? [
        {
          title: t(mutedStatus === false ? 'muted' : 'unMuted'),
          Icon: mutedStatus ? (
            <Icons.UnmutedRing
              {...styles.icon}
              fill="#45535C"
              stroke="#45535C"
            />
          ) : (
            <Icons.MutedRing {...styles.icon} fill="#45535C" />
          ),
          onSelect: handlerMuteChannel,
        },
        {
          title: t('deleteChat'),
          Icon: <Icons.DeleteChat {...styles.icon} fill={red} />,
          onSelect: () => handlerOnPressModal(false),
          isDelete: true,
        },
        {
          title: t(`editGroup`),
          Icon: <Icons.EditChat {...styles.icon} />,
          onSelect: handlerOpenEditChat,
        },
      ]
    : [
        {
          title: t('showMembers'),
          Icon: <Icons.Members {...styles.icon} fill={primaryBlack} />,
          onSelect: showMembersList,
        },
        {
          title: t(mutedStatus === false ? 'muted' : 'unMuted'),
          Icon: mutedStatus ? (
            <Icons.UnmutedRing
              {...styles.icon}
              fill="#45535C"
              stroke="#45535C"
            />
          ) : (
            <Icons.MutedRing {...styles.icon} fill="#45535C" />
          ),
          onSelect: handlerMuteChannel,
        },
        {
          title: t('leaveChat'),
          Icon: <Icons.LeaveChat {...styles.icon} />,
          onSelect: () => handlerOnPressModal(true),
        },
      ];
  const liveModalData = [
    {
      title: t(`livestream`),
      onSelect: () => handlerNavigateToLiveStream(false),
      Icon: <Icons.Stream {...styles.liveIcons} />,
    },
    {
      title: t(`videoChat`),
      onSelect: () => handlerNavigateToLiveStream(true),
      Icon: <Icons.LiveIcon fill={primaryBlack} {...styles.liveIcons} />,
    },
  ];
  const renderMessageInput = useMemo(() => {
    if (channel?.type === 'messaging' || channel?.type === 'group') {
      return <MessageInput />;
    } else if (channel?.type === 'channel' && isCreator) {
      return <MessageInput />;
    } else {
      return null;
    }
  }, [channel, isCreator, user]);

  if (loading || !channel) {
    return (
      <View
        style={[
          styles.container,
          {flex: 1, justifyContent: 'center', backgroundColor: primaryWhite},
        ]}>
        <ActivityIndicator color={primaryBlue} size={'large'} />
      </View>
    );
  }

  return (
    <Pressable style={styles.container} onPress={onPressToDismiss}>
      {openLiveStream && (
        <LiveStream goBack={() => setOpenLiveStrem(false)}></LiveStream>
      )}
      <Channel
        doDocUploadRequest={chatVideoCustomUpload}
        formatDate={date => moment(date).format('MM/DD/YYYY, HH:mm')}
        hideDateSeparators
        Card={atachementData => {
          return AttachmentRenderer({
            ...atachementData,
            handlerOpenLiveStream: () => handlerOpenLiveStream(false),
          });
        }}
        deletedMessagesVisibilityType="never"
        supportedReactions={reactTionsData}
        enforceUniqueReaction={false}
        Input={props => {
          return (
            <CustomInput
              showRecipeButton={user?.role_mode === 'coach'}
              handlerOpenRecipeModal={handlerOpenRecipeModal}
              handlerOpenAiModal={handlerOpenAiModal}
              showAiButton={user?.role_mode === 'coach'}
              onPressToOpenWorkouts={onPressToOpenWorkouts}
              showWorkoutButton={user?.role_mode === 'coach'}
              {...props}
            />
          );
        }}
        myMessageTheme={myMessageTheme}
        hideStickyDateHeader={true}
        messageId={messageId}
        MessageAvatar={MessageAvatar}
        hasCommands={false}
        additionalKeyboardAvoidingViewProps={{
          behavior: 'padding',
          keyboardVerticalOffset:
            Platform.OS == 'ios' ? calcHeight(50) : calcHeight(-100),
        }}
        channel={channel}>
        <ChannelHeader
          // isPublisher={!isDirectChat ? isCreator : user?.role_mode === 'coach'}
          isPublisher={isCreator}
          handlerGoToProfile={handlerGoToProfile}
          isOnline={isDirectChat ? otherUser?.user?.online : false}
          lastVisit={lastVisit}
          handlerOpenLive={handlerOpenLiveStream}
          showLiveStream={
            isStreamActive || isCreator
            // (!isDirectChat ? isCreator : user?.role_mode === 'coach')
          }
          handlerGoBack={handlerGoBack}
          isDirectChat={isDirectChat}
          userName={isDirectChat ? otherUser?.user?.name : channel?.data?.name}
          //@ts-ignore
          imageUrl={
            isDirectChat ? otherUser?.user?.image : channel?.data?.image
          }
          handlerOpenMenu={handlerOpenChatMenu}
          membersCount={
            channel?.data?.member_count
              ? (channel.data.member_count as string)
              : ''
          }
        />
        <View
          style={{flex: 1, paddingTop: openLiveStream ? calcHeight(300) : 0}}>
          {isDirectChat || channel.state.messages.length > 0 ? (
            <MessageList
              key={otherUser?.user_id}
              onThreadSelect={handlerOnThreadSelect}
            />
          ) : (
            <CreatorAddedInfo channel={channel} members={members}/>
          )}
          {renderMessageInput}
        </View>
      </Channel>
      <EditSheet
        height={
          isDirectChat
            ? calcHeight(120)
            : isCreator
            ? calcHeight(250)
            : calcHeight(250)
        }
        isVisible={visible}
        onClose={handlerOnClose}
        list={data}
      />
      <EditSheet
        height={calcHeight(200)}
        isVisible={liveModalVisible}
        onClose={handlerCloseLiveModal}
        list={liveModalData}
      />
      <ModalComponent
        isVisible={isModalVisible}
        content={
          <>
            <View style={styles.modal}>
              {isLeaving ? (
                <Text style={styles.modalText}>{`${t(`confirmLeaving`)}${
                  channel?.type
                }`}</Text>
              ) : (
                <Text style={styles.modalText}>{`${t(`confirmDeleting`)}${
                  channel?.type
                }`}</Text>
              )}
              <View style={styles.modalContainer}>
                <PrimeryButton
                  style={styles.modalButtons}
                  disable={false}
                  title="yes"
                  type="default"
                  onPress={handlerOnPressYes}
                />
                <PrimeryButton
                  style={styles.modalButtons}
                  disable={false}
                  title="no"
                  type="default"
                  onPress={handlerOnPressNo}
                />
              </View>
            </View>
          </>
        }
      />
      <ActionModal
        visible={questionsModalVisible}
        onClose={questionsModalCloseHandle}
        onSubmit={askQuestionsHandle}
        description={t('pleaseAnswerTheQuestions') ?? ''}
        closeButtonText={t('notNow') ?? ''}
        submitButtonText={t('complete') ?? ''}
      />
    </Pressable>
  );
};

export default ChannelScreen;
