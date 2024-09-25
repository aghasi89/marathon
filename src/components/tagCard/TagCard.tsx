import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Icons from '../../assets/icons/svg/index';
import styles from './TagCard.style';
type Props = {
    title:string,
    color:string,
    count:string,
    onPress:()=>void
};
const TagCard: React.FC<Props> = ({  title,color ,count,onPress}) => {
    return (
        <View style={styles.container} >
            <Text style={[styles.textTitle,{color:color}]}>{title}</Text>
            <View style={styles.rowContainer}>
            <Text style={styles.textCount}>{count}</Text>
            <TouchableOpacity
             onPress={()=>onPress()}
              style={styles.icon}>
                  <Icons.Edit />
              </TouchableOpacity>
            </View>
        </View>
    );
};
export default TagCard;