import React from 'react';
import {Image} from 'react-native';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import type {Channel, ChannelMemberResponse} from 'stream-chat';
import {StreamChatGenerics} from '../../../../AppContext';
import styles from './CreatorAddedInfo.style';

interface IProps {
  channel: Channel<StreamChatGenerics>;
  members: ChannelMemberResponse<StreamChatGenerics>[];
}

export const CreatorAddedInfo: React.FC<IProps> = ({channel, members}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.addContainer}>
      <Text style={styles.creatorAddText}>
        <Text
          style={
            styles.creatorAddName
          }>{`${channel.data?.created_by?.name}`}</Text>
        {channel.data?.type === 'group'
          ? ` ${t('createdGroup')} `
          : ` ${t('createdChannel')} `}
        {'<< '}
        <Text style={styles.creatorAddName}>{`${channel.data?.name}`}</Text>
        {' >>'}
      </Text>
      {members?.map((item, index) => {
        return (
          item.role !== 'owner' && (
            <Text key={index + 'members'} style={styles.addText}>
              <Text
                style={
                  styles.creatorAddName
                }>{`${channel.data?.created_by?.name} `}</Text>
              {`${t('added')}`}
              <Text style={styles.creatorAddName}>{` ${item.user?.name}`}</Text>
            </Text>
          )
        );
      })}
      {channel?.data?.image ? (
        <View style={{alignItems: 'center'}}>
          <Text style={styles.creatorAddText}>
            <Text
              style={
                styles.creatorAddName
              }>{`${channel.data?.created_by?.name}`}</Text>
            {` ${t('updatePhoto')} `}
          </Text>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="contain"
              style={styles.userAvatar}
              source={{
                uri: channel.data.image as string,
              }}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};
