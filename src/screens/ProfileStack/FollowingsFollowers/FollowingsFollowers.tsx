import {ActivityIndicator, FlatList, View} from 'react-native';
import Header from '../components/Header/Header';
import FollowersFollowingsTab from './components/FollowersFollowingsTab/FollowersFollowingsTab';
import ChannelFromPackHook from './FollowingsFollowers-hook';
import styles from './FollowingsFollowers.style';
import {useCallback} from 'react';
import {downloadMediaFromBunny} from '../../../utils/bunny.net';
import UserCard from './components/UserCard/UserCard';

interface IProps {
  screenType: string
}

const FollowersFollowings: React.FC<IProps> = ({ screenType }) => {
  const {
    t,
    selectedTab,
    handleTabPress,
    followers,
    followings,
    goBack,
    user,
    userId,
    handleUnfollow,
    isLoading,
    navigateToFollowsPage
  } = ChannelFromPackHook();

  const renderUserCard = useCallback(
    ({item}: {item: any}) => {      
      return (
        <UserCard
          id={item.id}
          screenType={screenType}
          userName={
            selectedTab == 'followers'
              ? item.who_user.user.first_name +
                ' ' +
                item.who_user.user.last_name
              : item.whom_user.user.first_name +
                ' ' +
                item.whom_user.user.last_name
          }
          imageUrl={
            downloadMediaFromBunny({
              public_key:
                selectedTab == 'followers'
                  ? item.who_user?.image
                  : item.whom_user?.image,
              mediaType: 'image',
              userDir:selectedTab == 'followers'
              ? item.who_user?.id
              : item.whom_user?.id,
              imageDir:'profile',
            })?.url ?? ''
          }
          isUnfollow={
            screenType === "MyProfile" ? user?.id == userId && selectedTab == 'followers' ? false : true
            : item.am_i_follow
          }
          handleUnfollow={() => handleUnfollow(selectedTab == 'followers' ? item.who_user.id : item.whom_user.id)}
          // handleCardPress={() => navigateToFollowsPage(item.who_user.id)}
          handleCardPress={() => null}
        />
      );
    },
    [selectedTab, screenType],
  );

  return (
    <View style={styles.container}>
      <Header goBack={goBack} title={t(`followers`)} />
      <View style={styles.subContainer}>
        <FollowersFollowingsTab
          followersCount={followers?.length ?? 0}
          followingsCount={followings?.length ?? 0}
          activeTab={selectedTab}
          handleTabPress={handleTabPress}
        />
        {isLoading ? (
          <ActivityIndicator size={'large'} style={styles.loadingContainer} />
        ) : (
          <FlatList
            style={styles.usersList}
            data={selectedTab == 'followers' ? followers : followings}
            renderItem={renderUserCard}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item?.id?.toString()}
          />
        )}
      </View>
    </View>
  );
};

export default FollowersFollowings;
