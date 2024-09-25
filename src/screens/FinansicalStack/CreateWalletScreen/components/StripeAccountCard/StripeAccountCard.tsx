import React from 'react'
import { View,Text,Pressable } from "react-native";
import { red } from '../../../../../assets/styles/colors.styles';
import Icons from '../../../../../assets/icons/svg'
import styles from './StripeAccountCard.style'

type Props = {
    bankName?:string;
    accountNumber?:string
    cardNumber?:string
    currency?:string
    onDelete?:()=>void
}
const StripeAccountCard:React.VFC<Props> = ({
    bankName,
    accountNumber,
    currency,
    cardNumber,
    onDelete
})=>{
    return <View style={styles.container}>
    <View style={styles.contentContainer}>
      <Icons.Bank />
      <View style={styles.bankInfoContainer}>
        <View style={styles.bankInfoRowContainer}>
          <Text>{bankName}</Text>
          <Text>{currency}</Text>
        </View>
        <View style={styles.bankInfoRowContainer}>
          <Text>|: {accountNumber}</Text>
          <Text>|: **** {cardNumber}</Text>
        </View>
      </View>
      <Pressable
        style={styles.deleteIconTouch}
        onPress={() => onDelete && onDelete()}>
        <Icons.Close fill={red} />
      </Pressable>
    </View>
  </View>
}
export default StripeAccountCard