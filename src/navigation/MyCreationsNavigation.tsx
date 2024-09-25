import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyCreationsScreen from '../screens/MyCreationsStack/MyCreations/MyCreations';

export type NavigationParamList = {
  MY_CREATIONS: undefined
};

const Stack = createStackNavigator<NavigationParamList>();

const MyCreationsNavigationStack: React.FunctionComponent = () => {
  return (
    <Stack.Navigator initialRouteName="MY_CREATIONS">
      <Stack.Screen
        name="MY_CREATIONS"
        component={MyCreationsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MyCreationsNavigationStack;
