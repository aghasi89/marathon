import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Share,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
  useScrollHandlers,
} from 'react-native-actions-sheet';
import styles from './FeedShareSheet.style';
import { selectedFeedSelector } from '../../store/selectors/feed-selector';
import videoLink from '../../utils/videoLink';
import { downloadMediaFromBunny } from '../../utils/bunny.net';
import { useTranslation } from 'react-i18next';
import { getFeedByIdAction } from '../../store/actions/feed-action';
import UserShareItem from '../userShareItem/UserShareItem';
import FeedShareItem from '../feedShareItem/feedShareItem';
import {
  followersSelector,
  followingsSelector,
  profileSelector,
} from '../../store/selectors/profile-selector';
import { primaryBlue } from '../../assets/styles/colors.styles';
import { getFollowers, getFollowings } from '../../store/actions/profile-action';
import AnalyticService from '../../utils/analytics/AnalyticService';
import sendCustomAttachement from '../../utils/sendCustomAttachement';
import { chatClient } from '../../services/chatConfig';
import Icons from '../../assets/icons/svg/index';
import sharing from '../../utils/sharing/generateSharePath';

const FeedShareSheet = ({ sheetId, payload }: SheetProps<any>) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const scrollHandlers = useScrollHandlers<ScrollView>('1', actionSheetRef);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selectedFeed = useSelector(selectedFeedSelector);
  const followers = useSelector(followersSelector);
  const followings = useSelector(followingsSelector);
  const whoUserArray = followers.map((item: any) => item.who_user);
  const whomUserArray = followers.map((item: any) => item.who_user);
  const combinedList = [...whoUserArray, ...whomUserArray];
  const user = useSelector(profileSelector);
  const [disabledButtons, setDisabledButtons] = useState({});

  useEffect(() => {
    if (user) {
      dispatch(getFollowers(user?.id));
      dispatch(getFollowings(user?.id));
    }
  }, [user]);

  useEffect(() => {
    dispatch(
      getFeedByIdAction({
        id: payload.data.id,
        type: 'feed',
      }),
    );
  }, []);
  const onPressShare = useCallback(() => {
    Share.share({
      title: payload.data.description,
      url: sharing({
        type: payload.data.type,
        id: payload.data.id,
        feedTypeId: payload.data.feedTypeId
      }),
      message: sharing({
        type: payload.data.type,
        id: payload.data.id,
        feedTypeId: payload.data.feedTypeId
      })
    });
    AnalyticService.shareFeed(payload.data.type, 'social_media');
  }, []);
  const feedImage = useMemo(() => {
    let image: string | undefined;
    switch (selectedFeed?.feed?.media[0]?.type) {
      case 'videoLink':
        image = videoLink(selectedFeed?.feed?.media[0]?.url);
        break;
      case 'video':
        image = downloadMediaFromBunny({
          public_key: selectedFeed?.feed?.media[0]?.url,
          mediaType: selectedFeed?.feed?.media[0]?.type,
          aspectRatio: selectedFeed?.feed?.media[0]?.size,
          userDir: selectedFeed?.feed?.creator,
          imageDir: 'feed'
        })?.thumbnailURL;
        break;
      case 'image':
        image = downloadMediaFromBunny({
          public_key: selectedFeed?.feed?.media[0]?.url,
          mediaType: selectedFeed?.feed?.media[0]?.type,
          aspectRatio: selectedFeed?.feed?.media[0]?.size,
          userDir: selectedFeed?.feed?.creator,
          imageDir: 'feed',
        })?.url;
        break;
      default:
        break;
    }
    return image;
  }, [selectedFeed]);
  const shareFeedHandler = useCallback(
    async (item: any) => {
      const feedProps = {
        image: feedImage,
        title: selectedFeed?.feed?.title,
        is_individual: selectedFeed.is_individual ? true : false,
        date: selectedFeed?.start_day,
        feedId: selectedFeed?.feed?.id,
        otherId: selectedFeed?.id,
        user_count: selectedFeed?.members?.length,
        type: 'feed',
        feedType: selectedFeed?.type
      };
      const channel = chatClient.channel('messaging', {
        members: [
          user?.get_stream_id?.toString(),
          item?.whom_user?.get_stream_id.toString(),
        ],
      });
      await channel.watch();
      sendCustomAttachement(feedProps, 'feed', channel, chatClient);
      setDisabledButtons(prevState => ({
        ...prevState,
        [item.id]: true,
      }));
      if (selectedFeed?.feed && selectedFeed?.feed.type !== 'feed')
        AnalyticService.shareFeed(selectedFeed?.feed?.type, 'chat');
    },
    [selectedFeed],
  );

  return (
    <ActionSheet
      safeAreaInsets={{ bottom: 0, top: 0, left: 0, right: 0 }}
      id={sheetId}
      ref={actionSheetRef}
      initialSnapIndex={0}
      statusBarTranslucent
      drawUnderStatusBar={true}
      gestureEnabled={true}
      containerStyle={styles.containerStyle}
      defaultOverlayOpacity={0.3}>
      <ScrollView {...scrollHandlers} style={styles.scrollview}>
        <Text style={styles.headerText}>{t(`share`)}</Text>
        {selectedFeed ? (
          <FeedShareItem
            date={selectedFeed?.start_day ?? ''}
            type="individual"
            disabled
            title={selectedFeed?.feed?.title}
            image={feedImage}
          />
        ) : (
          <ActivityIndicator color={primaryBlue} />
        )}

        {
          <FlatList
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>{t('emptyText')}</Text>
              </View>
            )}
            data={followings}
            keyExtractor={item => item.id?.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.followsContainer}>
                <UserShareItem
                  //@ts-ignore
                  disabled={disabledButtons[item.id]}
                  shareFeedHandler={() => shareFeedHandler(item)}
                  key={index}
                  imageUrl={
                    downloadMediaFromBunny({
                      public_key: item?.whom_user.image,
                      mediaType: 'image',
                      userDir: item?.whom_user.id,
                      imageDir: 'profile',
                    })?.url
                  }
                  userName={item.whom_user.user.username}
                />
              </View>
            )}
          />
        }
      </ScrollView>
      <TouchableOpacity style={styles.footer} onPress={onPressShare}>
        <Icons.ShareFeed fill={primaryBlue} />
      </TouchableOpacity>
    </ActionSheet>
  );
};
export default FeedShareSheet;
