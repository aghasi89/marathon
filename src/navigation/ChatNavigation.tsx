import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChannelList from '../screens/ChatStack/Chat/ChannelList/ChannelList';
import AddMembers from '../screens/ChatStack/Chat/AddMembers/AddMembers';
import EditGroupChat from '../screens/ChatStack/Chat/EditGroupChat/EditGroupChat';
import NewMessage from '../screens/ChatStack/Chat/NewMessage/newMessage';
import UserProfileScreen from '../screens/ProfileStack/UserProfile/UserProfile';
import AboutFeed from '../screens/FeedStack/Feed/AboutFeed/AboutFeed';
import {IFeedTypes} from '../types/types';
import GroupDetail from '../screens/ChatStack/Chat/GroupDetail/GroupDetail';

export type NavigationParamList = {
  CHANNELLIST: undefined;
  USER_PROFILE: undefined;
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
  CHANNELFROMPACK: {
    newgroup?: true;
    newchannel?: true;
    isNewCreating?: true;
  };
  ABOUT_FEED: {
    id?: number;
    type?: IFeedTypes;
    action?: string;
  };
};

const Stack = createStackNavigator<NavigationParamList>();

const ChatNavigationStack: React.FunctionComponent = () => {
  return (
    <Stack.Navigator initialRouteName="CHANNELLIST">
      <Stack.Screen
        name="CHANNELLIST"
        component={ChannelList}
        options={{headerShown: false}}
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
        name="USER_PROFILE"
        component={UserProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ABOUT_FEED"
        component={AboutFeed}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ChatNavigationStack;
