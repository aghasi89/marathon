import React, {useReducer} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Marathons from './Marathons';
import Nutrition from './Nutrition/index';
import Programs from './Programs/index';
import Users from './Users/index';
import Payments from './Payments/index';
import Workouts from './Workouts/index';
import SystemDisagn from './SystemDisagn/SystemDisagn';
import Menu from './Menu/Menu';
import SystemDisagn2 from './SystemDisagn2/SystemDisagn2';
import ProgrameFilter from './Filter/ProgramsFilter/FilterPrograms';
import FoodDetail from './Nutrition/Food/FoodDetail/FoodDetail';
import CreateFood from './Nutrition/Food/CreateFood/CreateFood';
import MealDetail from './Nutrition/Meal/MealDetail/MealDetail';
import RecipeDetail from './Nutrition/Recipe/RecipeDetail/RecipeDetail';
import CreateRecipe from './Nutrition/Recipe/CreateRecipe/CreateRecipe';
import DayPlanDetail from './Nutrition/DayPlan/DayPlanDetail/DayPlanDetail';
import ImportFood from './Nutrition/Food/ImportFood/ImportFood';
import CreateMeal from './Nutrition/Meal/CreateMeal/CreateMeal';
import CreateDayPlan from './Nutrition/DayPlan/CreateDayPlan/CreateDayPlan';
import CreateProgram from './Programs/CreateProgram/CreateProgram';
import ImportFoodAndRecipe from './Nutrition/Meal/ImportFoodAndRecipe/ImportFoodAndRecipe';
import ImportRecipeFoodMeal from './Nutrition/DayPlan/ImportRecipeFoodMeal/ImportRecipeFoodMeal';
import Workout from './Workouts/Workouts/Workout';
import WorkoutDetail from './Workouts/Workouts/WorkoutDetail/WorkoutDetail';
import ProgramTags from './Programs/ImportProgramTags/ProgramTags';
import ProgramDetail from './Programs/ProgramDetail/ProgramDetail';
import ExerciseDetail from './Workouts/Exercises/ExerciseDetail/ExerciseDetail';
import FilterNutrition from './Filter/FilterNutration/FilterNutrition';
import FilterWorkout from './Filter/FilterWorkout/FilterWorkout';
import CreateExercise from './Workouts/Exercises/CreateExercise/CreateExercise';
import CreateWorkout from './Workouts/Workouts/CreateWorkout/CreateWorkout';
import ImportExercise from './Workouts/Workouts/ImportExercise/ImportExercise';
import WorkoutVideo from './Workouts/Workouts/WorkoutDetail/WorkoutVideo/WorkoutVideo';
import ImportExerciseDetail from './Workouts/Workouts/ImportExercise/ImportExerciseDetail/ImportExerciseDetail';
import ImportEquipement from './Workouts/Workouts/ImportEquipementMuscleTag/ImportEquipement';
import ImportMuscles from './Workouts/Workouts/ImportEquipementMuscleTag/ImportMuscles';
import ImportTags from './Workouts/Workouts/ImportEquipementMuscleTag/ImportTags';
import EditVideo from './Workouts/Exercises/UploadVideos/EditVideo/EditVideo';
import YouTubeVideo from './Workouts/Exercises/UploadVideos/YouTubeVideo/YouTubeVideo';
import ImportNutrition from './Programs/ImportNutrition/ImportNutrition';
import ImportWorkouts from './Programs/ImportWorkouts/ImportWorkouts';
import CreateNutritions from './Programs/CreateNutritions/CreateNutritions';
import Daily from './Programs/CreateProgramDetail/Daily';
import CreateWorkouts from './Programs/CreateWorkouts/CreateWorkouts';
import FilterMarathons from './Filter/FilterMarathons/FilterMarathons';
import CreateGroupMarathon from './Marathons/Group/CreateGroupMarathon/CreateGroupMarathon';
import marathonsUseReducer from './Marathons/Group/CreateGroupMarathon/CreateGroupMarathon-reducer';
import SelectLanguage from './Marathons/Group/CreateGroupMarathonDetail/SelectLanguage/SelectLanguage';
import MarathonCategories from './Marathons/Group/CreateGroupMarathonDetail/ImportCategories/MarathonCategories';
import CreateFiles from './Programs/CreateFiles/CreateFiles';
import CreateNotes from './Programs/CreateNotes/CreateNotes';
import ImportActivities from './Programs/ImportWorkouts/ImportActivity';
import ImportActivityDetail from './Programs/ImportWorkouts/ImportActivityDetail';
import MarathonDetail from './Marathons/MarathonDetail/MarathonDetail';
import Invite from './Marathons/MarathonDetail/Invite';
import Settings from './Settings';
import Subscriptions from './Settings/Subscriptions/Subscriptions';
import Specialities from './Settings/Specialities/Specialities';
import {ITag} from '../../types/types';
import {StateContext, StateContextType} from './contexts';
import MarathonTags from './Marathons/Group/CreateGroupMarathonDetail/ImportTags/MarathonTags';

const Stack = createNativeStackNavigator();

