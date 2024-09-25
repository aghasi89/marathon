import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import {ProgressCircle} from 'react-native-svg-charts';
import Icons from '../../../assets/icons/svg/index';
import {lightGreen,primaryBlack} from '../../../assets/styles/colors.styles';
import MainHeader from '../../../components/headers/mainHeader/MainHeader';
import ProgramDays from '../../../components/programDays/ProgramDays';
import { EmployerNavigationParamList } from '..';
import AvailableNutrition from './AvailableNutrition';
import CreateNutritionsHook from './Nutrition-hook';
import styles from './Nutrition.style';

type Props = NativeStackScreenProps<EmployerNavigationParamList, 'Nutrition'>;

const Nutrition: React.FC= () => {
  const navigation= useNavigation<Props['navigation']>()
  const {
    days,
    dayIndex,
    leftIconPress,
    isSelected,
    setIsSelected,
    foods
  } = CreateNutritionsHook(navigation);

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
        title={'Nutrition'}
        leftComponentStyle={styles.leftComponentStyle}
        leftComponent={
          <View style={styles.leftCompomemtContainer}>
          <Icons.ChartBlack
            style={styles.iconStyle}
            onPress={()=>{navigation.navigate('Nutrients')}}
          />
             <Icons.EllipsisIcon
            fill={primaryBlack}
            style={styles.iconStyle}
            onPress={()=>{}}
          />
          </View>
        }
      />
      <View>
        <ProgramDays days={days} dayIndex={dayIndex} />
         <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total</Text>
          <View style={styles.totalKcalContainer}>
            <Text style={styles.totalKcal}>900/1800 kcal</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.caloriesContainer}>
            <View style={styles.calories}>
              <Progress
                value={15}
                mesure={' g'}
                title={'Carbs'}
              />
              <Progress
                value={80}
                mesure={' g'}
                title={'Protein'}
              />
              <Progress value={20} mesure={' g'} title={'Fat'} />
            </View>
          </View>
          <View style={styles.foodsContainer}>
            <AvailableNutrition 
              caloreis={0}
              title="Breakfast"
              foods={foods}
              deleteFood={()=>{}}
              caloreisIconPress={()=>{}}
              onCardLeftIconPress={()=>{}}
              navigate={()=>{}}
              isSelected={isSelected}
              onCheck={()=>setIsSelected(!isSelected)}
            />
            <AvailableNutrition 
              caloreis={0}
              title="Lunch"
              foods={[]}
              deleteFood={()=>{}}
              caloreisIconPress={()=>{}}
              onCardLeftIconPress={()=>{}}
              navigate={()=>{}}
              isSelected={isSelected}
              onCheck={()=>setIsSelected(!isSelected)}
            />
            <AvailableNutrition 
              caloreis={0}
              title="Dinner"
              foods={[]}
              deleteFood={()=>{}}
              caloreisIconPress={()=>{}}
              onCardLeftIconPress={()=>{}}
              navigate={()=>{}}
              isSelected={isSelected}
              onCheck={()=>setIsSelected(!isSelected)}
            />
            <AvailableNutrition 
              caloreis={0}
              title="Snacks"
              foods={[]}
              deleteFood={()=>{}}
              caloreisIconPress={()=>{}}
              onCardLeftIconPress={()=>{}}
              navigate={()=>{}}
              isSelected={isSelected}
              onCheck={()=>setIsSelected(!isSelected)}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Nutrition;
