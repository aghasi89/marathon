import React from 'react';
import {Text, Image, View,TouchableOpacity} from 'react-native';
import styles from './userProgressCard.styles';
type Value = {
  amount: string;
  currency: string;
};
type Props = {
  Icon: any;
  title: string;
  value: Value | string[];
  iconStyle?: any;
  onPress?:()=>void;
};
const UserProgressCard: React.FC<Props> = ({Icon, title, value, iconStyle,onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={()=>onPress&&onPress()}>
      <View style={styles.titleContainer}>
        <View style={[styles.iconContainer, iconStyle]}>{Icon}</View>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View>
        {value?.amount ? (
          <Text style={styles.amountText}>
            {value.amount + ' '}
            <Text style={styles.currencyText}>{value.currency}</Text>
          </Text>
        ) : (
          <View style={styles.titleContainer}>
            {value?.map((url: string, index: number) => {
              return (
                <Image source={{uri: url}} key={index} style={styles.image} />
              );
            })}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default UserProgressCard;
