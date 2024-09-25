import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {DefaultStreamChatGenerics} from 'stream-chat-react-native';
import type {Channel} from 'stream-chat';
import moment from 'moment';
//@ts-ignore
import Swipeable from 'react-native-swipeable';
import Icons from '../../../../../../assets/icons/svg';
import {IUser} from '../../../../../../types/types';
import {calcWidth} from '../../../../../../assets/dimensions';
import ChannelPreviewAvatar from '../ChannelPreviewAvatar/ChannelPreviewAvatar';
import style from './ChannelPreview.style';

interface Props {
  channel: Channel<DefaultStreamChatGenerics>;
  user: IUser | undefined;
  unread: number | undefined;
  handleDelete: (isCreator: boolean, channel: any) => Promise<void>;
  // handlerMuteChannel: (channel: any) => Promise<void>;
  onSelect: (channel: any) => void;
}
const ChannelPreview: React.FC<Props> = ({
  channel,
  user,
  unread,
  handleDelete,
  // handlerMuteChannel,
  onSelect,
}) => {
  const isDirect = channel?.type === 'messaging';
  const otherUser = Object.values(channel?.state?.members || {}).find(
    member => member?.user?.id !== channel?._client?.user?.id,
  )?.user;
  const lastMessage =
    channel?.state?.messages[channel?.state?.messages.length - 1];
  let isCreator: boolean;
  if (channel?.data?.created_by?.id === user?.get_stream_id?.toString()) {
    isCreator = true;
  }
  return (
    <Swipeable
      style={style.chatContainer}
      rightButtonWidth={calcWidth(40)}
      rightButtons={[
        // <Pressable
        //   onPress={() => {
        //     handlerMuteChannel(channel);
        //   }}
        //   style={style.swipeMuteButton}>
        //   {channel.muteStatus().muted ? (
        //     <Icons.MutedRing fill="white" />
        //   ) : (
        //     <Icons.UnmutedRing fill="white" stroke="white" />
        //   )}
        // </Pressable>,
        <Pressable
          onPress={() => {
            handleDelete(isCreator, channel);
          }}
          style={style.swipeDeleteButton}>
          <Icons.DeleteChat fill="white" />
        </Pressable>,
      ]}
      >
        <Pressable
          onPress={() => onSelect(channel)}
          style={style.chatItemContainer}>
          <ChannelPreviewAvatar channel={channel} />
          <View style={style.infoContainer}>
            <View style={style.headerContainer}>
              <View style={style.nameContainer}>
                {channel.data?.type === 'group' ? (
                  <Icons.GroupTypeIcon {...style.chatIcon} />
                ) : channel.data?.type !== 'messaging' ? (
                  <Icons.ChannelTypeIcon {...style.chatIcon} />
                ) : null}
                <Text
                  style={
                    unread !== undefined && unread > 0
                      ? style.unreadName
                      : style.name
                  }
                  numberOfLines={1}>
                  {isDirect ? otherUser?.name : channel?.data?.name}
                </Text>
              </View>
              {unread !== undefined && unread > 0 && (
                <View style={style.unreadContainer}>
                  <Text style={style.unreadCount}>
                    {unread < 100 ? unread : `99+`}
                  </Text>
                </View>
              )}
            </View>
            <View style={style.lastMessageContainer}>
              <Text
                style={
                  unread !== undefined && unread > 0
                    ? style.unreadLastMessage
                    : style.lastMessage
                }
                numberOfLines={1}>
                {lastMessage?.text
                  ? lastMessage.text
                  : lastMessage?.attachments &&
                    lastMessage?.attachments?.length > 0
                  ? 'Attachment...'
                  : 'Empty message...'}
              </Text>
              <Text style={style.dateText}>
                {lastMessage
                  ? moment(lastMessage.created_at).format('MM/DD/YYYY')
                  : ''}
              </Text>
            </View>
          </View>
        </Pressable>
    </Swipeable>
  );
};

export default ChannelPreview;
