import * as React from 'react';
import {ScrollView, Text, View, useWindowDimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  StickyHeaderScrollView,
  useStickyHeaderScrollProps,
} from 'react-native-sticky-parallax-header';
import {downloadMediaFromBunny} from '../../../utils/bunny.net';
import {primaryBlue} from '../../../assets/styles/colors.styles';
import Icons from '../../../assets/icons/svg/index';
import {calcHeight} from '../../../assets/dimensions';
import BackgroundImage from '../components/BackgroundImage/BackgroundImage';
import UserHeader from '../components/UserHeader/UserHeader';
import EditButton from '../components/EditButton/EditButton';
import ChipsList from '../components/ChipsList/ChipsList';
import Status from '../components/Status/Status';
import Header from '../components/Header/Header';
import ChipItem from '../components/ChipsList/ChipItem/ChipItem';
import FeedsTab from '../components/FeedsTab/FeedsTab';
import CoachProfileHook from './CoachProfile-hook';
import styles from './CoachProfile.style';

const PARALLAX_HEIGHT = 330;
const SNAP_START_THRESHOLD = 50;
const SNAP_STOP_THRESHOLD = 330;

const CoachProfileScreen: React.FC = () => {
  const {
    t,
    user,
    handlenavigateToEditPage,
    followers,
    followings,
    goBack,
    isProfileIncomplete,
    navigateToSocial,
    pdfViewHandle,
    navigateFollowersFollowingsPage,
    handlePressSeeAll,
  } = CoachProfileHook();

  const {width: windowWidth} = useWindowDimensions();

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
        title={`${user?.user?.first_name} ${user?.user?.last_name}`}
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
              <View pointerEvents="box-none" style={{height: scrollHeight}}>
                <View
                  style={[
                    styles.body,
                    {
                      width: windowWidth,
                      top:
                        user?.role_mode == 'coach'
                          ? calcHeight(110)
                          : calcHeight(130),
                    },
                  ]}>
                  <UserHeader
                    scrollValue={scrollValue}
                    imageUrl={
                      user?.image
                        ? downloadMediaFromBunny({
                            public_key: user?.image,
                            mediaType: 'image',
                            userDir: user?.id,
                            imageDir: 'profile',
                          })?.url
                        : undefined
                    }
                    roleMode={user?.role_mode ?? ''}
                    following={followings.length}
                    followers={followers.length}
                    navigateFollowersFollowingsPage={(
                      value: 'followers' | 'followings',
                    ) => navigateFollowersFollowingsPage(value)}
                  />
                </View>
                <BackgroundImage
                  scrollValue={scrollValue}
                  imageUrl={
                    user?.background_image
                      ? downloadMediaFromBunny({
                          public_key: user?.background_image,
                          mediaType: 'image',
                          aspectRatio: '16:9',
                          userDir: user?.id,
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
                    {user?.user?.first_name} {user?.user?.last_name}
                  </Text>
                  <EditButton
                    onPress={handlenavigateToEditPage}
                    incomplete={isProfileIncomplete}
                  />
                  {isProfileIncomplete && (
                    <Text style={styles.message}>
                      {'* ' + t('incompeteProfile')}
                    </Text>
                  )}
                </View>
              </View>
              {user?.status && (
                <Status text={user?.status ? user?.status : ''} />
              )}
              {user?.speciality && user?.speciality.length > 0 && (
                <ChipsList
                  sectionTitle={t('speciality') ?? ''}
                  itemsList={user?.speciality}
                  itemContainerStyle={styles.listItemContainer}
                />
              )}
              {user?.role_mode == 'coach' && (
                <ChipsList
                  sectionTitle={t('certificates') ?? ''}
                  itemsList={user?.certificate}
                  itemContainerStyle={styles.horizontalListItemContainer}
                  icon={<Icons.Certificate style={styles.icon} />}
                  onPress={el => {
                    pdfViewHandle(el.certificate.file);
                  }}
                  isHorizontal={true}
                  showSeeAll={true}
                  onPressSeeAll={handlePressSeeAll}
                  isEmpty={
                    user?.certificate && user?.certificate.length > 0
                      ? false
                      : true
                  }
                />
              )}
              {(user?.facebook || user?.instagram || user?.linkedin) && (
                <View>
                  <Text style={styles.sectionTitle}>{t('social')}</Text>
                  <View style={styles.sectionList}>
                    {!!user?.facebook && (
                      <ChipItem
                        onPress={() => navigateToSocial('facebook')}
                        icon={<Icons.FacebookIcon fill={primaryBlue} />}
                      />
                    )}
                    {!!user?.instagram && (
                      <ChipItem
                        onPress={() => navigateToSocial('instagram')}
                        icon={<Icons.InstagramIcon fill={primaryBlue} />}
                      />
                    )}
                    {!!user?.linkedin && (
                      <ChipItem
                        onPress={() => navigateToSocial('linkedin')}
                        icon={<Icons.LinkedinIcon fill={primaryBlue} />}
                      />
                    )}
                  </View>
                </View>
              )}
            </View>
            <FeedsTab user={user} />
          </SafeAreaView>
        </StickyHeaderScrollView>
      </View>
    </View>
  );
};

export default CoachProfileScreen;
