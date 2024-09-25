import React from 'react'
import { View,Text, Pressable, ScrollView, ViewStyle } from 'react-native'
import styles from './WorkoutProgress.style'
import { aliceBlue,primaryBlue } from '../../../../../../assets/styles/colors.styles'

type Props = {
    progressStepsCount:number
    selectedStepIndex:number
    containerStyle?:ViewStyle|ViewStyle[]
}

const WorkoutProgress:React.VFC<Props>=({
    progressStepsCount,
    selectedStepIndex,
    containerStyle
})=>{
    return <View style = {[styles.container,containerStyle]}>
       {[...Array(progressStepsCount)].map((_,index)=>(
        <Pressable key={index} style={[styles.progressItem,{backgroundColor:selectedStepIndex>=index?primaryBlue:aliceBlue}]}></Pressable>
       ))}
        
    </View>
}
export default WorkoutProgress