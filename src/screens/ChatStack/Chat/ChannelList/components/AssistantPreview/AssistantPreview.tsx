import React from 'react';
import {Pressable, Text, View} from 'react-native';
//@ts-ignore
import Swipeable from 'react-native-swipeable';
import Icons from '../../../../../../assets/icons/svg';
import {calcWidth} from '../../../../../../assets/dimensions';
import style from './AssistantPreview.style';
import {IAssistantChannels} from '../../../../../../types/types';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

interface Props {
  data: IAssistantChannels;
  handleDelete: (id: number) => void;
  onSelect: (id: number) => void;
}
const AssistantPreview: React.FC<Props> = ({data, handleDelete, onSelect}) => {  
  const {t} = useTranslation();
  const isToday = moment
  .utc(data?.messages?.results?.[0]?.created_at)
  .isSame(moment.utc().startOf('day'), 'day');
  return (
    <Swipeable
      style={style.chatContainer}
      rightButtonWidth={calcWidth(40)}
      rightButtons={[
        <Pressable
          onPress={() => {
            handleDelete(data.id);
          }}
          style={style.swipeDeleteButton}>
          <Icons.DeleteChat fill="white" />
        </Pressable>,
      ]}>
      <Pressable
        onPress={() => onSelect(data.id)}
        style={style.assistantItemContainer}>
        <View style={style.assistantHeader}>
          <Icons.ChannelAssistantIcon {...style.chatIcon} />
          <Text style={style.name} numberOfLines={1}>
            {data?.title ?? t('assistant')}
          </Text>
        </View>
        <View style={style.lastMessageContainer}>
          <Text style={style.lastMessage} numberOfLines={1}>
            {data?.messages?.results?.[0]?.message ?? t('emptyMessage')}
          </Text>
          <Text style={style.dateText}>
            {isToday
              ? moment(data?.messages?.results?.[0]?.created_at).format('HH:mm')
              : moment(data?.messages?.results?.[0]?.created_at).format(
                  'YYYY/MM/DD',
                )}
          </Text>
        </View>
      </Pressable>
    </Swipeable>
  );
};

export default AssistantPreview;
