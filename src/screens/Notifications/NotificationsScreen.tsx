import React, { useCallback } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import Header from '../ProfileStack/components/Header/Header';
import NotificationsHook from './NotificationsScreen-hook';
import styles from './NotificationsScreen.style';
import { primaryBlue } from '../../assets/styles/colors.styles';
import NotificationCard from './NotificationCard/NotificationCard';
import moment from 'moment';
import { downloadMediaFromBunny } from '../../utils/bunny.net';
import videoLink from '../../utils/videoLink';

const NotificationsScreen: React.FC = () => {
  const {
    t,
    goBack,
    notifications,
    handleNavigateToFeedScreen
  } = NotificationsHook();

  const notificationCard = useCallback(
    (el: any) => {
      switch (el.type) {
        case 'like':
        case 'comment':
          return (
            <NotificationCard
              imageUrl={el.from_text.user.image
                ? downloadMediaFromBunny({
                  public_key: el.from_text.user.image,
                  mediaType: 'image',
                  userDir: el.from_text.user.id,
                  imageDir: 'profile',
                })?.url
                : undefined}
              notoficationTypeText={el.type == 'like' ? t('likePost') : t('commentPost')}
              name={el.from_text.user.user.first_name + " " + el.from_text.user.user.last_name}
              date={moment(el.created_at).format('DD-MM-YYYY')}
              onPress={() => { handleNavigateToFeedScreen(el.to_text.feed.id, el.to_text.feed.type, el.is_reed, el.id) }}
              feedImageUrl={el.to_text.feed.media[0] ? el.to_text.feed.media[0].type === 'image' ?
                downloadMediaFromBunny({
                  public_key: el.to_text.feed?.media[0].url,
                  mediaType: el.to_text.feed?.media[0].type,
                  userDir: el.to_text.feed?.creator,
                  imageDir: 'feed',
                })?.url
                : el.to_text.feed.media[0].type === 'videoLink'
                  ? videoLink(el.to_text.feed.media[0].url)
                  : el.to_text.feed.media[0].type === 'video'
                    ? downloadMediaFromBunny({
                      public_key: el.to_text.feed?.media[0].url,
                      mediaType: el.to_text.feed?.media[0].type,
                      userDir: el.to_text.feed?.creator,
                      imageDir: 'feed',
                    })?.thumbnailURL : "" : ""}
              is_reed={el.is_reed}
            />
          );
        case 'follow':
          return (<></>
          );
      }
    },
    [],
  );

  if (!notifications) return <ActivityIndicator style={styles.loadingContainer} size={'large'} color={primaryBlue} />
  console.log(notifications);

  return (
    <View style={styles.container}>
      <Header goBack={goBack} title={t('notifications')} />
      <ScrollView style={{ flex: 1 }}>
        {
          notifications.map((el) => {
            return notificationCard(el)
          })
        }
      </ScrollView>
    </View>
  );
};
export default NotificationsScreen;
