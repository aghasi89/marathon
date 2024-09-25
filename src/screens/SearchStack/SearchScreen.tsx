import React from 'react';
import {
  ActivityIndicator,
  Text,
  View,
} from 'react-native';
import HeaderWithSearch from '../../components/headerWithSearch/HeaderWithSearch';
import ButtonsTabBar from '../../components/buttonsTabBar/ButtonsTabBar';
import {
  lightPeriwinkles,
  primaryBlue,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import FeedSearchListComponent from './components/FeedSearchListComponent/FeedSearchListComponent';
import Icons from '../../assets/icons/svg';
import ChipsList from './components/ChipsList/ChipsList';
import SearchHook from './Search-hook';
import styles from './Search.style';

const SearchScreen: React.FC = () => {
  const {
    serchResultsList,
    searchValue,
    loading,
    selectedTab,
    emptyListValue,
    selectedFiltersData,
    inputRef,
    tabsListRef,
    t,
    searchValueChangeHandle,
    backIconPressHandle,
    tabSelectHandle,
    cardPressHandle,
    filterButtonPressHandle,
    handleRemoveFilter,
    onEndReachedHandle,
    handleFocuseInput,
    handleUnfollow,
    amIFollowList,
    tabs
  } = SearchHook();

  const data = [
    {
      title: t('all'),
      icon: null,
    },
    {
      title: t('lives'),
      icon: (
        <Icons.LiveIcon
          {...styles.tabBarIcon}
          fill={selectedTab.index !== 1 ? lightPeriwinkles : primaryWhite}
        />
      ),
    },
    {
      title: t('coaches'),
      icon: (
        <Icons.User
          {...styles.tabBarIcon}
          fill={selectedTab.index !== 2 ? lightPeriwinkles : primaryWhite}
        />
      ),
    },
    {
      title: t('workouts'),
      icon: (
        <Icons.Dumbbells
          {...styles.tabBarIcon}
          fill={selectedTab.index !== 3 ? lightPeriwinkles : primaryWhite}
        />
      ),
    },
    {
      title: t('recipes'),
      icon: (
        <Icons.Recipe
          {...styles.tabBarIcon}
          fill={selectedTab.index !== 4 ? lightPeriwinkles : primaryWhite}
        />
      ),
    },
    {
      title: t('articles'),
      icon: (
        <Icons.Article
          {...styles.tabBarIcon}
          fill={selectedTab.index !== 5 ? lightPeriwinkles : primaryWhite}
        />
      ),
    },
    {
      title: t('packs'),
      icon: (
        <Icons.FeedCardPacksIcon
          {...styles.tabBarIcon}
          fill={selectedTab.index !== 6 ? lightPeriwinkles : primaryWhite}
        />
      ),
    },
  ];
  return (
    <View style={styles.container}>
      <HeaderWithSearch
        leftIconPressHandler={backIconPressHandle}
        inputAutoFocus={selectedTab.index === 0}
        placeholder={t('search') ?? ''}
        inputValue={searchValue}
        inputValueChange={searchValueChangeHandle}
        filterIconShow={selectedTab.index !== 0}
        onFilterPress={filterButtonPressHandle}
        onFocuse={handleFocuseInput}
        inputRef={inputRef}
      />
      <ButtonsTabBar
        flatlistRef={tabsListRef}
        borderWidth={1}
        data={data}
        selectedIndex={selectedTab.index}
        setSelectedIndex={tabSelectHandle}
        selectedButtonStyle={{
          bgColor: primaryBlue,
          textColor: primaryWhite,
        }}
        contentContainer={styles.tabBar}
        containerStyle={styles.tabBarContainer}
      />
      <ChipsList deleteChip={handleRemoveFilter} containerStyle={styles.selectedFiltersContainer} data={selectedFiltersData} />
      {loading ? (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size={'large'} color={primaryBlue} />
        </View>
      ) : (serchResultsList.coachesList.length || serchResultsList.defaultList?.length || serchResultsList.sortedList.length) ? (
        <FeedSearchListComponent
          onEndReached={onEndReachedHandle}
          data={serchResultsList.defaultList}
          sortedData={serchResultsList.sortedList}
          dataType={selectedTab.name === 'feed' ? 'all' : selectedTab.name !== 'coaches' ? 'default' : 'coaches'}
          coachesData={serchResultsList.coachesList}
          rowItemsCount={2}
          cardPressHandle={cardPressHandle}
          onFollowButtonPress={handleUnfollow}
          amIFollowList={amIFollowList}
          handleSeeAll={(title: string) => {
            const elem = tabs.filter(el => el.name == title)[0]
            tabSelectHandle(elem.index)
          }}
        />
      ) : (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyListText}>{t(emptyListValue)}</Text>
        </View>
      )
      }
    </View>
  );
};

export default SearchScreen;
