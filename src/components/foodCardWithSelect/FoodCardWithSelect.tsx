import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {primaryWhite} from '../../assets/styles/colors.styles';
import Icons from '../../assets/icons/svg/index';
import styles from './FoodCardWithSelect.styles';

type FoodCardInfoTypes = {
  title: string;
  imageUrl: string;
  portion?:number;
  kcal?:number
  weight?:number
};
type Props = {
  info: FoodCardInfoTypes;
  onLongPress?: () => void;
  onPress?: () => void;
  isSelected?: boolean;
  onPressCheck?: () => void;
  leftIconPressSelected?:(value)=>void;
  leftIconPressNotSelected?:(value)=>void
};
const FoodCardWithSelect: React.FC<Props> = ({
  info,
  onLongPress,
  onPress,
  isSelected,
  onPressCheck,
  leftIconPressSelected,
  leftIconPressNotSelected,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container,!isSelected?styles.containerNotSelected:styles.containerSelected]}
      onLongPress={onLongPress}
      onPress={onPress}>
      <View style={styles.headerContainer}>
        <Image style={styles.image} source={{uri: info.imageUrl}}></Image>
        {isSelected?
         (<TouchableOpacity style={styles.topLeftIcone} onPress={leftIconPressSelected}>
         <Icons.User fill={primaryWhite} />
       </TouchableOpacity>):
         ( <TouchableOpacity style={styles.topLeftIcone} onPress={leftIconPressNotSelected}>
            <Icons.PlusX fill={primaryWhite} />
          </TouchableOpacity>)}
      </View>
      <View style={styles.bottomSheet}>
        <View style={styles.titleTextContainer}> 
          <Text style={!isSelected?styles.titleText:styles.titleText1}>{info.title}</Text>
        </View>
        <View style={styles.infoTextContainer}>
          {info.portion&&<Text style={!isSelected?styles.infoText:styles.infoText1}>{info.portion} portion</Text>}
          {info.weight&&<Text style={!isSelected?styles.infoText:styles.infoText1}>{info.weight} g</Text>}
          {info.kcal&&<Text style={!isSelected?[styles.infoText1,styles.greenText]:styles.infoText1}>{info.kcal} kcal</Text>}
        </View>
      </View>
      <TouchableOpacity 
        style={[styles.check,!isSelected?styles.checkNotSelected:styles.checkSelected]} 
        onPress={onPressCheck}
      >
          {isSelected&&<Icons.Ceck/>}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default FoodCardWithSelect;
