import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import LoginScreen from '../screens/AuthStack/login/Login';
import ForgetPassword from '../screens/AuthStack/forgetPassword/ForgetPassword';
import RegistrationScreen from '../screens/AuthStack/registration/Registration';
import SuccessScreen from '../screens/AuthStack/successScreen/SuccessScreen';
import SelectRole from '../screens/AuthStack/selectRole/SelectRole';
import AssignInformationScreen from '../screens/AuthStack/assignInformation/AssignInformation';
import ConfirmAccountScreen from '../screens/AuthStack/confirmAccount/ConfirmAccount';
import ResetPassword from '../screens/AuthStack/resetPassword/ResetPassword';
import { useSelector } from 'react-redux';
import { assignCoachInfoSelector, emailSelector, tokenSelector } from '../store/selectors/registration-selector';
import AssignCoachInformation from '../screens/AuthStack/assignCoachInformation/assignCoachInformation';

export type NavigationParamList = {
  LOGIN: undefined;
  REGISTER: undefined;
  FORGOT_PASSWORD: undefined;
  SUCCESS_SCREEN: {
    email: string | undefined,
    type?: string | undefined
  },
  SELECT_ROLE: undefined;
  ASSIGN_INFORMATION: {
    response: any
  };
  CONFIRM_ACCOUNT: {
    response: any
  },
  RESET_PASSWORD: undefined,
  ASSIGN_COACH_INFORMATION: undefined
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

const AuthNavigation: React.FunctionComponent = () => {
  const token = useSelector(tokenSelector);
  const email = useSelector(emailSelector);
  const assignCoachInfo = useSelector(assignCoachInfoSelector);

  return (
    <Stack.Navigator initialRouteName={assignCoachInfo ? 'ASSIGN_COACH_INFORMATION' : email ? "REGISTER" : token ? "RESET_PASSWORD" : "LOGIN"}>
      <Stack.Group screenOptions={verticalAnimation}>
        <Stack.Screen
          name="LOGIN"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ASSIGN_COACH_INFORMATION"
          component={AssignCoachInformation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FORGOT_PASSWORD"
          component={ForgetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="REGISTER"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SUCCESS_SCREEN"
          component={SuccessScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SELECT_ROLE"
          component={SelectRole}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ASSIGN_INFORMATION"
          component={AssignInformationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CONFIRM_ACCOUNT"
          component={ConfirmAccountScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RESET_PASSWORD"
          component={ResetPassword}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
export default AuthNavigation;
