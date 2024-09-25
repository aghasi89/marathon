import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import Icons from '../../../../assets/icons/svg/index';
import {
  assistantMessageBlack,
  primaryBlue,
  red,
} from '../../../../assets/styles/colors.styles';
import AssistantScreenHook from './AssistantScreen-hook';
import {AssistantInput} from './components/AssistantInput/AssistantInput';
import AssistantHeader from './components/AssistantHeader/AssistantHeader';
import AssistantChatItem from './components/AssistantChatItem/AssistantChatItem';
import styles from './AssistantScreen.style';
import EditSheet from '../../../../components/editSheet/EditSheet';
import {calcHeight} from '../../../../assets/dimensions';
import {PrimeryButton} from '../../../../components/buttons';
import ModalComponent from '../../../../components/modal/ModalComponent';
import {downloadMediaFromBunny} from '../../../../utils/bunny.net';

const AssistantScreen: React.FC = () => {
  const {
    t,
    loading,
    handlerGoBack,
    onPressToDismiss,
    handleOnHandReach,
    assistantTitle,
    messageList,
    newMessageList,
    newMessage,
    bunnyImage,
    setBunnyImage,
    handleChangeInputValue,
    handlePressSendMessage,
    questionItems,
    getMe,
    paginationLoading,
    assistantLoading,
    handleCreateAssistantChat,
    handlerOpenChatMenu,
    menuVisible,
    handlerCloseChatMenu,
    handleDeleteAssistant,
    handlerOpenDeleteModal,
    handlerCloseDeleteModal,
    deleteVisible,
    handlerOpenEditChat,
    handleOpenMessageSettings,
    handleCloseMessageSettings,
    messageSettingsVisible,
    selectedMessage,
    handleToCopyText,
    handleToDeleteMessage,
    selectedMessageIsMe,
    handleToRegenerateMessage,
    handleSetImage,
  } = AssistantScreenHook();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={primaryBlue} size={'large'} />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}>
      <AssistantHeader
        handlerOpenMenu={messageList.length ? handlerOpenChatMenu : undefined}
        isCoach={getMe?.role_mode === 'coach'}
        title={assistantTitle}
        handlerGoBack={handlerGoBack}
      />
      {messageList.length | newMessageList.length ? (
        <View style={styles.messageContainer}>
          <FlatList
            inverted
            onEndReached={handleOnHandReach}
            onEndReachedThreshold={0.1}
            data={messageList}
            showsVerticalScrollIndicator={false}
            key={'#'}
            keyExtractor={(item, index) => index + item?.id.toString()}
            ListFooterComponent={
              paginationLoading ? (
                <ActivityIndicator size="large" color={primaryBlue} />
              ) : null
            }
            ListHeaderComponent={
              newMessageList.length ? (
                <AssistantChatItem
                  assistantLoading={true}
                  isToday={true}
                  item={newMessageList[0]}
                  handleItemLongPress={handleOpenMessageSettings}
                />
              ) : null
            }
            renderItem={({item, index}) => {
              const isToday = moment
                .utc(item.created_at)
                .isSame(moment.utc().startOf('day'), 'day');
              return (
                <AssistantChatItem
                  key={'myMessage' + index}
                  isToday={isToday}
                  item={item}
                  handleItemLongPress={handleOpenMessageSettings}
                />
              );
            }}
          />
        </View>
      ) : (
        <Pressable
          style={styles.newMessageContainer}
          onPress={onPressToDismiss}>
          <Icons.ChatBigAssistant {...styles.bigAssistantIcon} />
          <Text numberOfLines={1} style={styles.welcomeText}>{`${t('hello')}, ${
            getMe?.user?.first_name
          }!`}</Text>
          <Text numberOfLines={2} style={styles.assistantDescription}>{`${t(
            'assistantHelpDes',
          )}`}</Text>
          <Text style={styles.taskHelpText}>{`${t('assistantTaskHelp')}`}</Text>
          {questionItems.map((item: string) => {
            return (
              <View style={styles.taskItem}>
                <TouchableOpacity
                  style={styles.taskItemButton}
                  onPress={() => handleCreateAssistantChat(item)}>
                  <Text style={styles.taskText}>{item}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </Pressable>
      )}
      <AssistantInput
        disabled={assistantLoading}
        onPressSendMessage={handlePressSendMessage}
        value={newMessage}
        onChange={handleChangeInputValue}
        handleSetImage={handleSetImage}
        bunnyImage={bunnyImage}
        setBunnyImage={setBunnyImage}
        messagesLength={messageList.length}
      />
      <EditSheet
        height={calcHeight(250)}
        isVisible={menuVisible}
        onClose={handlerCloseChatMenu}
        list={[
          {
            title: t('deleteChat'),
            Icon: <Icons.DeleteChat {...styles.editIcon} fill={red} />,
            onSelect: handlerOpenDeleteModal,
            isDelete: true,
          },
          {
            title: t(`editGroup`),
            Icon: <Icons.EditChat {...styles.editIcon} />,
            onSelect: handlerOpenEditChat,
          },
        ]}
      />
      <ModalComponent
        isVisible={deleteVisible}
        content={
          <>
            <View style={styles.modal}>
              <Text style={styles.modalText}>{`${t(`confirmDeleting`)}${t(
                'assistant',
              )}`}</Text>
              <View style={styles.modalContainer}>
                <PrimeryButton
                  style={styles.modalButtons}
                  disable={false}
                  title="yes"
                  type="default"
                  onPress={handleDeleteAssistant}
                />
                <PrimeryButton
                  style={styles.modalButtons}
                  disable={false}
                  title="no"
                  type="default"
                  onPress={handlerCloseDeleteModal}
                />
              </View>
            </View>
          </>
        }
      />
      <ModalComponent
        isNoneContainerStyle
        isVisible={messageSettingsVisible}
        onClose={handleCloseMessageSettings}
        content={
          <>
            <View style={styles.messageModal}>
              <Icons.AssistantInChannel {...styles.messageSettingsIcon} />
              <ScrollView>
                {selectedMessage.startsWith('https://marathon.b-cdn.net') && (
                  <Image
                    source={{
                      uri: selectedMessage.includes('zhenyaartyom')
                        ? selectedMessage.split('zhenyaartyom')[0]
                        : selectedMessage,
                    }}
                    style={{width: 100, height: 100, borderRadius: 20, marginBottom: 10}}
                    resizeMode="cover"
                  />
                )}
                {!selectedMessage.startsWith('https://marathon.b-cdn.net') ? (
                  <Text style={styles.selectedText}>{selectedMessage}</Text>
                ) : (
                  <Text style={styles.selectedText}>
                    {selectedMessage.includes('zhenyaartyom')
                      ? selectedMessage.split('zhenyaartyom')[1]
                      : ''}
                  </Text>
                )}
              </ScrollView>
            </View>
            <View style={styles.messageSettingsModal}>
              {!selectedMessage.startsWith('https://marathon.b-cdn.net') ? (
                <TouchableOpacity
                  style={styles.settingItem}
                  onPress={handleToCopyText}>
                  <Text style={styles.settingText}>{t('copy')}</Text>
                  <Icons.CopyIcon />
                </TouchableOpacity>
              ) : (
                selectedMessage.split('zhenyaartyom')[1] && (
                  <TouchableOpacity
                    style={styles.settingItem}
                    onPress={handleToCopyText}>
                    <Text style={styles.settingText}>{t('copy')}</Text>
                    <Icons.CopyIcon />
                  </TouchableOpacity>
                )
              )}
              {!selectedMessageIsMe && (
                <TouchableOpacity
                  style={styles.settingItem}
                  onPress={handleToRegenerateMessage}>
                  <Text style={styles.settingText}>{t('regenerate')}</Text>
                  <Icons.RepeatIcon />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.settingDelItem}
                onPress={() => handleToDeleteMessage(undefined, undefined)}>
                <Text style={styles.settingDelText}>{t('delMessage')}</Text>
                <Icons.DeleteIcon width="16" height="20" fill={red} />
              </TouchableOpacity>
            </View>
          </>
        }
      />
    </KeyboardAvoidingView>
  );
};
export default AssistantScreen;
