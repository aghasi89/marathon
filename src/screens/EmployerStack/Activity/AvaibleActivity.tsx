import React from 'react'
import { Text, View } from 'react-native'
import MealPlan from '../../../components/mealPlan/MealPlan'
import WorkoutCard from '../../../components/workoutCard/WorkoutCard'
import styles from './Activity.style'

interface IDayPlans {
    imageUrl: string;
    title: string;
    kcal: number;
    rightIcon: any;
    percent: number;
    restTime?: number;
    time: string;
}
type Props = {
    days?:Array<any>;
    title:string
    onPress: () => void;

}

const AvaibleActivity:React.FC<Props> = (props) => {
const {days,onPress,title}=props
  return (
    <View style={styles.AvailableActivityConteiner}>
        <MealPlan title={title} caloreis={500} time={'50'} onPress={onPress}/>
      {days&&<View style={styles.ActvityTimeContainer}>
            <Text style={styles.ActvityTimeText}>14:50 PM</Text>
        </View>}
        {days?.map((day,index)=>{return (
            <WorkoutCard 
            key={index}
            time={day.time} 
            imageUrl={day.imageUrl} 
            kcal={day.kcal} 
            percent={day.percent} 
            rightIcon={day.rightIcon}
            title={day.title}
            restTime={day.restTime??undefined}
            containerStyle={styles.workoutCardContainer}
            />
        )}) }
    </View>
  )
}

export default AvaibleActivity
