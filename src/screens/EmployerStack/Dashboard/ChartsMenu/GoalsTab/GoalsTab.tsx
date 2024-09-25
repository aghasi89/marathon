import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Icons from '../../../../../assets/icons/svg/index'
import { green, primaryBlack, primaryBlue } from '../../../../../assets/styles/colors.styles'
import PieChartComponent from '../../../../../components/pieChart/PieChartComponent'
import PlusButton from '../../../../../components/plusButton/plusButton'
import GoalsCard from '../../../../../components/GoalsCard/GoalsCard'
import { View,Text, ScrollView } from 'react-native'
import { EmployerNavigationParamList } from '../../..'
import hook from './GoalsTab-hook'
import styles from './GoalsTab.style'

type Props= NativeStackScreenProps<EmployerNavigationParamList,'ChartsMenu'> 

const GoalsTab:React.FC = ()=> {
    const navigation = useNavigation<Props['navigation']>()
    const pieChartsInfo=[
        {
            title:'Protein',
            percent:34,
            weight:196,
        },
        {
            title:'Carbs',
            percent:35,
            weight:201,
        },
        {
            title:'Fat',
            percent:31,
            weight:97,
        },
    ] 
    const cardsInfo=[
        {
            title:'Daily Calories Intake Goal',
            icon:<Icons.Calories fill={green} {...styles.iconsStyle} />,
            date:'18 June',
            value:{
                amount:'1800',
                currency:'kcal' 
            }
        },
        {
            title:'Daily Physical activity Goal',
            icon:<Icons.Trainer fill={primaryBlue} {...styles.iconsStyle} />,
            date:'18 June',
            value:{
                amount:'60',
                currency:'min' 
            }
        },
        {
            title:'Weight Goal',
            icon:<Icons.Apple fill={primaryBlack} {...styles.iconsStyle} />,
            date:'18 June',
            value:{
                amount:'68.0/72.0 ',
                currency:'kg' 
            }
        },
        {
            title:'Daily Steps Goal',
            icon:<Icons.Trainer fill={primaryBlue} {...styles.iconsStyle} />,
            date:'18 June',
            value:{
                amount:'1200',
                currency:'steps' 
            }
        },
    ]
    return (
    <View style={styles.goalsContainer}>
        <View style={styles.chartsGeneralContainer}>
            <View style={styles.chartsContentContainer}>
                <Text style={styles.titleText}>Your Recommended Daily Calories (macros) Intake is 1800 kcal</Text>
                <View style={styles.progressContainer}>
                    {pieChartsInfo.map((item,index)=>{
                        return(
                        <View key={index}>   
                            <PieChartComponent percent={item.percent} title={item.title} weight={item.weight}/>
                        </View>
                    )})}
                </View>
            </View>
        </View>
        <ScrollView style={styles.cardsList}>
            {cardsInfo?.map((card,index)=>{
                return(
                <View key={index} style={styles.cardsListItem}>
                    <GoalsCard
                        containerStyle={styles.CardContainer}
                        date={card.date}
                        icon={card.icon}
                        title={card.title}
                        value={card.value}
                        key={index}
                        onRightIconPress={()=>{}}
                    />
                 </View>
            )})}
        </ScrollView>
        <View style={styles.plusButten}>
            <PlusButton  onPress={()=>{}}/>
        </View>
   </View>
  )
}

export default GoalsTab