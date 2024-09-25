import React from 'react';
import {Pressable, Text, View} from 'react-native';
import Icons from '../../../../../../assets/icons/svg';
import style from './EmptyAssistantPreview.style';
import { useTranslation } from 'react-i18next';

interface Props {
  onSelect: (id: number | undefined) => void;
}
const EmptyAssistantPreview: React.FC<Props> = ({onSelect}) => {
  const {t} = useTranslation();
  const date = new Date();  
  return (
    <View
      style={style.chatContainer}>
      <Pressable
        onPress={() => onSelect(undefined)}
        style={style.assistantItemContainer}>
        <View style={style.assistantHeader}>
          <Icons.ChannelAssistantIcon {...style.chatIcon} />
          <Text style={style.name} numberOfLines={1}>
            {t('assistant')}
          </Text>
        </View>
        <View style={style.lastMessageContainer}>
          <Text style={style.lastMessage} numberOfLines={1}>
          {t('emptyMessage') ?? ""}
          </Text>
          <Text style={style.dateText}>{`${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default EmptyAssistantPreview;
