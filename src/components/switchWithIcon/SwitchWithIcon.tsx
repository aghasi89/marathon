import React from 'react'
import { View,Text } from 'react-native'
import SwitchComponenet from '../switch/SwitchComponenet'
import styles from './SwitchWithIcon-style'
type Props={
icon:JSX.Element;
title:string;
isSelected:boolean;
onSelect?:()=>void
}
 const SwitchWithIcon:React.FC <Props> = ({
    icon,
    title,
    isSelected,
    onSelect
 })=> {
  return (
    <View style={styles.container}>
    <View style={styles.nameAndIconContainer}>
    <View style={styles.iconContainer}>{icon}</View>
        <Text style={styles.nameText}>{title}</Text>
    </View>
    <SwitchComponenet checked={isSelected}setChecked={()=>onSelect&&onSelect()}/>
</View>
  )
}
 export default SwitchWithIcon