import React from 'react';
import {Text, RefreshControl, ScrollView} from 'react-native';
import {ActivityIndicator, Pressable, View} from 'react-native';
import SubscriptionCard from '../../../../components/subscriptionCard/SubscriptionCard';
import {primaryBlue} from '../../../../assets/styles/colors.styles';
import Icons from '../../../../assets/icons/svg';
import HeaderComponent from '../../CreateFeed/components/Header/Header';
import UserCardComponent from '../components/UserCardComponent/UserCardComponent';
import hook from './MembersList.hook';
import styles from './MembersList.style';

const MembersList: React.FC = () => {
  const {
    backIconPressHandle,
    userImagePressHandle,
    detailsIconPressHandle,
    refreshingHandle,
    followButtonPressHandle,
    loading,
    refreshing,
    data,
    selectedFeed,
    action,
  } = hook();

  const headerIcon = {
    joinedMembers: null,
    likesList: {
      icon: <Icons.EnergyStroke {...styles.headerIconStyle} />,
      text: data?.usersListDate?.length ?? 0,
    },
  };
  const renderList = () => {
    switch (action) {
      case 'joinedMembers':
        return data?.usersListDate?.map((item, index) => (
          <View key={index} style={styles.rowContainer}>
            <Pressable onPress={() => userImagePressHandle(item)}>
              <UserCardComponent {...item} />
            </Pressable>
            {(!!selectedFeed?.coach_question?.length ||
              !!selectedFeed?.measurement?.length) && (
              <Pressable
                onPress={() => detailsIconPressHandle(item)}
                style={styles.detailsTouchContainer}>
                <Icons.ListIcon fill={primaryBlue} />
              </Pressable>
            )}
          </View>
        ));
      case 'likesList':
        return data?.usersListDate?.map((item, index) => (
          <SubscriptionCard
            containerStyle={styles.rowContainer}
            key={index}
            imageUrl={item.url ?? ''}
            name={item.name ?? ''}
            isFollow={item.am_i_follow??false}
            onPress={() => userImagePressHandle(item)}
            setIsFollow={() => followButtonPressHandle(item)}
            followButtonShow={item.followButtonShow}
          />
        ));

      default:
        break;
    }
  };
  return (
    <View style={styles.container}>
      <HeaderComponent
        rightIcon={action ? headerIcon[action]?.icon : undefined}
        rightText={action ? headerIcon[action]?.text.toString() : undefined}
        leftIconPressHandler={backIconPressHandle}
        title={data?.pageRenderDate.headerTitle ?? ''}
        containerStyle={styles.headerContainer}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={primaryBlue} />
        </View>
      ) : (
        <ScrollView
          overScrollMode="never"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshingHandle}
            />
          }
          style={styles.scrollContainer}>
          {!!data?.usersListDate?.length ? (
            renderList()
          ) : (
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>
                {data?.pageRenderDate.emptyListText}
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};
export default MembersList;
