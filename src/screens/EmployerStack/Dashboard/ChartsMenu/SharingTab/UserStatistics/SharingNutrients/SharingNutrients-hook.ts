import {useState, useCallback} from 'react';
import { green, red } from '../../../../../../../assets/styles/colors.styles';
import { NutrientsInfoCardData } from '../../../../../../../components/nutrientsInfoCardList/NutrientsInfoCardList';
import { BarChartData } from '../../../../../../../components/barChart/BarChart';

export default () => {  
  const [selectedCategory,setSelectedCategory]=useState<number>(0)
  const [maxValue,setMaxValue]= useState<string>('kcal')
  const categories:Array<{title:string}>=[{title:'Calories'},{title:'Carbs'},{title:'Protein'},{title:'Fat'}]
  const days = [
    {
      date: '14 June', 
      calories: {amount:2100,currency:'kcal'},
      carbs:{amount:500,currency:'g'},
      protein:{amount:90,currency:'g'} ,
      fat:{amount:30,currency:'g'},
    },
    {
      date: '15 June', 
      calories: {amount:1800,currency:'kcal'},
      carbs:{amount:120,currency:'g'},
      protein:{amount:60,currency:'g'} ,
      fat:{amount:30,currency:'g'},
    },
    {
      date: '16 June', 
      calories: {amount:1100,currency:'kcal'},
      carbs:{amount:200,currency:'g'},
      protein:{amount:55,currency:'g'} ,
      fat:{amount:25,currency:'g'},
    },
    {
      date: '17 June', 
      calories: {amount:1300,currency:'kcal'},
      carbs:{amount:100,currency:'g'},
      protein:{amount:70,currency:'g'} ,
      fat:{amount:20,currency:'g'},
    },
    {
      date: '18 June', 
      calories: {amount:1950,currency:'kcal'},
      carbs:{amount:260,currency:'g'},
      protein:{amount:150,currency:'g'} ,
      fat:{amount:90,currency:'g'},
    },
  ]
  const createChartInfoObject= useCallback((selectedCategory:number)=>{
    const maxCalories = 2100;
    const maxCarbs=250;
    const maxProtein=90;
    const maxFat=90;
    let BarChartInfo:Array<BarChartData> =[]
    let NutrientsDateCardsInfo:Array<NutrientsInfoCardData>=[]
    days.forEach((day)=>{
    const BarChartItem:BarChartData= {
      barColor:'red',
      date:day.date,
      percent:1,
      title:''
    }
    let max = "";
   const NutrientsInfoItem:NutrientsInfoCardData= {
    date:day.date,
    calories:`${day.calories.amount} ${day.calories.currency}`,
    carbs:`${day.carbs.amount} ${day.carbs.currency}`,
    protein:`${day.protein.amount} ${day.protein.currency}`,
    fat:`${day.fat.amount} ${day.fat.currency}`,
   }
    switch (selectedCategory) {
      case 0:
        max = `${maxCalories} ${day.calories.currency}`;
        BarChartItem.barColor = day.calories.amount/maxCalories<1?green:red;
        BarChartItem.percent = (day.calories.amount/maxCalories-0.1)*100,
        BarChartItem.title = `${day.calories.amount} ${day.calories.currency}`
        break;
      case 1:
        max=`${maxCarbs} ${day.carbs.currency}`
        BarChartItem.barColor =day.carbs.amount/maxCarbs<1?green:red,
        BarChartItem.percent =(day.carbs.amount/maxCarbs-0.1)*100,
        BarChartItem.title =`${day.carbs.amount} ${day.carbs.currency}`
        break;
      case 2:
        max=`${maxProtein} ${day.protein.currency}`,
        BarChartItem.barColor=day.protein.amount/maxProtein<1?green:red,
        BarChartItem.percent=((day.protein.amount/maxProtein-0.1)*100),
        BarChartItem.title=`${day.protein.amount} ${day.protein.currency}`
        break;
      case 3:
        max=`${maxFat} ${day.fat.currency}`
        BarChartItem.barColor=day.fat.amount/maxFat<1?green:red,
        BarChartItem.percent=(day.fat.amount/maxFat-0.1)*100,
        BarChartItem.title=`${day.fat.amount} ${day.fat.currency}` 
        break;
      default:
        break;
    }
    BarChartInfo.push(BarChartItem)
    NutrientsDateCardsInfo.push(NutrientsInfoItem)
    setMaxValue(max)
  })    
    return {BarChartInfo,NutrientsDateCardsInfo}
  },[])
  return {
    days,
    categories,
    setSelectedCategory,
    selectedCategory,
    maxValue,
    createChartInfoObject,
  };
};
