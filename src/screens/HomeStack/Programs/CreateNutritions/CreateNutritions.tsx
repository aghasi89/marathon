import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {ProgressCircle} from 'react-native-svg-charts';
import {calcHeight} from '../../../../assets/dimensions';
import Icons from '../../../../assets/icons/svg/index';
import {
  lightGreen,
  primaryBlack,
} from '../../../../assets/styles/colors.styles';
import EditSheet from '../../../../components/editSheet/EditSheet';
import MainHeader from '../../../../components/headers/mainHeader/MainHeader';
import ProgramDays from '../../../../components/programDays/ProgramDays';
import CreateNutritionsHook from './CreateNutritions-hook';
import SelectedNutritions from './SelectedNutritions';
import styles from './CreateNutritions.style';

type Props = {navigation: any};
const CreateNutritions: React.FC<Props> = ({navigation}) => {
  const {
    state,
    isOpen,
    setIsOpen,
    deleteFood,
    deleteMeal,
    deleteRecipe,
    deleteDayPlan,
    selectedText,
    setSelectedText,
    valueNumber,
    setValueNumber,
    days,
    dayIndex,
    leftIconPress,
    navigateNutrition,
  } = CreateNutritionsHook(navigation);

  const editSheet = [
    {
      title: 'Discard changes',
      onSelect: () => {
        setIsOpen(false);
      },
      Icon: <Icons.Close fill={primaryBlack} />,
    },
    {
      title: 'Save changes',
      onSelect: () => {
        setIsOpen(false);
      },
      Icon: <Icons.CheckIcon fill={primaryBlack} />,
    },
  ];
  const Progress = ({value, mesure, title}) => {
    return (
      <View style={styles.caloryItem}>
        <ProgressCircle
          style={styles.progressStyle}
          progress={parseInt(value) / 100}
          progressColor={lightGreen}
          strokeWidth={4}></ProgressCircle>
        <View style={styles.caloryCount}>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.text}>
            {value}
            {mesure}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <MainHeader
        leftIconPress={leftIconPress}
        leftIcon={true}
        title={'Nutritions'}
        leftComponentStyle={styles.leftComponentStyle}
        leftComponent={
          <Icons.EllipsisIcon
            fill={primaryBlack}
            style={styles.iconStyle}
            onPress={() => setIsOpen(true)}
          />
        }
      />
      <View>
        <ProgramDays days={days} dayIndex={dayIndex} />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total</Text>
          <View style={styles.totalKcalContainer}>
            <Text style={styles.totalKcal}>{state.valueKcal} kcal</Text>
            <Icons.HeightLine />
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.caloriesContainer}>
            <View style={styles.calories}>
              <Progress
                value={state.carbsValue}
                mesure={' gm'}
                title={'Carbs'}
              />
              <Progress
                value={state.proteinValue}
                mesure={' gm'}
                title={'Protein'}
              />
              <Progress value={state.fatValue} mesure={' gm'} title={'Fat'} />
            </View>
          </View>
          <View>
            <SelectedNutritions
              navigate={() => navigateNutrition(0)}
              foods={state.brackfast.foodList}
              meals={state.brackfast.mealList}
              recipes={state.brackfast.recipeList}
              dayPlans={state.brackfast.dayPlanList}
              deleteFood={value => deleteFood(value, 0)}
              deleteRecipe={value => deleteRecipe(value, 0)}
              deleteMeal={value => deleteMeal(value, 0)}
              deleteDayPlan={value => deleteDayPlan(value, 0)}
              selectedText={selectedText}
              valueNumber={valueNumber}
              setSelectedText={setSelectedText}
              setValueNumber={setValueNumber}
              caloreis={0}
              title="BreakFast"
            />
            <SelectedNutritions
              navigate={() => navigateNutrition(1)}
              foods={state.lunch.foodList}
              meals={state.lunch.mealList}
              recipes={state.lunch.recipeList}
              dayPlans={state.lunch.dayPlanList}
              deleteFood={value => deleteFood(value, 1)}
              deleteRecipe={value => deleteRecipe(value, 1)}
              deleteMeal={value => deleteMeal(value, 1)}
              deleteDayPlan={value => deleteDayPlan(value, 1)}
              selectedText={selectedText}
              valueNumber={valueNumber}
              setSelectedText={setSelectedText}
              setValueNumber={setValueNumber}
              caloreis={0}
              title="Lunch"
            />
            <SelectedNutritions
              navigate={() => navigateNutrition(2)}
              foods={state.dinner.foodList}
              meals={state.dinner.mealList}
              recipes={state.dinner.recipeList}
              dayPlans={state.dinner.dayPlanList}
              deleteFood={value => deleteFood(value, 2)}
              deleteRecipe={value => deleteRecipe(value, 2)}
              deleteMeal={value => deleteMeal(value, 2)}
              deleteDayPlan={value => deleteDayPlan(value, 2)}
              selectedText={selectedText}
              valueNumber={valueNumber}
              setSelectedText={setSelectedText}
              setValueNumber={setValueNumber}
              caloreis={0}
              title="Dinner"
            />
            <SelectedNutritions
              navigate={() => navigateNutrition(3)}
              foods={state.snacks.foodList}
              meals={state.snacks.mealList}
              recipes={state.snacks.recipeList}
              dayPlans={state.snacks.dayPlanList}
              deleteFood={value => deleteFood(value, 3)}
              deleteRecipe={value => deleteRecipe(value, 3)}
              deleteMeal={value => deleteMeal(value, 3)}
              deleteDayPlan={value => deleteDayPlan(value, 3)}
              selectedText={selectedText}
              valueNumber={valueNumber}
              setSelectedText={setSelectedText}
              setValueNumber={setValueNumber}
              caloreis={0}
              title="Snacks"
            />
          </View>
        </ScrollView>
      </View>
      <EditSheet
        isVisible={isOpen}
        height={calcHeight(220)}
        onClose={() => setIsOpen(false)}
        list={editSheet}
      />
    </View>
  );
};

export default CreateNutritions;
