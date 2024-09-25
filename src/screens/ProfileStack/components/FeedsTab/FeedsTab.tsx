import React, {useMemo} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import ButtonsTabBar from '../../../../components/buttonsTabBar/ButtonsTabBar';
import {
  primaryWhite,
  primaryBlue,
  lightPeriwinkles,
} from '../../../../assets/styles/colors.styles';
import {IUser} from '../../../../types/types';
import {calcHeight} from '../../../../assets/dimensions';
import Icons from '../../../../assets/icons/svg';
import FeedListItem from '../../../FeedStack/Feed/FeedListItem/FeedListItem';
import ActionSheet from '../../../FeedStack/Feed/AboutFeed/components/ActionSheet/ActionSheet';
import FeedsTabHook from './FeedsTab-hook';
import styles from './FeedsTab.style';

interface IProps {
  user: IUser | undefined;
  person?: boolean;
}
const FeedsTab: React.FC<IProps> = props => {
  const {person, user} = props;

  const {
    tabSelectHandle,
    selectedTab,
    onPageEndReachedHandle,
    actionSheetCloseHandle,
    actionSheetVisibility,
    loading,
    feedCardData,
    // user,
    handleThreeDots,
    hidePressHandle,
    reportPressHandle,
    canclePressHandle,
    deletePressHandle,
    editPressHandle,
    sharePressHandle,
    blockPressHandle,
    isPaginationLoading,
    t,
  } = FeedsTabHook(props);

  const actionSheetData = [
    // {
    //   title: t('share'),
    //   Icon: <Icons.Repost {...styles.actionSheetIcon} />,
    //   onSelect: sharePressHandle,
    // },
    {
      title: t('edit'),
      Icon: <Icons.Edit {...styles.actionSheetIcon} />,
      onSelect: editPressHandle,
    },
    {
      title: t('delete'),
      Icon: <Icons.DeleteIcon {...styles.actionSheetIcon} />,
      onSelect: deletePressHandle,
    },
    {
      title: t('cancel'),
      Icon: <Icons.Close {...styles.actionSheetIcon} />,
      onSelect: canclePressHandle,
    },
  ];

  const userActionSheetData = [
    {
      title: t('hide'),
      Icon: <Icons.Hide {...styles.actionSheetIcon} />,
      onSelect: hidePressHandle,
    },
    {
      title: t('report'),
      Icon: <Icons.ReportIcon {...styles.actionSheetIcon} />,
      onSelect: reportPressHandle,
    },
    {
      title: t('block'),
      Icon: <Icons.Block {...styles.actionSheetIcon} />,
      onSelect: blockPressHandle,
    },
    {
      title: t('cancel'),
      Icon: <Icons.Close {...styles.actionSheetIcon} />,
      onSelect: canclePressHandle,
    },
  ];
  const data = useMemo(() => {
    if(user && user.role_mode != 'coach') {
      return [
        {
          title: t('all'),
        },
        {
          title: t('recipes'),
          icon: (
            <Icons.Recipe
              {...styles.tabBarIcon}
              fill={
                selectedTab.index !== 3 ? lightPeriwinkles : primaryWhite
              }
            />
          ),
        },
        {
          title: t('articles'),
          icon: (
            <Icons.Article
              {...styles.tabBarIcon}
              fill={
                selectedTab.index !== 4 ? lightPeriwinkles : primaryWhite
              }
            />
          ),
        },
      ];
    } else {
      return [
        {
          title: t('all'),
        },
        {
          title: t('lives'),
          icon: (
            <Icons.LiveIcon
              {...styles.tabBarIcon}
              fill={
                selectedTab.index !== 1 ? lightPeriwinkles : primaryWhite
              }
            />
          ),
        },
        {
          title: t('workouts'),
          icon: (
            <Icons.Dumbbells
              {...styles.tabBarIcon}
              fill={
                selectedTab.index !== 2 ? lightPeriwinkles : primaryWhite
              }
            />
          ),
        },
        {
          title: t('recipes'),
          icon: (
            <Icons.Recipe
              {...styles.tabBarIcon}
              fill={
                selectedTab.index !== 3 ? lightPeriwinkles : primaryWhite
              }
            />
          ),
        },
        {
          title: t('articles'),
          icon: (
            <Icons.Article
              {...styles.tabBarIcon}
              fill={
                selectedTab.index !== 4 ? lightPeriwinkles : primaryWhite
              }
            />
          ),
        },
        {
          title: t('packs'),
          icon: (
            <Icons.FeedCardPacksIcon
              {...styles.tabBarIcon}
              fill={
                selectedTab.index !== 5 ? lightPeriwinkles : primaryWhite
              }
            />
          ),
        },
      ];
    }
  }, [user]);

  const renderFeedList = useMemo(() => {
    return (
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={feedCardData}
        onEndReached={onPageEndReachedHandle}
        ListFooterComponent={
          isPaginationLoading ? (
            <ActivityIndicator
              size="large"
              color={primaryBlue}
              style={{paddingBottom: calcHeight(20)}}
            />
          ) : null
        }
        keyExtractor={(item, index) => item.id?.toString() + index.toString()}
        renderItem={({item, index}) => {
          return (!user && item.isPublic) || user ? (
            <FeedListItem
              followButtonShow={true}
              globalType="profilePage"
              item={item}
              handleThreeDots={() => handleThreeDots(item)}
            />
          ) : null;
        }}
        ListEmptyComponent={
          <Text style={styles.emptyResultText}>{t('noResultsFound')}</Text>
        }
      />
    );
  }, [feedCardData]);

  return (
    <View style={styles.container}>
      <ButtonsTabBar
        borderWidth={1}
        data={data}
        selectedIndex={selectedTab.index}
        setSelectedIndex={tabSelectHandle}
        selectedButtonStyle={{
          bgColor: primaryBlue,
          textColor: primaryWhite,
        }}
        contentContainer={styles.tabBar}
        containerStyle={styles.tapBarContainer}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={primaryBlue} />
        </View>
      ) : (
        <>{renderFeedList}</>
      )}
      <ActionSheet
        data={person ? userActionSheetData : actionSheetData}
        height={calcHeight(350)}
        onClose={actionSheetCloseHandle}
        visibility={actionSheetVisibility}
      />
    </View>
  );
};
export default FeedsTab;
