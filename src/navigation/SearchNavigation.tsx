import React from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import SearchScreen from '../screens/SearchStack/SearchScreen';
import FiltersScreen from '../screens/SearchStack/FiltersScreen/FiltersScreen';
import {FeedListFilterTypes} from '../types/types';
import SelectFiltersScreen from '../screens/SearchStack/SelectFiltersScreen/SelectFiltersScreen';
import {IFilterFacetsKeysType} from '../types/feedFilterTypes';
import UserProfileScreen from '../screens/ProfileStack/UserProfile/UserProfile';
import FollowersFollowings from '../screens/ProfileStack/FollowingsFollowers/FollowingsFollowers';


export type NavigationParamList = {
  SEARCH: undefined;
  FILTERS_SCREEN: {
    type: FeedListFilterTypes;
  };
  SELECT_FILTERS_SCREEN: {
    type: IFilterFacetsKeysType;
  };
  USER_PROFILE: undefined;
  FOLLOWERS_FOLLOWINGS: {
    activeTab: 'followers' | 'followings',
    userId: number,
  }
};

const SearchStack = createStackNavigator<NavigationParamList>();

const verticalAnimation: StackNavigationOptions = {
  gestureDirection: 'vertical',
  cardStyle: {backgroundColor: 'transparent'},
  cardStyleInterpolator: ({
    current,
    layouts,
  }: any): {cardStyle: {transform: {translateY: any}[]}} => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
        ],
      },
    };
  },
  presentation: 'transparentModal',
};

const SearchNavigationStack: React.FunctionComponent = () => {
  return (
    <SearchStack.Navigator initialRouteName="SEARCH">
      <SearchStack.Screen
        name="SEARCH"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <SearchStack.Screen
        name="FOLLOWERS_FOLLOWINGS"
        children={() => {
          return <FollowersFollowings screenType="UserProfile" />;
        }}
        options={{headerShown: false, animationEnabled: false}}
      />
      <SearchStack.Group screenOptions={verticalAnimation}>
        <SearchStack.Screen
          name="FILTERS_SCREEN"
          component={FiltersScreen}
          options={{
            headerShown: false,
            gestureEnabled: true,
          }}
        />
        <SearchStack.Screen
          name="SELECT_FILTERS_SCREEN"
          component={SelectFiltersScreen}
          options={{
            headerShown: false,
            gestureEnabled: true,
          }}
        />
        <SearchStack.Screen
          name="USER_PROFILE"
          component={UserProfileScreen}
          options={{headerShown: false, animationEnabled: false}}
        />
      </SearchStack.Group>
    </SearchStack.Navigator>
  );
};
export default SearchNavigationStack;
