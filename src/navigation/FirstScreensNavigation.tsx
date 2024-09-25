import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/Dashboard/Dashboard';

export type NavigationParamList = {
  DASHBOARD_SCREEN: undefined;
};

const Stack = createStackNavigator<NavigationParamList>();

const FirstScreensNavigation: React.FunctionComponent = () => {
  return (
    <Stack.Navigator initialRouteName="DASHBOARD_SCREEN">
      <Stack.Screen
        name="DASHBOARD_SCREEN"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default FirstScreensNavigation;
