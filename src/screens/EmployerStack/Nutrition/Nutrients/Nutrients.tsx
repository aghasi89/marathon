import React, { useMemo } from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MainHeader from '../../../../components/headers/mainHeader/MainHeader';
import Icons from '../../../../assets/icons/svg/index';
import {green, primaryBlack, primaryWhite} from '../../../../assets/styles/colors.styles'
import ButtonsTabBar from '../../../../components/buttonsTabBar/ButtonsTabBar';
import BarChartComponent from '../../../../components/barChart/BarChart';
import NutrientsInfoCardList from '../../../../components/nutrientsInfoCardList/NutrientsInfoCardList';
import {EmployerNavigationParamList} from '../..';
import hook from './Nutrients-hook';
import styles from './Nutrients.style';

type Props = NativeStackScreenProps<EmployerNavigationParamList, 'Nutrients'>;

const Nutrients: React.FC = () => {
  const navigation = useNavigation<Props['navigation']>();
  const {
    leftIconPress, 
    days, 
    categories, 
    setSelectedCategory,
    selectedCategory,
    maxValue,
    createChartInfoObject
  } = hook(navigation);
   
    const params = useMemo(()=>{
     return createChartInfoObject(selectedCategory)
    },[selectedCategory])
    
  return (
    <View style={styles.container}>
      <MainHeader
        leftIconPress={leftIconPress}
        leftIcon={true}
        title={'Nutrients'}
        leftComponent={
          <Icons.EllipsisIcon fill={primaryBlack} onPress={() => {}} />
        }
      />
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

export default Nutrients;
