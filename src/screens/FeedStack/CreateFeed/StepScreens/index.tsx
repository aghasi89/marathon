import React from 'react';
import {IFeedTypes, IWorkoutType} from '../../../../types/types';
import FifthStepScreen from './StepsMultiScreens/FifthStepScreen/FifthStepScreen';
import FirstStepScreen from './StepsMultiScreens/FirstStepScreen/FirstStepScreen';
import SecondStepScreen from './StepsMultiScreens/SecondStepScreen/SecondStepScreen';
import ThirdStepScreen from './StepsMultiScreens/ThirdStepScreen/ThirdStepScreen';
import FourthScreen from './StepsMultiScreens/FourthScreen/FourthScreen';
import RecipeSecondStep from './RecipeStepScreens/RecipeSecondStep/RecipeSecondStep';
import RecipeThirdStep from './RecipeStepScreens/RecipeThirdStep/RecipeThirdStep';
import RecipeFourthStep from './RecipeStepScreens/RecipeFourthStep/RecipeFourthStep';
import RecipeFifthStep from './RecipeStepScreens/RecipeFifthStep/RecipeFifthStep';
import SingleWorkoutSecondStep from './WorkoutStepScreens/SingleVideoWorkout/SingleWorkoutSecondStep/SingleWorkoutSecondStep';
import SingleWorkoutThirdStep from './WorkoutStepScreens/SingleVideoWorkout/SingleWorkoutThirdStep/SingleWorkoutThirdStep';
import OverViewScreen from './WorkoutStepScreens/OverViewStepScreen/OverViewScreen';
import ManyVideosWorkoutSecondStep from './WorkoutStepScreens/ManyVideosWorkout/ManyVideosWorkoutSecondStep/ManyVideosWorkoutSecondStep';

type Props = {
  stepIndex: number;
  type?: IFeedTypes;
  workoutType?: IWorkoutType;
};
const StepScreens: React.FC<Props> = ({type, stepIndex, workoutType}) => {
  const renderRecipe = () => {
    switch (stepIndex) {
      case 1:
        return <FirstStepScreen />;
      case 2:
        return <RecipeSecondStep />;
      case 3:
        return <RecipeThirdStep />;
      case 4:
        return <RecipeFourthStep />;
      case 5:
        return <RecipeFifthStep />;
      default:
        return null;
    }
  };
  const renderPackage = () => {
    switch (stepIndex) {
      case 1:
        return <FirstStepScreen />;
      case 2:
        return <SecondStepScreen />;
      case 3:
        return <ThirdStepScreen />;
      case 4:
        return <FourthScreen />;
      case 5:
        return <FifthStepScreen />;
      default:
        return null;
    }
  };
  const renderLive = () => {
    switch (stepIndex) {
      case 1:
        return <FirstStepScreen />;
      case 2:
        return <SecondStepScreen />;
      case 3:
        return <ThirdStepScreen />;
      case 4:
        return <FifthStepScreen />;
      default:
        return null;
    }
  };
  const renderWorkout = () => {
    switch (stepIndex) {
      case 1:
        return <FirstStepScreen />;
      case 2:
        return (
          <>
            {workoutType === 'singleVideo' ? <SingleWorkoutThirdStep />  : <ManyVideosWorkoutSecondStep/>}
          </>
        );
      case 3:
        return (
          <>
            {workoutType === 'singleVideo' ? <SingleWorkoutSecondStep />: <SingleWorkoutSecondStep />}
          </>
        );
      case 4:
        return <OverViewScreen/>
      default:
        return null;
    }
  };
  const renderItem = () => {
    switch (type) {
      case 'package':
        return renderPackage();
      case 'live':
        return renderLive();
      case 'article':
        return <FirstStepScreen />;
      case 'recipe':
        return renderRecipe();
      case 'basic':
        return <FirstStepScreen />;
      case 'workout':
        return renderWorkout();
      default:
        return null;
    }
  };
  return renderItem();
};
export default StepScreens;
