import {useState, useCallback} from 'react';
import { ActivityInfoCardData } from '../../../../components/userActivityInfoCardList/UserActivityInfoCardList';
import { primaryBlue } from '../../../../assets/styles/colors.styles';
import { BarChartData } from '../../../../components/barChart/BarChart';

export default navigation => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxValue,setMaxValue]=useState<string>('min')
  const days = [
    {
      date: '14 June',
      workout: {
        amount: 30,
        currency: 'min',
      },
      walk: {
        amount: 45,
        currency: 'min',
      },
      running: {
        amount: 55,
        currency: 'min',
      },
    },
    {
      date: '15 June',
      workout: {
        amount: 45,
        currency: 'min',
      },
      walk: {
        amount: 35,
        currency: 'min',
      },
      running: {
        amount: 60,
        currency: 'min',
      },
    },
    {
      date: '16 June',
      workout: {
        amount: 55,
        currency: 'min',
      },
      walk: {
        amount: 90,
        currency: 'min',
      },
      running: {
        amount: 100,
        currency: 'min',
      },
    },
    {
      date: '17 June',
      workout: {
        amount: 95,
        currency: 'min',
      },
      walk: {
        amount: 45,
        currency: 'min',
      },
      running: {
        amount: 60,
        currency: 'min',
      },
    },
    {
      date: '18 June',
      workout: {
        amount: 80,
        currency: 'min',
      },
      walk: {
        amount: 65,
        currency: 'min',
      },
      running: {
        amount: 35,
        currency: 'min',
      },
    },
    {
      date: '19 June',
      workout: {
        amount: 75,
        currency: 'min',
      },
      walk: {
        amount: 85,
        currency: 'min',
      },
      running: {
        amount: 120,
        currency: 'min',
      },
    },
  ];
  const categories: Array<string> = ['All', 'Workout', 'Walk', 'Running'];

  const onCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category)
  }, []);
  const sumOfAll = useCallback(item => {
    let resulte = 0;
    for (const key in item) {
      resulte += item[key].amount??0;
    }    
    return resulte;
  }, []);
  const leftIconPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const createChartInfoObject=useCallback(( selectedCategory:string)=>{
  const max = 90;
  let barChartData:Array<BarChartData> =[]
  let activityDateCardsInfo:Array<ActivityInfoCardData> =[]
  days.forEach((day)=>{
  const barChartItem:BarChartData= {
    barColor:'red',
    date:day.date,
    percent:1,
    title:''
  }
    let maxValue = "";
  switch (selectedCategory) {
    case 'All':
      maxValue=`${max} min`
      barChartItem.barColor=primaryBlue,
      barChartItem.percent=(sumOfAll(day)/(max*3)-0.1)*100,
      barChartItem.title=`${sumOfAll(day)} min`
      break;
    case 'Workout':
      maxValue=`${max} ${day.workout.currency}`
      barChartItem.barColor=primaryBlue,
      barChartItem.percent=(day.workout.amount/(max)-0.1)*100,
      barChartItem.title=`${day.workout.amount} ${day.workout.currency}` 
      break;
    case 'Walk':
      maxValue=`${max} ${day.walk.currency}`
      barChartItem.barColor=primaryBlue,
      barChartItem.percent=(day.walk.amount/(max)-0.1)*100,
      barChartItem.title=`${day.walk.amount} ${day.walk.currency}`
      break;
    case 'Running':
      maxValue=`${max} ${day.running.currency}`
      barChartItem.barColor=primaryBlue,
      barChartItem.percent=(day.running.amount/(max)-0.1)*100,
      barChartItem.title=`${day.running.amount} ${day.running.currency}`
      break;
    default:
      break;
  }
  setMaxValue(maxValue)
  barChartData.push(barChartItem)
  activityDateCardsInfo.push({
    date:day.date,
    value:barChartItem.title
  })
})
  return {barChartData,activityDateCardsInfo}
  },[days])
  return {
    leftIconPress,
    categories,
    setSelectedCategory,
    selectedCategory,
    onCategorySelect,
    maxValue,
    setMaxValue,
    createChartInfoObject
  };
};
