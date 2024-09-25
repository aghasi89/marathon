import React from 'react';
import {
  View,
  ActivityIndicator,
  RefreshControl,
  Animated,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ButtonsTabBar from '../../../components/buttonsTabBar/ButtonsTabBar';
import DrawerHeader from '../../../components/drawerHeader/DrawerHeader';
import {
  primaryWhite,
  primaryBlue,
  lightPeriwinkles,
} from '../../../assets/styles/colors.styles';
import Icons from '../../../assets/icons/svg';
import {calcHeight} from '../../../assets/dimensions';
import CreatePublicationCard from './components/CreatePublicationCard/CreatePublicationCard';
import ActionSheet from './AboutFeed/components/ActionSheet/ActionSheet';
import FeedListItem from './FeedListItem/FeedListItem';
import FeedHook from './Feed-hook';
import styles from './Feed.style';
import BottomModal from '../../../components/bottomModal/bottomModal';
import HeaderComponent from '../CreateFeed/components/Header/Header';
import InputComponent from '../CreateFeed/components/InputComponent/InputComponent';
import {PrimeryButton} from '../../../components/buttons';

const FeedScreen: React.FC = () => {
  const {
    searchIconPressHandle,
    tabSelectHandle,
    selectedTab,
    onPageEndReachedHandle,
    actionSheetCloseHandle,
    hidePressHandle,
    reportPressHandle,
    canclePressHandle,
    actionSheetVisibility,
    loading,
    feedCardData,
    user,
    handleThreeDots,
    deletePressHandle,
    editPressHandle,
    sharePressHandle,
    blockPressHandle,
    createPublicationInputChangeHandle,
    createPublicationButtonPressHandle,
    createPublicationValue,
    t,
    navigation,
    refreshing,
    refreshingHandle,
    creatorId,
    handleSnap,
    handleScroll,
    ref,
    headerHeight,
    translateY,
    isPaginationLoading,
    viewabilityConfigCallbackPairs,
    activeVideo,
    reportModalVisible,
    repotModalCloseHandle,
    reportCategories,
    selectReportType,
    selectedStepIndex,
    reportValue,
    backIconPressHandle,
    setReportValue,
    reportHandler,
    saveHandler,
  } = FeedHook();

  const actionSheetDataforUser = [
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
      title: t('share'),
      Icon: <Icons.Repost {...styles.actionSheetIcon} />,
      onSelect: sharePressHandle,
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

  const actionSheetData = [
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
  const data = [
    {
      title: t('lives'),
      icon: <Icons.LiveIcon {...styles.tabBarIcon} fill={lightPeriwinkles} />,
    },
    {
      title: t('coaches'),
      icon: <Icons.User {...styles.tabBarIcon} fill={lightPeriwinkles} />,
    },
    {
      title: t('workouts'),
      icon: <Icons.Dumbbells {...styles.tabBarIcon} fill={lightPeriwinkles} />,
    },
    {
      title: t('recipes'),
      icon: <Icons.Recipe {...styles.tabBarIcon} fill={lightPeriwinkles} />,
    },
    {
      title: t('articles'),
      icon: <Icons.Article {...styles.tabBarIcon} fill={lightPeriwinkles} />,
    },
    {
      title: t('packs'),
      icon: (
        <Icons.FeedCardPacksIcon
          {...styles.tabBarIcon}
          fill={lightPeriwinkles}
        />
      ),
    },
  ];
  const renderReports = () => {
    switch (selectedStepIndex) {
      case 1:
        return (
          <>
            <Text style={styles.reportQuestion}>{t(`reportReason`)}</Text>
            <FlatList
              data={reportCategories}
              keyExtractor={item => item.id?.toString()}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => selectReportType(item)}
                  style={styles.reportItem}
                  key={index}>
                  <Text style={styles.reportItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.reportQuestion}>{t(`reportInfo`)}</Text>
            <InputComponent
              multiline
              onChange={text => {
                setReportValue(text);
              }}
              containerStyle={styles.reportInput}
              value={reportValue}
            />
            <PrimeryButton
              onPress={reportHandler}
              title={t(`report`) ?? ''}
              type="default"
              style={styles.applyButton}
            />
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.reportQuestion}>{t(`reportAnswer`)}</Text>
            <PrimeryButton
              onPress={saveHandler}
              title={t(`save`) ?? ''}
              type="default"
              style={styles.applyButton}
            />
          </>
        );
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      {
        <View>
          <Animated.View
            style={[
              {
                transform: [{translateY}],
              },
              styles.header,
            ]}>
            <DrawerHeader {...{headerHeight}} navigation={navigation} />
          </Animated.View>
          <Animated.FlatList
            key={
              selectedTab.name !== 'feed' && selectedTab.name !== 'coaches'
                ? '-'
                : '#'
            }
            contentContainerStyle={[
              selectedTab.name !== 'feed' && selectedTab.name !== 'coaches'
                ? styles.listContainer
                : undefined,
            ]}
            numColumns={
              selectedTab.name !== 'feed' && selectedTab.name !== 'coaches'
                ? 2
                : 1
            }
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }
            onScroll={handleScroll}
            ref={ref}
            onMomentumScrollEnd={handleSnap}
            removeClippedSubviews={true}
            overScrollMode="never"
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refreshingHandle}
              />
            }
            data={feedCardData}
            ListFooterComponent={
              loading || isPaginationLoading ? (
                <ActivityIndicator
                  size="large"
                  color={primaryBlue}
                  style={{paddingBottom: calcHeight(20)}}
                />
              ) : null
            }
            onEndReached={onPageEndReachedHandle}
            keyExtractor={(item, index) =>
              (selectedTab.name !== 'feed' && selectedTab.name !== 'coaches'
                ? '-'
                : '#') +
              item.id?.toString() +
              index.toString()
            }
            ListHeaderComponent={() => (
              <>
                <View style={styles.headerEmptyView} />
                <ButtonsTabBar
                  borderWidth={1}
                  data={data}
                  setSelectedIndex={tabSelectHandle}
                  selectedButtonStyle={{
                    bgColor: primaryBlue,
                    textColor: primaryWhite,
                  }}
                  contentContainer={styles.tabBar}
                />
                {user && selectedTab.name === 'feed' ? (
                  <CreatePublicationCard
                    onChangeInputValue={createPublicationInputChangeHandle}
                    containerStyle={styles.createPublicationCard}
                    onPress={createPublicationButtonPressHandle}
                    inputValue={createPublicationValue}
                    isCoach={user.role_mode === 'coach'}
                  />
                ) : (
                  <View style={styles.emptyView} />
                )}
              </>
            )}
            renderItem={({item, index}) => (
              <FeedListItem
                numColumns={
                  selectedTab.name !== 'feed' && selectedTab.name !== 'coaches'
                    ? 2
                    : 1
                }
                cardType={
                  selectedTab.name === 'coaches'
                    ? 'coach'
                    : selectedTab.name !== 'feed'
                    ? 'imageCard'
                    : 'default'
                }
                globalType="feedList"
                autoplay={
                  true
                  // activeVideo !== undefined ? activeVideo === item.id : false
                }
                item={item}
                handleThreeDots={() => handleThreeDots(item)}
              />
            )}
          />
        </View>
      }
      <ActionSheet
        data={creatorId == user?.id ? actionSheetData : actionSheetDataforUser}
        onClose={actionSheetCloseHandle}
        visibility={actionSheetVisibility}
        height={creatorId == user?.id ? calcHeight(350) : calcHeight(400)}
      />
      <BottomModal
        customStyles={{
          containerStyle: {
            backgroundColor: primaryWhite,
          },
        }}
        onClose={repotModalCloseHandle}
        onPressIndicator={repotModalCloseHandle}
        visible={reportModalVisible}>
        <>
          <HeaderComponent
            leftIconPressHandler={backIconPressHandle}
            title={t(`report`) ?? ''}
          />
          <View style={styles.wrapper}>{renderReports()}</View>
        </>
      </BottomModal>
    </View>
  );
};
export default FeedScreen;
