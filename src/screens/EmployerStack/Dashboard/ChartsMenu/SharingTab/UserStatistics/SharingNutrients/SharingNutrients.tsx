import React, { useMemo } from 'react';
import {Text, View} from 'react-native';
import Icons from '../../../../../../../assets/icons/svg/index';
import {green, primaryBlack, primaryWhite} from '../../../../../../../assets/styles/colors.styles'
import ButtonsTabBar from '../../../../../../../components/buttonsTabBar/ButtonsTabBar';
import BarChartComponent from '../../../../../../../components/barChart/BarChart';
import NutrientsInfoCardList from '../../../../../../../components/nutrientsInfoCardList/NutrientsInfoCardList';
import hook from './SharingNutrients-hook';
import styles from './SharingNutrients.style';

const Calories: React.FC = () => {
  const {
    categories, 
    setSelectedCategory,
    selectedCategory,
    maxValue,
    createChartInfoObject
  } = hook();
   
    const params = useMemo(()=>{
     return createChartInfoObject(selectedCategory)
    },[selectedCategory])
    
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Goal Intake {maxValue}</Text>
          <Icons.Calendar fill={primaryBlack} onPress={() => {}} />
        </View>
        <BarChartComponent data={params.BarChartInfo}/>
        <ButtonsTabBar 
         data={categories}
         selectedIndex={selectedCategory}
         setSelectedIndex={setSelectedCategory}
         selectedButtonStyle={{
          bgColor:green,
          textColor:primaryWhite
         }}
         containerStyle={styles.categoriesButtonsContainer}
         />
      </View>
        <NutrientsInfoCardList data={params.NutrientsDateCardsInfo} cardItemContanerStyle={styles.infoItemContainer} />
    </View>
  );
};

export default Calories;
