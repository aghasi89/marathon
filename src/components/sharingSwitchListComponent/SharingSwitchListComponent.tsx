import React, { useCallback } from 'react'
import moment from 'moment'
import {Text, View } from 'react-native'
import Icons from '../../assets/icons/svg/index'
import { green, primaryBlack, primaryBlue } from '../../assets/styles/colors.styles'
import ContainerWithIcon from '../containerWithIcone/ContainerWithIcon'
import SwitchWithIcon from '../switchWithIcon/SwitchWithIcon'
import CalendarComponent from '../calendar/Calendar'
import { PrimeryButton } from '../buttons'
import styles from './SharingSwitchListComponent-style'

export type SwitchListComponenetData= {
    calories?:boolean;
    activity?:boolean;
    weight?:boolean;
    bodyFat?:boolean;
    measurements?:boolean;
    photoProgress?:boolean;
    water?:boolean;
    periodFrom?:string;
    periodTo?:string
}
type Props = {
    coustomDateButtonClick?:()=>void,
    FromBeginingButtonClick?:()=> void,
    data:SwitchListComponenetData,
    onChange:(data:SwitchListComponenetData)=>void,
    isCalendarOpen:boolean,
    onPeriodChange:(data:SwitchListComponenetData)=>void,
    onCalendarCancel:()=>void,
    onClearPeriod:(data:SwitchListComponenetData)=>void,
}
const SharingScreenComponent:React.FC<Props> = (
    {
        coustomDateButtonClick,
        FromBeginingButtonClick,
        data,
        onChange,
        isCalendarOpen,
        onCalendarCancel,
        onPeriodChange,
        onClearPeriod,
    }
)=> {
    const swtchList={
    calories:{
        title:'Calories',
        icon:<Icons.Calories fill={green} {...styles.iconsStyle} />,
    },
    activity: {
        title:'Activity',
        icon:<Icons.Trainer fill={primaryBlue} {...styles.iconsStyle} />,
    },
    weight:{
        title:'Weight',
        icon:<Icons.Apple fill={primaryBlack} {...styles.iconsStyle} />,
    },
    bodyFat:{
        title: 'Body Fat',
        icon:<Text style={styles.percentIcon}>%</Text>, 
    },
    measurements:{
        title: 'Measurements',
        icon:<Icons.Units fill={primaryBlack}/>,
    },
    photoProgress:{
        title: 'Photo Progress',
        icon:<Icons.Units fill={primaryBlack}/>,
    },
    water: {
        title: 'Water',
        icon:<Icons.Droped fill = {primaryBlue}/>,
    },
}
const onSelectHandeler = useCallback((key)=>{
    return ()=>{
        const tmp = {...data};
        tmp[key] = !tmp[key];
        onChange(tmp)
    }
},[data])
const periodSelectHandler= useCallback((value:Array<string>)=>{
        const tmp = {...data}
        tmp.periodFrom=moment(new Date(value[0])).format('DD MMMM YYYY')
        tmp.periodTo=moment(new Date(value[1])).format('DD MMMM YYYY')
        onPeriodChange(tmp)
},[data])
const periodClearHandler= useCallback(()=>{
        const tmp = {...data}
        tmp.periodFrom=undefined
        tmp.periodTo=undefined
        onClearPeriod(tmp)
},[data])

    return (
            <View style={styles.container}>
                <View style={styles.sharingPeriodContainer}>
                    <Text style={styles.titleText}>Sharing Progress Period</Text>
                    {!data.periodFrom&&!data.periodTo?(
                    <View style={styles.sharingPeriodButtonsContainer}>
                       <PrimeryButton 
                            textStyle={styles.buttonText} 
                            style={styles.periodButton} 
                            type='default' 
                            title='From beginning' 
                            onPress={()=>FromBeginingButtonClick&&FromBeginingButtonClick()}
                        />
                       <PrimeryButton 
                            textStyle={styles.buttonText} 
                            style={styles.periodButton} 
                            type='outline'
                            title='Custom date' 
                            onPress={()=>coustomDateButtonClick&&coustomDateButtonClick()}
                       />
                    </View>):(
                        <ContainerWithIcon
                        styleGenegalContainer={styles.selectedPeriodGeneralContainer}
                        onClose={()=>periodClearHandler()}
                        value={`${data.periodFrom} - ${data.periodTo}`}
                      />
                    )}
                </View>
                <View style={styles.switchListContainer}>
                    <SwitchWithIcon 
                    icon={swtchList.calories.icon} 
                    title={swtchList.calories.title} 
                    isSelected={data.calories??false}
                    onSelect={onSelectHandeler("calories")}
                    />
                    <SwitchWithIcon 
                    icon={swtchList.activity.icon} 
                    title={swtchList.activity.title} 
                    isSelected={data.activity??false}
                    onSelect={onSelectHandeler("activity")}
                    />
                    <SwitchWithIcon 
                    icon={swtchList.weight.icon} 
                    title={swtchList.weight.title} 
                    isSelected={data.weight??false}
                    onSelect={onSelectHandeler("weight")}
                    />
                    <SwitchWithIcon 
                    icon={swtchList.bodyFat.icon} 
                    title={swtchList.bodyFat.title} 
                    isSelected={data.bodyFat??false}
                    onSelect={onSelectHandeler("bodyFat")}
                    />
                    <SwitchWithIcon 
                    icon={swtchList.measurements.icon} 
                    title={swtchList.measurements.title} 
                    isSelected={data.measurements??false}
                    onSelect={onSelectHandeler("measurements")}
                    />
                    <SwitchWithIcon 
                    icon={swtchList.photoProgress.icon} 
                    title={swtchList.photoProgress.title} 
                    isSelected={data.photoProgress??false}
                    onSelect={onSelectHandeler("photoProgress")}
                    />
                    <SwitchWithIcon 
                    icon={swtchList.water.icon} 
                    title={swtchList.water.title} 
                    isSelected={data.water??false}
                    onSelect={onSelectHandeler("water")}
                    />
                </View>
                <CalendarComponent
                    isVisible={isCalendarOpen}
                    onApplay={(value)=>periodSelectHandler(value)}
                    onCancle={onCalendarCancel}
                 />
            </View>
      )
}
export default  SharingScreenComponent
