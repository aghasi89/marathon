import React, {useRef} from 'react';
import {Pressable, ScrollView, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
  useScrollHandlers,
} from 'react-native-actions-sheet';
import {useNavigation} from '@react-navigation/native';
import SelectedCardsView from '../../screens/FeedStack/CreateFeed/components/SelectedCardsView/SelectedCardsView';
import {coachRecipesSelector} from '../../store/selectors/feed-selector';
import videoLink from '../../utils/videoLink';
import {downloadMediaFromBunny} from '../../utils/bunny.net';
import sendCustomAttachement from '../../utils/sendCustomAttachement';
import {setConnectPrivateWorkout} from '../../store/actions/feed-action';
import calculateCalories from '../../utils/calculateCalories';
import Icons from '../../assets/icons/svg/index';
import styles from './SendRecipeSheet.style';

const SendRecipeSheet = ({sheetId, payload}: SheetProps<any>) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const navigation = useNavigation();
  const scrollHandlers = useScrollHandlers<ScrollView>('1', actionSheetRef);
  const recipeList = useSelector(coachRecipesSelector);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const onSelectRecipe = async (item: any) => {
    const recipeProps = {
      id: item.id,
      image: item.url,
      title: item.title,
      calories: item.calories,
      duration: item.duration,
    };
    await sendCustomAttachement(
      recipeProps,
      'recipe',
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
    SheetManager.hide('sendRecipeSheet');
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
      <Text style={styles.workoutHeader}>{t(`recipeList`)}</Text>
      {/* <InputComponent
              onChange={onSearchInputValueChange}
              placeholder={t(`recipes`) ?? ''}
              icon={<Icons.SearchIcon />}
              containerStyle={styles.searchInputContainer}
              inputStyle={styles.searchInput}
            /> */}
      <ScrollView {...scrollHandlers} style={styles.scrollview}>
        <SelectedCardsView
          dataList={recipeList?.map(el => {
            return {
              id: el?.feed?.id ?? -1,
              calories: calculateCalories(
                el.protein,
                el?.fat,
                el.carbohydrates,
              ),
              duration: el?.duration,
              title: el?.feed?.title,
              url:
                el.feed?.media[0]?.type === 'videoLink'
                  ? videoLink(el.feed?.media[0]?.url)
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
          isRecipe={true}
          rowElementsCount={2}
          cardSize="large"
          iconsExist={false}
          timeIcons={true}
          onSelect={item => {
            onSelectRecipe(item);
          }}
        />
      </ScrollView>
      <Pressable
        style={styles.createButton}
        onPress={() => {
          //@ts-ignore
          navigation.navigate('CREATE_FEED', {
            type: 'recipe',
            channelId: payload.channel?.id,
          });
          SheetManager.hide('sendRecipeSheet');
        }}>
        <Icons.Plus {...styles.plusIcon} />
      </Pressable>
    </ActionSheet>
  );
};
export default SendRecipeSheet;
