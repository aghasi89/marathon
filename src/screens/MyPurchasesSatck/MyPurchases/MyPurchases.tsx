import * as React from 'react';
import { ActivityIndicator, Dimensions, FlatList, View } from 'react-native';
import CreatePackTab from '../../ChatStack/Chat/ChannelFromPack/components/CreatePackTab/CreatePackTab';
import ButtonsTabBar from '../../../components/buttonsTabBar/ButtonsTabBar';
import InputComponent from '../../FeedStack/CreateFeed/components/InputComponent/InputComponent';
import MyCreationsFeedCard from '../../../components/myCreationsFeedCard/MyCreationsFeedCard';
import Icons from '../../../assets/icons/svg/index';
import {
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../assets/dimensions';
import Header from '../../ProfileStack/components/Header/Header';
import MyPurchasesHook from './MyPurchases-hook';
import styles from './MyPurchases.style';

const MyPurchasesScreen: React.FC = () => {
  const {
    t,
    goBack,
    selectedTab,
    tabSelectHandle,
    loading,
    isPaginationLoading,
    onPageEndReachedHandle,
    feedCardData,
    onSearchInputValueChange,
    selectedSecondTab,
    handleTabPress,
    cardPressHandle
  } = MyPurchasesHook();

  const data = [
    {
      title: 'Live',
      icon: (
        <Icons.LiveIcon
          {...styles.tabBarIcon}
          fill={selectedTab.index !== 0 ? primaryBlack : primaryWhite}
        />
      ),
    },
    {
      title: 'Packages',
      icon: (
        <Icons.FeedCardPacksIcon
          {...styles.tabBarIcon}
          fill={selectedTab.index !== 1 ? primaryBlack : primaryWhite}
        />
      ),
    },
  ];

  const windowSize = Dimensions.get('screen');
  const cardItemWidth = (windowSize.width - (2 + 1) * calcWidth(16)) / 2;

  return (
    <View style={styles.screenContainer}>
      <Header goBack={goBack} title={`My ${selectedTab.name}`} />
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
        <CreatePackTab
          activeTab={selectedSecondTab}
          handleTabPress={handleTabPress}
        />
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} color={primaryBlue} />
          </View>
        ) : (
          <FlatList
            overScrollMode="never"
            numColumns={2}
            //@ts-ignore
            data={feedCardData}
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
    </View>
  );
};

export default MyPurchasesScreen;