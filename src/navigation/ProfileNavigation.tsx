import React from 'react';
import { useSelector } from 'react-redux';
import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import EditProfileScreen from '../screens/ProfileStack/EditProfile/EditProfile';
// import ClientProfileScreen from '../screens/ProfileStack/ClientProfile/ClientProfile';
import { profileSelector } from '../store/selectors/profile-selector';
import CoachProfileScreen from '../screens/ProfileStack/CoachProfile/CoachProfile';
import FollowersFollowings from '../screens/ProfileStack/FollowingsFollowers/FollowingsFollowers';
import Certificates from '../screens/ProfileStack/Certificates/Certificates';
import AddCertificatesScreen from '../screens/ProfileStack/AddCertificates/AddCertificates';
import EditCertificatesScreen from '../screens/ProfileStack/EditCertificate/EditCertificate';
import { ICertificate } from '../types/types';

export type NavigationParamList = {
  PROFILE: undefined;
  EDIT_PROFILE: undefined;
  FOLLOWERS_FOLLOWINGS: {
    activeTab: 'followers' | 'followings',
    userId: number
  },
  CERTIFICATES: undefined,
  ADDCERTIFICATES: undefined
  EDITCERTIFICATES: {
    certificateInfo: ICertificate,
  }
};

const Stack = createStackNavigator<NavigationParamList>();

const ProfileNavigationStack: React.FunctionComponent = () => {
  const user = useSelector(profileSelector);

  const horizontalAnimation: StackNavigationOptions = {
    gestureDirection: 'horizontal',
    cardStyle: { backgroundColor: 'transparent' },
    cardStyleInterpolator: ({
      current,
      layouts,
    }: any): { cardStyle: { transform: { translateX: any }[] } } => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
    presentation: 'transparentModal',
  };

  return (
    <Stack.Navigator initialRouteName="PROFILE">
      <Stack.Screen
        name="PROFILE"
        component={
          // user?.role_mode == 'client' ? ClientProfileScreen : 
          CoachProfileScreen
        }
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EDIT_PROFILE"
        component={EditProfileScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <Stack.Screen
        name="FOLLOWERS_FOLLOWINGS"
        children={() => { return <FollowersFollowings screenType='MyProfile' /> }}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <Stack.Group screenOptions={horizontalAnimation}>
        <Stack.Screen
          name="CERTIFICATES"
          component={Certificates}
          options={{
            headerShown: false,
            animationEnabled: false,
            gestureEnabled: true // add for IOS swipe to back
          }}
        />
        <Stack.Screen
          name="ADDCERTIFICATES"
          component={AddCertificatesScreen}
          options={{
            headerShown: false,
            animationEnabled: false,
            gestureEnabled: true // add for IOS swipe to back
          }}
        />
        <Stack.Screen
          name="EDITCERTIFICATES"
          component={EditCertificatesScreen}
          options={{
            headerShown: false,
            animationEnabled: false,
            gestureEnabled: true // add for IOS swipe to back
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
export default ProfileNavigationStack;
