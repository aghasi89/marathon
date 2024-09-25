import * as React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  View,
} from 'react-native';
import ButtonsTabBar from '../../../components/buttonsTabBar/ButtonsTabBar';
import Icons from '../../../assets/icons/svg/index';
import {
  lightPeriwinkles,
  primaryBlue,
  primaryWhite,
} from '../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../assets/dimensions';
import Header from '../../ProfileStack/components/Header/Header';
import MyCreationsHook from './MyCreations-hook';
import styles from './MyCreations.style';
import CreatePackTab from '../../ChatStack/Chat/ChannelFromPack/components/CreatePackTab/CreatePackTab';
import MyCreationsFeedCard from '../../../components/myCreationsFeedCard/MyCreationsFeedCard';
const MyCreationsScreen: React.FC = () => {
  const {
    t,
    goBack,
    selectedTab,
    tabSelectHandle,
    loading,
    isPaginationLoading,
    onPageEndReachedHandle,
    createPublicationButtonPressHandle,
    onSearchInputValueChange,
    selectedSecondTab,
    handleTabPress,
    cardData,
    user,
    cardPressHandle
  } = MyCreationsHook();
 
  const data = [
    {
      title:  t(`live`),
      icon: (
        <Icons.LiveIcon
          {...styles.tabBarIcon}
          fill={selectedTab.index !== 0 ? lightPeriwinkles : primaryWhite}
        />
      ),
      isHide: user?.role_mode !== "coach"
    },
    {
      title: t(`recipes`) ,
      icon: (
        <Icons.Recipe
          {...styles.tabBarIcon}
          fill={selectedTab.index !== 1 ? lightPeriwinkles : primaryWhite}
        />
      ),
      isHide: false
    },
    {
      title: t(`articles`),
      icon: (
        <Icons.Article
          {...styles.tabBarIcon}
          fill={selectedTab.index !== 2 ? lightPeriwinkles : primaryWhite}
        />
      ),
      isHide: false
    },
    {
      title: t(`packages`),
      icon: (
        <Icons.FeedCardPacksIcon
          {...styles.tabBarIcon}
          fill={selectedTab.index !== 3 ? lightPeriwinkles : primaryWhite}
        />
      ),
      isHide: user?.role_mode !== "coach"
    },
    {
      title:  t(`workouts`),
      icon: (
        <Icons.Dumbbells
          {...styles.tabBarIcon}
          fill={selectedTab.index !== 4 ? lightPeriwinkles : primaryWhite}
        />
      ),
      isHide: user?.role_mode !== "coach"
    },
    {
      title:   t('exercises'),
      icon: (
        <Icons.Boots
          {...styles.tabBarIcon}
          fill={selectedTab.index !== 5 ? lightPeriwinkles : primaryWhite}
        />
      ),
      isHide: user?.role_mode !== "coach"
    },
  ];

  const windowSize = Dimensions.get('screen');
  const cardItemWidth = (windowSize.width - (2 + 1) * calcWidth(16)) / 2;

  return (
    <View style={styles.screenContainer}>
      <Header goBack={goBack} title={t('myCreations')} />
      {/* <InputComponent
        onChange={onSearchInputValueChange}
        placeholder={t('search') ?? ""}
        icon={<Icons.SearchIcon />}
        containerStyle={styles.searchInputContainer}
        inputStyle={styles.searchInput}
        rightIcon={
          <Pressable>
            <Icons.Filter />
          </Pressable>
        }
      /> */}
      <View style={styles.body}>
        <ButtonsTabBar
          borderWidth={1}
          data={data}
          selectedIndex={selectedTab.index}
          setSelectedIndex={tabSelectHandle}
          selectedButtonStyle={{ bgColor: primaryBlue, textColor: primaryWhite }}
          contentContainer={styles.tabBar}
        />
        {(selectedTab.index == 0 || selectedTab.index == 3) && (
          <CreatePackTab
            activeTab={selectedSecondTab}
            handleTabPress={handleTabPress}
          />
        )}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} color={primaryBlue} />
          </View>
        ) : (
          <FlatList
            overScrollMode="never"
            numColumns={2}
            //@ts-ignore
            data={cardData}
            onEndReached={onPageEndReachedHandle}
            contentContainerStyle={styles.contentContainerStyle}
            ListFooterComponent={
              isPaginationLoading ? (
                <ActivityIndicator
                  size="large"
                  color={primaryBlue}
                  style={{ paddingBottom: calcHeight(20) }}
                />
              ) : null
            }
            renderItem={({ item, index }) => {
              return (
                <View
                  style={[
                    styles.cardItemContainer,
                    {
                      maxWidth: cardItemWidth,
                      minWidth: cardItemWidth,
                      height: calcHeight(192),
                    },
                  ]}>
                  <MyCreationsFeedCard onPress={cardPressHandle} data={item} />
                </View>
              );
            }}
          />
        )}
      </View>
      <Pressable
        style={styles.createButton}
        onPress={() =>
          createPublicationButtonPressHandle(selectedTab.name.toLowerCase())
        }>
        <Icons.Plus {...styles.plusIcon} />
      </Pressable>
    </View>
  );
};

export default MyCreationsScreen;
