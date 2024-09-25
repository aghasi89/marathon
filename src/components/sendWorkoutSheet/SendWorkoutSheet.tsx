import React, {useRef} from 'react';
import {Pressable, ScrollView, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
  useScrollHandlers,
} from 'react-native-actions-sheet';
import SelectedCardsView from '../../screens/FeedStack/CreateFeed/components/SelectedCardsView/SelectedCardsView';
import {coachWorkout} from '../../store/selectors/feed-selector';
import videoLink from '../../utils/videoLink';
import {downloadMediaFromBunny} from '../../utils/bunny.net';
import sendCustomAttachement from '../../utils/sendCustomAttachement';
import {setConnectPrivateWorkout} from '../../store/actions/feed-action';
import Icons from '../../assets/icons/svg/index';
import styles from './SendWorkoutSheet.style';

const SendWorkoutSheet = ({sheetId, payload}: SheetProps<any>) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const navigation = useNavigation();
  const scrollHandlers = useScrollHandlers<ScrollView>('1', actionSheetRef);
  const workoutList = useSelector(coachWorkout);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const onSelectWorkout = async (item: any) => {
    const workoutProps = {
      id: item.id,
      image: item.url,
      title: item.name,
      exercise: item.trainings.length,
      duration: item.duration,
    };

    await sendCustomAttachement(
      workoutProps,
      'workout',
      payload.channel,
      payload.client,
    );
    if (payload.channel) {
      dispatch(
        setConnectPrivateWorkout({
          feed: item.id,
          channel_id: payload.channel?.id,
        }),
      );
    }
    SheetManager.hide('sendWorkoutSheet');
  };
  return (
    <ActionSheet
      safeAreaInsets={{bottom: 0, top: 0, left: 0, right: 0}}
      id={sheetId}
      ref={actionSheetRef}
      initialSnapIndex={0}
      statusBarTranslucent
      drawUnderStatusBar={true}
      gestureEnabled={true}
      containerStyle={styles.containerStyle}
      defaultOverlayOpacity={0.3}>
      <Text style={styles.workoutHeader}>{t(`workoutList`)}</Text>
      {/* <InputComponent
              onChange={onSearchInputValueChange}
              placeholder={t(`equipment`) ?? ''}
              icon={<Icons.SearchIcon />}
              containerStyle={styles.searchInputContainer}
              inputStyle={styles.searchInput}
            /> */}
      <ScrollView {...scrollHandlers} style={styles.scrollview}>
        <SelectedCardsView
          dataList={workoutList?.map(el => {
            return {
              duration: el?.duration,
              id: el?.feed?.id ?? -1,
              name: el.feed?.title,
              trainings: el.trainings,
              url:
                el.feed?.media[0]?.type === 'videoLink'
                  ? videoLink(el.feed?.media[0].url)
                  : el.feed?.media[0]?.type === 'video'
                  ? downloadMediaFromBunny({
                      public_key: el.feed?.media[0]?.url,
                      mediaType: el.feed?.media[0]?.type,
                      userDir: el.feed?.creator,
                      imageDir: 'feed',
                    })?.thumbnailURL
                  : downloadMediaFromBunny({
                      public_key: el.feed?.media[0]?.url,
                      mediaType: el.feed?.media[0]?.type,
                      userDir: el.feed?.creator,
                      imageDir: 'feed',
                    })?.url,
            };
          })}
          rowElementsCount={2}
          cardSize="large"
          iconsExist={false}
          timeIcons={true}
          onSelect={item => {
            onSelectWorkout(item);
          }}
        />
      </ScrollView>
      <Pressable
        style={styles.createButton}
        onPress={() => {
          //@ts-ignore
          navigation.navigate('WORKOUT_TYPE_SELECT', {
            type: 'workout',
            channelId: payload.channel?.id,
          });
          SheetManager.hide('sendWorkoutSheet');
        }}>
        <Icons.Plus {...styles.plusIcon} />
      </Pressable>
    </ActionSheet>
  );
};
export default SendWorkoutSheet;
