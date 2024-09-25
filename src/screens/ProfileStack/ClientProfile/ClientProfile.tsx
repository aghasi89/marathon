import * as React from 'react';
import {Image, ScrollView, Text, View, useWindowDimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  StickyHeaderScrollView,
  useStickyHeaderScrollProps,
} from 'react-native-sticky-parallax-header';
import {downloadMediaFromBunny} from '../../../utils/bunny.net';
import {lightPeriwinkle} from '../../../assets/styles/colors.styles';
import Icons from '../../../assets/icons/svg/index';
import BackgroundImage from '../components/BackgroundImage/BackgroundImage';
import UserHeader from '../components/UserHeader/UserHeader';
import Header from '../components/Header/Header';
import ChipsList from '../components/ChipsList/ChipsList';
import FeedsTab from '../components/FeedsTab/FeedsTab';
import Status from '../components/Status/Status';
import ClientProfileHook from './ClientProfile-hook';
import styles from './ClientProfile.style';

const PARALLAX_HEIGHT = 330;
const SNAP_START_THRESHOLD = 50;
const SNAP_STOP_THRESHOLD = 330;

const ClientProfileScreen: React.FC = () => {
  const {t, user, handlenavigateToEditPage, followers, followings} =
    ClientProfileHook();

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
        onPress={handlenavigateToEditPage}
        title={user?.user.username ?? ''}
        Icon={<Icons.Edit fill={lightPeriwinkle} />}
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
                <View style={[styles.body, {width: windowWidth}]}>
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
                        : ''
                    }
                    roleMode={user?.role_mode ?? ''}
                    following={followings.length}
                    followers={followers.length}
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
                      : ''
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
                    {user?.user.first_name} {user?.user.last_name}
                  </Text>
                  {user?.googleLocation && (
                    <View style={styles.locationContainer}>
                      <Icons.Location />
                      <Text style={styles.location}>{user.googleLocation}</Text>
                    </View>
                  )}
                </View>
                {user?.language && (
                  <View style={styles.languagesContainer}>
                    {user?.language.slice(0, 2).map(el => {
                      return (
                        <View style={styles.rowItems}>
                          <Image
                            source={{uri: el.language.flag}}
                            style={styles.image}
                            resizeMode={'contain'}
                          />
                          <Text style={[styles.location]}>
                            {el.language.code}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>
              <Status text={user?.status ? user?.status : ''} />
              {user?.speciality && user?.speciality.length > 0 && (
                <ChipsList
                  sectionTitle={t('speciality') ?? ''}
                  itemsList={user?.speciality}
                />
              )}
            </View>
            <FeedsTab user={user} />
          </SafeAreaView>
        </StickyHeaderScrollView>
      </View>
    </View>
  );
};

export default ClientProfileScreen;
