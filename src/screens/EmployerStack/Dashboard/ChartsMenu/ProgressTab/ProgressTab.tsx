import React from 'react';
import {View,Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icons from '../../../../../assets/icons/svg/index';
import {green, primaryBlack, primaryBlue} from '../../../../../assets/styles/colors.styles';
import UserProgressCard from '../../../../../components/userProgressCard/userProgressCard';
import {EmployerNavigationParamList} from '../../..';
import hook from './ProgressTab-hook';
import styles from './ProgressTab.styles';

type Props = NativeStackScreenProps<EmployerNavigationParamList, 'ChartsMenu'>;

const ProgressTab: React.FC = () => {
const navigaton = useNavigation<Props['navigation']>();
const menuItems = [
    {
        name: 'Calories',
        icon:<Icons.Calories fill={green}/>,
        value:{
            amount:'1800',
            currency:'kcal'
        }
    },
    {
        name: 'Activity',
        icon:<Icons.Trainer fill={primaryBlue}/>,
        value:{
            amount:'60',
            currency:'min'
        }
    },
    {
        name: 'Weight',
        icon:<Icons.WeightBlack fill={primaryBlack}/>,
        value:{
            amount:'70.0',
            currency:'kg'
        }
    },
    {
        name: 'Body Fat',
        icon:<Text style={styles.percentIcon}>%</Text>,   
        value:{
            amount:'20',
            currency:'%'
        }     
    },
    {
        name: 'Photos',
        icon:<Icons.Apple fill={primaryBlack}/>,
        value:[
            'https://www.ixbt.com/img/n1/news/2021/5/2/gym-fitness-girl-workout_large.jpg',
            'https://marino.magneto.fit/assets/images/slider/3.jpg',
            'https://image.shutterstock.com/image-photo/slim-fitnes-young-girl-ponytail-260nw-1874546548.jpg'
        ]
    },
    {
        name: 'Measurements',
        icon:<Icons.Units fill={primaryBlack}/>,
        value:{
            amount:'800',
            currency:'ml'
        }    
    },
    {
        name: 'Water',
        icon:<Icons.Droped fill = {primaryBlue}/>,
        value:{
            amount:'800',
            currency:'ml'
        }    
    },
]
  return (
   <>
     {menuItems.map ((item,index)=>{
        return ( 
        <View key={index} style={styles.cardContainer}>   
            <UserProgressCard
            Icon={item.icon}
            title={item.name}
            value={item.value}
            />
        </View>
        )})}
    </>
  );
}   
export default ProgressTab;
