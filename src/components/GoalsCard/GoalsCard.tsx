import React from 'react';
import {Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import Icons from '../../assets/icons/svg/index'
import { primaryBlack } from '../../assets/styles/colors.styles';
import styles from './GoalsCard.style';

type Value={
    amount:string,
    currency:string
}
interface Props {
    icon:any;
    title:string;
    value:Value;
    date:string;
    containerStyle?:ViewStyle;
    onRightIconPress:()=>void
}

const GoalsCard: React.FC<Props> = ({
    icon,
    title,
    value,
    date,
    containerStyle,
    onRightIconPress
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
        <View style={styles.contentContainer}>
            <View style={styles.iconContainer}>
                {icon}
            </View>
            <View>
                <Text style={styles.titleText}>{title}</Text>
                <View style={styles.bottomTextContainer}>
                    <Text style={styles.titleText}>{value.amount} {value.currency}</Text>
                    <Text style={styles.dateText}>set {date}</Text>
                </View>
            </View>
        </View>
        <TouchableOpacity onPress={()=>{onRightIconPress()}}>
            <Icons.EllipsisIcon fill={primaryBlack} />
        </TouchableOpacity>
    </View>
  );
};
export default GoalsCard;
