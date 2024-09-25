import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import SelectRegionScreen from '../screens/FirstScreensStack/SelectRegion/SelectRegion';

export type NavigationParamList = {
  SELECT_REGION: undefined;
};

const Stack = createStackNavigator<NavigationParamList>();

const verticalAnimation: StackNavigationOptions = {
  gestureDirection: 'vertical',
  cardStyle: { backgroundColor: 'transparent' },
  cardStyleInterpolator: ({
    current,
    layouts,
  }: any): { cardStyle: { transform: { translateY: any }[] } } => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 2],
            }),
          },
        ],
      },
    };
  },
  presentation: 'transparentModal',
};

const FirstNavigation: React.FunctionComponent = () => {

  return (
    <Stack.Navigator initialRouteName={'SELECT_REGION'}>
      <Stack.Group screenOptions={verticalAnimation}>
        <Stack.Screen
          name="SELECT_REGION"
          component={SelectRegionScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
export default FirstNavigation;
