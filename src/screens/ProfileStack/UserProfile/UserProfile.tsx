import * as React from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StickyHeaderScrollView,
  useStickyHeaderScrollProps,
} from 'react-native-sticky-parallax-header';
import Icons from '../../../assets/icons/svg/index';
import { primaryBlue, primaryWhite } from '../../../assets/styles/colors.styles';
import ActionSheet from '../../FeedStack/Feed/AboutFeed/components/ActionSheet/ActionSheet';
import { downloadMediaFromBunny } from '../../../utils/bunny.net';
import { PrimeryButton } from '../../../components/buttons';
import { calcHeight } from '../../../assets/dimensions';
import ChipItem from '../components/ChipsList/ChipItem/ChipItem';
import BackgroundImage from '../components/BackgroundImage/BackgroundImage';
import UserHeader from '../components/UserHeader/UserHeader';
import ChipsList from '../components/ChipsList/ChipsList';
import FeedsTab from '../components/FeedsTab/FeedsTab';
import Header from '../components/Header/Header';
import Status from '../components/Status/Status';
import UserProfileHook from './UserProfile-hook';
import styles from './UserProfile.style';

const PARALLAX_HEIGHT = 330;
const SNAP_START_THRESHOLD = 50;
const SNAP_STOP_THRESHOLD = 330;

const UserProfileScreen: React.FC = () => {
  const {
    t,
    person,
    navigateToSocial,
    handleFollowUser,
    followers,
    followings,
    actionSheetData,
    actionSheetVisibility,
    actionSheetCloseHandle,
    openActionSheet,
    user,
    dispatch,
    goBack,
    isLoading,
    handleOpenChat,
    pdfViewHandle,
    navigateFollowersFollowingsPage
  } = UserProfileHook();
  const { width: windowWidth } = useWindowDimensions();

  const {
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    scrollHeight,
    scrollValue,
    scrollViewRef,
  } = useStickyHeaderScrollProps<ScrollView>({
    parallaxHeight: PARALLAX_HEIGHT,
    snapStartThreshold: SNAP_START_THRESHOLD,
    snapStopThreshold: SNAP_STOP_THRESHOLD,
    snapToEdge: true,
  });

  return (
    <View style={styles.screenContainer}>
      <Header
        goBack={goBack}
        title={`${person?.user?.first_name} ${person?.user?.last_name}`}
        RightComponent={
          person?.id !== user?.id ? (
            <Pressable onPress={openActionSheet}>
              <Icons.ThreeDots />
            </Pressable>
          ) : null
        }
      />
      <View style={styles.stretchContainer}>
        <StickyHeaderScrollView
          ref={scrollViewRef}
          containerStyle={styles.stretchContainer}
          onScroll={onScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          renderHeader={() => {
            return (
              <View pointerEvents="box-none" style={{ height: scrollHeight }}>
                <View style={[styles.body, { width: windowWidth }]}>
                  <UserHeader
                    scrollValue={scrollValue}
                    imageUrl={
                      person?.image
                        ? downloadMediaFromBunny({
                          public_key: person?.image,
                          mediaType: 'image',
                          userDir: person?.id,
                          imageDir: 'profile',
                        })?.url
                        : undefined
                    }
                    roleMode={person?.role_mode ?? ''}
                    following={followings.length}
                    followers={followers.length}
                    navigateFollowersFollowingsPage={(value: "followers" | "followings") => navigateFollowersFollowingsPage(value)}
                  />
                </View>
                <BackgroundImage
                  scrollValue={scrollValue}
                  imageUrl={
                    person?.background_image
                      ? downloadMediaFromBunny({
                        public_key: person?.background_image,
                        mediaType: 'image',
                        aspectRatio: '16:9',
                        userDir: person?.id,
                        imageDir: 'profile',
                      })?.url
                      : undefined
                  }
                />
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          style={styles.stretch}>
          <SafeAreaView
            edges={['left', 'right', 'bottom']}
            style={styles.safeArea}>
            <View style={styles.horizonatal}>
              <View style={styles.rowContainer}>
                <View>
                  <Text style={styles.nameText}>
                    {person?.user?.first_name} {person?.user?.last_name}
                  </Text>
                </View>
              </View>
              <View style={styles.socialContainer}>
                {person?.id !== user?.id ? (
                  <>
                    <PrimeryButton
                      shadow={false}
                      type="default"
                      onPress={handleFollowUser}
                      title={
                        !isLoading
                          ? !person?.am_i_follow
                            ? t('follow') ?? ''
                            : t('unfollowing') ?? ''
                          : ''
                      }
                      style={styles.defaultButton}
                      textStyle={styles.defaultButtonText}
                      Icon={
                        isLoading && (
                          <ActivityIndicator
                            size={'small'}
                            color={primaryWhite}
                          />
                        )
                      }
                    />
                    <PrimeryButton
                      type="outline"
                      Icon={<Icons.ChatIcon {...styles.iconStyle} />}
                      onPress={handleOpenChat}
                      style={styles.smallButton}
                    />
                  </>
                ) : null}
              </View>
              {person?.status && <Status text={person?.status} />}
              {person?.speciality && person?.speciality.length > 0 && (
                <ChipsList
                  sectionTitle={t('speciality') ?? ''}
                  itemsList={person?.speciality}
                  itemContainerStyle={styles.listItemContainer}
                />
              )}
              {person?.certificate && person?.certificate.length > 0 && (
                <ChipsList
                  sectionTitle={t('certificates') ?? ''}
                  itemsList={person?.certificate}
                  itemContainerStyle={styles.listItemContainer}
                  icon={<Icons.Certificate style={styles.icon} />}
                  onPress={el => {
                    pdfViewHandle(el.certificate.file);
                  }}
                />
              )}
              {(person?.facebook || person?.instagram || person?.linkedin) && (
                <View>
                  <Text style={styles.sectionTitle}>{t('social')}</Text>
                  <View style={styles.sectionList}>
                    {!!person?.facebook && (
                      <ChipItem
                        onPress={() => navigateToSocial('facebook')}
                        icon={<Icons.FacebookIcon fill={primaryBlue} />}
                      />
                    )}
                    {!!person?.instagram && (
                      <ChipItem
                        onPress={() => navigateToSocial('instagram')}
                        icon={<Icons.InstagramIcon fill={primaryBlue} />}
                      />
                    )}
                    {!!person?.linkedin && (
                      <ChipItem
                        onPress={() => navigateToSocial('linkedin')}
                        icon={<Icons.LinkedinIcon fill={primaryBlue} />}
                      />
                    )}
                  </View>
                </View>
              )}
            </View>
            <FeedsTab person={true} user={person} />
            <ActionSheet
              data={actionSheetData}
              height={calcHeight(350)}
              onClose={actionSheetCloseHandle}
              visibility={actionSheetVisibility}
            />
          </SafeAreaView>
        </StickyHeaderScrollView>
      </View>
    </View>
  );
};

export default UserProfileScreen;
