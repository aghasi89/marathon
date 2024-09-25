import React from 'react';
import {Text, ScrollView, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icons from '../../../../assets/icons/svg/index';
import {primaryBlack} from '../../../../assets/styles/colors.styles';
import MainHeader from '../../../../components/headers/mainHeader/MainHeader';
import SubscriptionCard from '../../../../components/subscriptionCard/SubscriptionCard';
import EditSheet from '../../../../components/editSheet/EditSheet';
import {NavigationParamList} from '../..';
import styles from './Subscriptions.style';
import Hook from './Subscriptions-hook';
import {IFollower} from './Subscriptions-reducer';

type Props = NativeStackScreenProps<NavigationParamList, 'Subscriptions'>;

const Subscriptions: React.FC<Props> = ({navigation}) => {
  const {
    state,
    leftIconPress,
    isOpen,
    setIsOpen,
    index,
    setIndex,
    checkIsFollowing,
    addFollowing,
  } = Hook(navigation);

  const editSheet = [
    {
      title: 'Edit',
      onSelect: () => {
        setIsOpen(false);
      },
      Icon: <Icons.Edit />,
    },
    {
      title: 'Delete',
      onSelect: () => {
        setIsOpen(false);
      },
      Icon: <Icons.DeleteIcon fill={primaryBlack} />,
    },
    {
      title: 'Copy Link',
      onSelect: () => {
        setIsOpen(false);
      },
      Icon: <Icons.DuplicateIcon fill={primaryBlack} />,
    },
  ];

  const renderComponent = () => {
    switch (index) {
      case 0:
        return (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}>
            {state.followers.map((item: IFollower, index: number) => {
              return (
                <View key={index} style={styles.item}>
                  <SubscriptionCard
                    name={item.name}
                    imageUrl={item.imageUrl}
                    isFollow={checkIsFollowing(item.id)}
                    setIsFollow={() => {
                      checkIsFollowing(item.id);
                      addFollowing(item);
                    }}
                    onPress={() => setIsOpen(true)}
                  />
                </View>
              );
            })}
          </ScrollView>
        );
      case 1:
        return (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}>
            {state.following.map((item: IFollower, index: number) => {
              return (
                <View key={index} style={styles.item}>
                  <SubscriptionCard
                    name={item.name}
                    imageUrl={item.imageUrl}
                    isFollow={checkIsFollowing(item.id)}
                    setIsFollow={() => addFollowing(item)}
                    onPress={() => setIsOpen(true)}
                  />
                </View>
              );
            })}
          </ScrollView>
        );
      default:
    }
  };
  return (
    <View style={styles.container}>
      <MainHeader
        leftIconPress={leftIconPress}
        leftIcon={true}
        title={'coach_anne'}
      />
      <View style={styles.headerContainer}>
        {['Followers', 'Following'].map((element: string, indrxTab: number) => {
          return (
            <TouchableOpacity
              key={indrxTab}
              onPress={() => {
                setIndex(indrxTab);
              }}
              style={styles.touch}>
              <Text
                style={
                  index === indrxTab
                    ? styles.activeLabelStyle
                    : styles.labelStyle
                }>
                {element}{' '}
                {indrxTab == 0
                  ? state.followers.length
                  : state.following.length}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {renderComponent()}
      <EditSheet
        isVisible={isOpen}
        onClose={() => setIsOpen(false)}
        list={editSheet}
      />
    </View>
  );
};
export default Subscriptions;