export type NavigationParamList = {
  Menu: undefined;
  ImportFood: undefined;
  SystemDisagn: undefined;
  SystemDisagn2: undefined;
  Marathons: undefined;
  Nutrition: undefined;
  FoodDetail: undefined;
  MealDetail: undefined;
  RecipeDetail: undefined;
  CreateFood: undefined;
  CreateRecipe: undefined;
  CreateMeal: undefined;
  CreateDayPlan: undefined;
  CreateProgram: undefined;
  CreateGroupMarathon: undefined;
  programeFilter: undefined;
  FilterNutrition: undefined;
  FilterWorkout: undefined;
  FilterMarathons: undefined;
  Programs: undefined;
  Users: undefined;
  Payments: undefined;
  Workouts: undefined;
  DayPlanDetail: undefined;
  Workout: undefined;
  ImportFoodAndRecipe: undefined;
  ImportRecipeFoodMeal: undefined;
  WorkoutDetail: undefined;
  ProgramTags: undefined;
  ProgramDetail: undefined;
  WorkoutVideo: undefined;
  ExerciseDetail: undefined;
  CreateExercise: undefined;
  CreateWorkout: undefined;
  ImportExercise: undefined;
  ImportExerciseDetail: undefined;
  ImportEquipement: undefined;
  ImportMuscles: undefined;
  ImportTags: undefined;
  SelectLanguage: undefined;
  EditVideo: undefined;
  YouTubeVideo: undefined;
  ImportNutrition: undefined;
  ImportWorkouts: undefined;
  CreateNutritions: undefined;
  Daily: undefined;
  CreateWorkouts: undefined;
  MarathonCategories: StateContextType | undefined;
  MarathonDetail: undefined;
  Invite: undefined;
  Settings: undefined;
  Subscriptions: undefined;
  Specialities: undefined;
};

const HomeNav: React.FunctionComponent = () => {
  const {state, dispatchState} = marathonsUseReducer();
  return (
    <StateContext.Provider value={{state, dispatchState}}>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName="Menu"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="ImportFood" component={ImportFood} />
          <Stack.Screen name="SystemDisagn" component={SystemDisagn} />
          <Stack.Screen name="SystemDisagn2" component={SystemDisagn2} />
          <Stack.Screen name="Marathons" component={Marathons} />
          <Stack.Screen name="Nutrition" component={Nutrition} />
          <Stack.Screen name="FoodDetail" component={FoodDetail} />
          <Stack.Screen name="MealDetail" component={MealDetail} />
          <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
          <Stack.Screen name="CreateFood" component={CreateFood} />
          <Stack.Screen name="CreateRecipe" component={CreateRecipe} />
          <Stack.Screen name="CreateMeal" component={CreateMeal} />
          <Stack.Screen name="CreateDayPlan" component={CreateDayPlan} />
          <Stack.Screen name="CreateProgram" component={CreateProgram} />
          <Stack.Screen
            name="CreateGroupMarathon"
            component={CreateGroupMarathon}
          />
          <Stack.Screen name="programeFilter" component={ProgrameFilter} />
          <Stack.Screen name="FilterNutrition" component={FilterNutrition} />
          <Stack.Screen name="FilterWorkout" component={FilterWorkout} />
          <Stack.Screen name="FilterMarathons" component={FilterMarathons} />
          <Stack.Screen name="Programs" component={Programs} />
          <Stack.Screen name="Users" component={Users} />
          <Stack.Screen name="Payments" component={Payments} />
          <Stack.Screen name="Workouts" component={Workouts} />
          <Stack.Screen name="DayPlanDetail" component={DayPlanDetail} />
          <Stack.Screen name="Workout" component={Workout} />
          <Stack.Screen
            name="ImportFoodAndRecipe"
            component={ImportFoodAndRecipe}
          />
          <Stack.Screen
            name="ImportRecipeFoodMeal"
            component={ImportRecipeFoodMeal}
          />
          <Stack.Screen name="WorkoutDetail" component={WorkoutDetail} />
          <Stack.Screen name="ProgramTags" component={ProgramTags} />
          <Stack.Screen name="ProgramDetail" component={ProgramDetail} />
          <Stack.Screen name="WorkoutVideo" component={WorkoutVideo} />
          <Stack.Screen name="ExerciseDetail" component={ExerciseDetail} />
          <Stack.Screen name="CreateExercise" component={CreateExercise} />
          <Stack.Screen name="CreateWorkout" component={CreateWorkout} />
          <Stack.Screen name="ImportExercise" component={ImportExercise} />
          <Stack.Screen
            name="ImportExerciseDetail"
            component={ImportExerciseDetail}
          />
          <Stack.Screen name="ImportEquipement" component={ImportEquipement} />
          <Stack.Screen name="ImportMuscles" component={ImportMuscles} />
          <Stack.Screen name="ImportTags" component={ImportTags} />
          <Stack.Screen name="SelectLanguage" component={SelectLanguage} />
          <Stack.Screen name="EditVideo" component={EditVideo} />
          <Stack.Screen name="YouTubeVideo" component={YouTubeVideo} />
          <Stack.Screen name="ImportNutrition" component={ImportNutrition} />
          <Stack.Screen name="ImportWorkouts" component={ImportWorkouts} />
          <Stack.Screen name="Daily" component={Daily} />
          <Stack.Screen name="CreateNutritions" component={CreateNutritions} />
          <Stack.Screen name="CreateWorkouts" component={CreateWorkouts} />
          <Stack.Screen
            name="MarathonCategories"
            component={MarathonCategories}
          />
          <Stack.Screen name="MarathonTags" component={MarathonTags} />
          <Stack.Screen name="CreateFiles" component={CreateFiles} />
          <Stack.Screen name="CreateNotes" component={CreateNotes} />
          <Stack.Screen name="ImportActivity" component={ImportActivities} />
          <Stack.Screen
            name="ImportActivityDetail"
            component={ImportActivityDetail}
          />
          <Stack.Screen name="MarathonDetail" component={MarathonDetail} />
          <Stack.Screen name="Invite" component={Invite} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Specialities" component={Specialities} />
          <Stack.Screen name="Subscriptions" component={Subscriptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </StateContext.Provider>
  );
};
export default HomeNav;
