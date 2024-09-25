import React ,{useMemo}from 'react';
import {ScrollView, Text, View,TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MainHeader from '../../../../components/headers/mainHeader/MainHeader';
import Icons from '../../../../assets/icons/svg/index';
import {primaryBlack} from '../../../../assets/styles/colors.styles';
import UserActivityInfoCardList from '../../../../components/userActivityInfoCardList/UserActivityInfoCardList';
import BarChartComponent from '../../../../components/barChart/BarChart';
import {EmployerNavigationParamList} from '../..';
import hook from './ActivityCharts-hook';
import styles from './ActivityCharts.style';

type Props = NativeStackScreenProps<EmployerNavigationParamList, 'ActivityCharts'>;

const ActivityCharts: React.FC = () => {
  const navigation = useNavigation<Props['navigation']>();
  const {
    leftIconPress, 
    categories, 
    onCategorySelect,
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
        title={'Activity'}
        leftComponent={
          <Icons.EllipsisIcon fill={primaryBlack} onPress={() => {}} />
        }
      />
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Goal Intake {maxValue}</Text>
          <Icons.Calendar fill={primaryBlack} onPress={() => {}} />
        </View>
       <BarChartComponent data={params.barChartData}/>
        <ScrollView
          style={styles.categoriesButtonsContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {categories.map((category,index)=>{
           return( 
           <TouchableOpacity key={index} onPress={() => onCategorySelect(category)}>
              <View style={[styles.button,category===selectedCategory&&styles.buttonBackground]}>
                <Text style={category===selectedCategory?styles.buttonText1:styles.buttonText}>{[category]}</Text>
              </View>
            </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
      <UserActivityInfoCardList
      data={params.activityDateCardsInfo}
      cardContainerStyle={styles.infoItemContainer}
      />
    </View>
  );
};

export default ActivityCharts;