import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Exercise from '../screens/ExercisesStack/Exercises/Exercise';
import ExerciseDetailPage from '../screens/ExercisesStack/ExerciseDetailPage/ExerciseDetailPage';

export type NavigationParamList = {
  EXERCISE: undefined;
  EXERCISE_DETAIL_PAGE: {
    id: number
  }
};

const Stack = createStackNavigator<NavigationParamList>();

const ExerciseNavigationStack: React.FunctionComponent = () => {
  return (
    <Stack.Navigator initialRouteName="EXERCISE">
      <Stack.Screen
        name="EXERCISE"
        component={Exercise}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="EXERCISE_DETAIL_PAGE"
        component={ExerciseDetailPage}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ExerciseNavigationStack;
