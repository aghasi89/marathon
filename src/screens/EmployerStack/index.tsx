import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Nutrients from './Nutrition/Nutrients/Nutrients';
import Dashboard from './Dashboard/Dashboard';
import Nutrition from './Nutrition/Nutrition';
import ChartsMenu from './Dashboard/ChartsMenu/ChartsMenu';
import CreateShareRequest from './Dashboard/ChartsMenu/SharingTab/CreateShareRequest/CreateShareRequest';
import EditSharing from './Dashboard/ChartsMenu/SharingTab/EditSharing/EditSharing';
import PhotoProgress from './PhotoProgress/PhotoProgress';
import PhotoProgressChart from './PhotoProgress/PhotoProgressChart/PhotoProgressChart';
import SelectedDatePhotos from './PhotoProgress/SelectedDatePhotos/SelectedDatePhotos';
import SelectedDateComments from './PhotoProgress/SelectedDateComments/SelectedDateComments';
import Activity from './Activity/Activity';
import ActivityCharts from './Activity/ActivityCharts/ActivityCharts';
import Measurements from './Measurements/Measurements';
import MeasurementsChart from './Measurements/MeasurementsChart/MeasurementsChart';
import UserStatistics from './Dashboard/ChartsMenu/SharingTab/UserStatistics/UserStatistics';
import Files from './FIles/Files';
import Notes from './Notes/Notes';

export interface ISelectedDatePhotos {
  selectedIndex?: number;
  title?: string;
}
export interface ISelectedDateComments {
  dateIndex?: number;
}
export type EmployerNavigationParamList = {
  Dashboard: undefined;
  Nutrition: undefined;
  Activity: undefined;
  ActivityCharts: undefined;
  Nutrients: undefined;
  ChartsMenu: undefined;
  CreateShareRequest: undefined;
  EditeSharing: undefined;
  PhotoProgress: undefined;
  PhotoProgressChart: undefined;
  SelectedDatePhotos: ISelectedDatePhotos;
  SelectedDateComments: ISelectedDateComments;
  Measurements: undefined;
  MeasurementsChart: undefined;
  UserStatistics: undefined;
  Files: undefined;
  Notes: undefined;
};

const Stack = createNativeStackNavigator();

const EmployerNav: React.FunctionComponent = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Nutrition" component={Nutrition} />
        <Stack.Screen name="Activity" component={Activity} />
        <Stack.Screen name="ActivityCharts" component={ActivityCharts} />
        <Stack.Screen name="Nutrients" component={Nutrients} />
        <Stack.Screen name="ChartsMenu" component={ChartsMenu} />
        <Stack.Screen
          name="CreateShareRequest"
          component={CreateShareRequest}
        />
        <Stack.Screen name="EditSharing" component={EditSharing} />
        <Stack.Screen name="PhotoProgress" component={PhotoProgress} />
        <Stack.Screen
          name="PhotoProgressChart"
          component={PhotoProgressChart}
        />
        <Stack.Screen
          name="SelectedDatePhotos"
          component={SelectedDatePhotos}
        />
        <Stack.Screen
          name="SelectedDateComments"
          component={SelectedDateComments}
        />
        <Stack.Screen name="Measurements" component={Measurements} />
        <Stack.Screen name="MeasurementsChart" component={MeasurementsChart} />
        <Stack.Screen name="UserStatistics" component={UserStatistics} />
        <Stack.Screen name="Files" component={Files} />
        <Stack.Screen name="Notes" component={Notes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default EmployerNav;
