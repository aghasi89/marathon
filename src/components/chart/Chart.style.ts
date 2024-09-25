import { StyleSheet } from "react-native";
import {primaryBlack} from "../../assets/styles/colors.styles";
import { EnCodeSans } from "../../assets/styles/fonts.styles";
import { calcHeight, calcWidth } from "../../assets/dimensions";

 const styles= StyleSheet.create({
    chartsItemContainer:{
    marginHorizontal:calcWidth(15),
    alignItems:'center',
    },
    chartContainer:{ 
        height:calcHeight(200),
        width:calcWidth(18),
        backgroundColor:'#F6F6F7',
        borderRadius:calcWidth(9),
        justifyContent: 'flex-end',
        alignItems:'center',
        paddingBottom:calcHeight(3)
    },
    chartInner:{
        width:calcWidth(12),
        borderRadius:calcWidth(7),
        height:calcHeight(150),        
    },
    ValueContainer:{
        marginTop:calcHeight(18)
    },
    valueText:{ 
        ...EnCodeSans ({
            size: 'body',
            weight: 'medium',
          }),
          color:primaryBlack
    },
    dateContainer:{
        marginTop:calcHeight(12)
    },
    dateText:{
        ...EnCodeSans ({
            size: 'little',
            weight: 'medium',
          }),
          color:primaryBlack
    },
})
export default styles