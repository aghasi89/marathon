import React from 'react';
import {Text, TouchableOpacity, View, ViewStyle,Image} from 'react-native';
import Icons from '../../assets/icons/svg/index'
import { primaryBlack } from '../../assets/styles/colors.styles';
import styles from './SharingUserCard.style';

type Period={
    start:string,
    end:string
}
interface Props {
    userImage?:string;
    name:string;
    period:Period;
    containerStyle?:ViewStyle;
    onRightIconPress:()=>void
    onPress?:()=>void
}
const SharingUserCard: React.FC<Props> = ({
    userImage,
    name,
    period,
    containerStyle,
    onRightIconPress,
    onPress
}) => {
  return (
    <TouchableOpacity style={[styles.container, containerStyle]} onPress={()=>onPress&&onPress()}>
        <View style={styles.contentContainer}>
            {userImage?
                <View style={styles.iconContainer}>
                    <Image style={styles.image} source={{uri:userImage}}/>
                </View>:
                <View style={styles.iconContainer}>
                    <Icons.User fill={primaryBlack}/>
                </View>
            }
            <View>
                <Text style={styles.titleText}>{name}</Text>
                <View style={styles.bottomTextContainer}>
                    <Text style={styles.periodText}>{period.start} - {period.end}</Text>
                </View>
            </View>
        </View>
        <TouchableOpacity style={styles.iconTouchContainer} onPress={()=>{onRightIconPress()}}>
            <Icons.EllipsisIcon fill={primaryBlack} />
        </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default SharingUserCard;
