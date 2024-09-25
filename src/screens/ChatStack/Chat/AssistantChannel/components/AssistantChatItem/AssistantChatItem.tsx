import moment from 'moment';
import React, {useEffect} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import LoadingDots from '@apolloeagle/loading-dots';
import Icons from '../../../../../../assets/icons/svg/index';
import {IAssistantChannelMessagesResultItem} from '../../../../../../types/types';
import {primaryBlue} from '../../../../../../assets/styles/colors.styles';
import styles from './AssistantChatItem.style';

type Props = {
  item: IAssistantChannelMessagesResultItem;
  isToday: boolean;
  assistantLoading?: boolean;
  lastMessage?: boolean;
  handleItemLongPress: (
    message: string,
    messageId: number,
    isMyMessage: boolean,
  ) => void;
};

const AssistantChatItem: React.FC<Props> = ({
  item,
  isToday,
  assistantLoading,
  lastMessage = false,
  handleItemLongPress,
}: Props) => {

  if (item.me) {
    return (
      <>
        <Pressable
          style={styles.myMessageItem}
          onLongPress={() =>
            handleItemLongPress(item.message, item.id, item.me)
          }>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {assistantLoading
                ? moment(item.created_at).format('HH:mm')
                : isToday
                ? moment(item.created_at).format('HH:mm')
                : moment(item.created_at).format('YYYY/MM/DD')}
            </Text>
          </View>
          <View
            style={[
              styles.myMessageTextContainer,
              {maxWidth: isToday ? '80%' : '70%'},
            ]}>
            {item.message.startsWith('https://marathon.b-cdn.net') && (
              <Image
                source={{
                  uri: item.message.includes('zhenyaartyom')
                    ? item.message.split('zhenyaartyom')[0]
                    : item.message,
                }}
                style={{width: 200, height: 200, borderRadius: 20}}
                resizeMode="cover"
              />
            )}

            {!item.message.startsWith('https://marathon.b-cdn.net') ? (
              <Text style={item.message ? styles.myMessageText : undefined}>{item.message}</Text>
            ) : (
              <Text style={item.message.split('zhenyaartyom')[1] ? styles.myMessageText : undefined}>
                {item.message.split('zhenyaartyom')[1]}
              </Text>
            )}
          </View>
        </Pressable>
        {assistantLoading && (
          <View style={[styles.messageItem, {marginBottom: 30}]}>
            <View style={styles.avatarContainer}>
              <View>{<Icons.AssistantInChannel {...styles.userAvatar} />}</View>
            </View>
            <LoadingDots
              animation={'pulse'}
              dots={3}
              color={primaryBlue}
              size={10}
            />
          </View>
        )}
      </>
    );
  } else {
    return (
      <Pressable
        style={[styles.messageItem, {marginBottom: 30}]}
        onLongPress={() => handleItemLongPress(item.message, item.id, item.me)}>
        <View style={styles.avatarContainer}>
          <View>{<Icons.AssistantInChannel {...styles.userAvatar} />}</View>
        </View>
        <View
          style={[
            styles.messageTextContainer,
            {maxWidth: isToday ? '80%' : '70%'},
          ]}>
          <Text style={styles.messageText}>{item.message}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>
            {isToday
              ? moment(item.created_at).format('HH:mm')
              : moment(item.created_at).format('YYYY/MM/DD')}
          </Text>
        </View>
      </Pressable>
    );
  }
};
export default AssistantChatItem;
