import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FinansicalScreen from '../screens/FinansicalStack/PaymentScreen/FinansicalScreen';
import WalletDetailPage from '../screens/FinansicalStack/WalletDetailPage/WalletDetailPage';
import StripeDashboard from '../screens/FinansicalStack/StripeDashboard/StripeDashboard';

export type NavigationParamList = {
  FINANSICAL: undefined;
  WALLET_DETAIL_PAGE: {
    id: number
  },
  STRIPE_DASHBOARD: {
    url: string
  }
};

const Stack = createStackNavigator<NavigationParamList>();

const FinansicalNavigationStack: React.FunctionComponent = () => {
  return (
    <Stack.Navigator initialRouteName="FINANSICAL">
      <Stack.Screen
        name="FINANSICAL"
        component={FinansicalScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WALLET_DETAIL_PAGE"
        component={WalletDetailPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="STRIPE_DASHBOARD"
        component={StripeDashboard}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default FinansicalNavigationStack;
