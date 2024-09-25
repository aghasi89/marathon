import React, {useCallback, useContext, useEffect} from 'react';
import {Platform, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {calcHeight} from '../assets/dimensions';
import FeedNavigationStack from './FeedNavigation';
import ProfileNavigationStack from './ProfileNavigation';
import Icons from '../assets/icons/svg';
import ChatNavigationStack from './ChatNavigation';
import {primaryBlack, primaryBlue} from '../assets/styles/colors.styles';
import CreateFeedScreen from '../screens/CreateFeed/CreateFeed';
import {setIsLogin} from '../store/actions/registration-action';
import {profileSelector} from '../store/selectors/profile-selector';
import UnreadMessageContext from '../screens/ChatStack/UnreadCountContext';
import {
  createFeedModalVisibilitySelector,
  feedButtonClickCount,
} from '../store/selectors/administrative-selector';
import {
  setCreateFeedModalVisibility,
  setFeedButtonClickCount,
} from '../store/actions/administrative-action';
import {feedListActiveFilterSelector} from '../store/selectors/feed-selector';
import {setFeedListActiveFilterAction} from '../store/actions/feed-action';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SearchNavigationStack from './SearchNavigation';
import styles from './Navigation.style';
import { setAssistantActive } from '../store/actions/assistant-actions';

export type TabNavigationParamList = {
  FEED_NAVIGATION_STACK: undefined;
  CHAT_NAVIGATION_STACK: undefined;
  PROFILE_NAVIGATION_STACK: undefined;
  SEARCH_NAVIGATION: undefined;
  CREATED_FEED_NAVIGATION: undefined;
};

const Tab = createBottomTabNavigator<TabNavigationParamList>();

type Props = NativeStackScreenProps<
  TabNavigationParamList,
  'CREATED_FEED_NAVIGATION'
>;
const TabNavigation: React.FunctionComponent = () => {
  const navigation = useNavigation<Props['navigation']>();
  const dispatch = useDispatch();
  const user = useSelector(profileSelector);
  const createFeedModalVisibility = useSelector(
    createFeedModalVisibilitySelector,
  );
  const {unreadCount} = useContext(UnreadMessageContext);
  const buttonClickedCount = useSelector(feedButtonClickCount);
  const selectedTab = useSelector(feedListActiveFilterSelector);
  const goToHome = useCallback(() => {
    dispatch(setIsLogin(true));
  }, []);
  useEffect(()=>{
    if (selectedTab&&selectedTab.name!=="feed") {
      navigation.navigate("SEARCH_NAVIGATION")
    }
  },[selectedTab])
  return (
    <Tab.Navigator
      screenListeners={{
        tabPress: () => {
          dispatch(setCreateFeedModalVisibility(false));
        },
      }}
      screenOptions={() => ({
        tabBarStyle: {
          paddingBottom: Platform.OS == 'ios' ? calcHeight(25) : calcHeight(10),
          ...styles.tabBarStyle,
        },
      })}>
      <Tab.Screen
        name={'FEED_NAVIGATION_STACK'}
        component={FeedNavigationStack}
        listeners={{
          tabPress: e => {
            buttonClickedCount === 0
              ? dispatch(setFeedButtonClickCount(1))
              : dispatch(setFeedButtonClickCount(2));
            if (selectedTab.index !== undefined) {
              dispatch(
                setFeedListActiveFilterAction({
                  index: undefined,
                  name: 'feed',
                }),
              );
            }
          },
        }}
        options={({route}) => ({
          headerShown: false,
          unmountOnBlur: true,
          tabBarHideOnKeyboard: true,
          tabBarLabel: () => {
            return <></>;
          },
          tabBarIcon: ({focused}) => {
            return (
              <Icons.HomeIcon
                fill={
                  focused && !createFeedModalVisibility
                    ? primaryBlue
                    : primaryBlack
                }
              />
            );
          },
        })}
      />
      <Tab.Screen
        name={'SEARCH_NAVIGATION'}
        component={SearchNavigationStack}
        options={({route}) => ({
          headerShown: false,
          unmountOnBlur: true,
          tabBarHideOnKeyboard: true,
          tabBarLabel: () => {
            return <></>;
          },
          tabBarIcon: ({focused}) => {
            return (
              <Icons.SearchTab
                fill={
                  focused && !createFeedModalVisibility
                    ? primaryBlue
                    : primaryBlack
                }
              />
            );
          },
        })}
      />
      <Tab.Screen
        name={'CREATED_FEED_NAVIGATION'}
        component={CreateFeedScreen}
        listeners={{
          tabPress: e => {
            e.preventDefault();
            if (!user) {
              goToHome();
            } else {
              navigation.navigate('CREATED_FEED_NAVIGATION');
              dispatch(
                setCreateFeedModalVisibility(!createFeedModalVisibility),
              );
            }
          },
        }}
        options={({route}) => ({
          headerShown: false,
          unmountOnBlur: true,
          tabBarHideOnKeyboard: true,
          tabBarLabel: () => {
            return <></>;
          },
          tabBarIcon: ({focused}) => {
            return (
              <Icons.PlusTab
                fill={createFeedModalVisibility ? primaryBlue : primaryBlack}
              />
            );
          },
        })}
      />
      <Tab.Screen
        name={'CHAT_NAVIGATION_STACK'}
        component={ChatNavigationStack}
        listeners={{
          tabPress: e => {
            if (!user) {
              e.preventDefault();
              goToHome();
            } else {
              dispatch(setAssistantActive(false));
            }
          },
        }}
        options={({route}) => ({
          headerShown: false,
          unmountOnBlur: true,
          tabBarHideOnKeyboard: true,
          tabBarLabel: () => {
            return <></>;
          },
          tabBarIcon: ({focused}) => {
            return (
              <>
                {unreadCount > 0 && (
                  <View style={styles.unreadCount}>
                    <Text
                      style={
                        unreadCount < 99 ? styles.count : styles.moreCount
                      }>
                      {unreadCount}
                    </Text>
                  </View>
                )}
                <Icons.MessagesTab
                  fill={
                    focused && !createFeedModalVisibility
                      ? primaryBlue
                      : primaryBlack
                  }
                />
              </>
            );
          },
        })}
      />
      <Tab.Screen
        name={'PROFILE_NAVIGATION_STACK'}
        component={ProfileNavigationStack}
        listeners={{
          tabPress: e => {
            if (!user) {
              e.preventDefault();
              goToHome();
            }
          },
        }}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({focused}) => {
            return (
              <Icons.ProfileTab
                fill={
                  focused && !createFeedModalVisibility
                    ? primaryBlue
                    : primaryBlack
                }
              />
            );
          },
          tabBarLabel: () => {
            return <></>;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
