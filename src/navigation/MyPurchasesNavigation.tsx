import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPurchasesScreen from '../screens/MyPurchasesSatck/MyPurchases/MyPurchases';

export type NavigationParamList = {
    MY_PURCHASES: undefined
};

const Stack = createStackNavigator<NavigationParamList>();

const MyPurchasesNavigationStack: React.FunctionComponent = () => {
  return (
    <Stack.Navigator initialRouteName="MY_PURCHASES">
      <Stack.Screen
        name="MY_PURCHASES"
        component={MyPurchasesScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MyPurchasesNavigationStack;
