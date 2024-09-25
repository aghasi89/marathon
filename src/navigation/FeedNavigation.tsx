import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserProfileScreen from '../screens/ProfileStack/UserProfile/UserProfile';
import DrawerNavigation from './DrawerNavigation';
import EditProfileScreen from '../screens/ProfileStack/EditProfile/EditProfile';
import {useDispatch} from 'react-redux';
import {setFeedButtonClickCount} from '../store/actions/administrative-action';
import FollowersFollowings from '../screens/ProfileStack/FollowingsFollowers/FollowingsFollowers';
import ChannelList from '../screens/ChatStack/Chat/ChannelList/ChannelList';
import ChatNavigationStack from './ChatNavigation';
import TabNavigation from './TabNavigation';
import AddMembers from '../screens/ChatStack/Chat/AddMembers/AddMembers';
import GroupDetail from '../screens/ChatStack/Chat/GroupDetail/GroupDetail';
import EditGroupChat from '../screens/ChatStack/Chat/EditGroupChat/EditGroupChat';
import NewMessage from '../screens/ChatStack/Chat/NewMessage/newMessage';
import AboutFeed from '../screens/FeedStack/Feed/AboutFeed/AboutFeed';
import { IFeedTypes } from '../types/types';

export type NavigationParamList = {
  DRAWER_FEED: undefined;
  USER_PROFILE: undefined;
  EDIT_PROFILE: undefined;
  FOLLOWERS_FOLLOWINGS: {
    activeTab: 'followers' | 'followings';
    userId: number;
  };
  CHANNELLIST: undefined;
  ADDMEMBERS: {
    isNewCreating?: true;
    isReadOnly?: true;
    isGroupChat?: true;
    isGroupFromPack?: boolean;
    feedId?: number;
    type?: IFeedTypes;
    isGroup?: true;
    isChannelFromPack?: boolean;
  };
  GROUPDETAIL: {
    isNewCreating?: true;
    isReadOnly?: true;
    isGroupChat?: true;
    isGroupFromPack?: boolean;
    feedId?: number;
    type?: IFeedTypes;
    isGroup?: true;
    isChannelFromPack?: boolean;
    selectedIds: number[]
  };
  EDITGROUPCHAT: undefined;
  NEWMESSAGE: undefined;
  ABOUT_FEED: {
    id?: number;
    type?: IFeedTypes;
    action?: string;
  };
};

const Stack = createStackNavigator<NavigationParamList>();

const FeedNavigationStack: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setFeedButtonClickCount(0));
    };
  }, []);

  return (
    <Stack.Navigator initialRouteName="DRAWER_FEED">
      <Stack.Screen
        name="DRAWER_FEED"
        component={DrawerNavigation}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="CHANNELLIST"
        component={ChatNavigationStack}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />
            <Stack.Screen
        name="ADDMEMBERS"
        component={AddMembers}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GROUPDETAIL"
        component={GroupDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EDITGROUPCHAT"
        component={EditGroupChat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NEWMESSAGE"
        component={NewMessage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ABOUT_FEED"
        component={AboutFeed}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="USER_PROFILE"
        component={UserProfileScreen}
        options={{headerShown: false, animationEnabled: false}}
      />
      <Stack.Screen
        name="EDIT_PROFILE"
        component={EditProfileScreen}
        options={{headerShown: false, animationEnabled: false}}
      />
      <Stack.Screen
        name="FOLLOWERS_FOLLOWINGS"
        children={() => {
          return <FollowersFollowings screenType="UserProfile" />;
        }}
        options={{headerShown: false, animationEnabled: false}}
      />
    </Stack.Navigator>
  );
};

export default FeedNavigationStack;
