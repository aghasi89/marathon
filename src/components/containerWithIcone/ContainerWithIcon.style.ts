import { StyleSheet } from "react-native";
import { borderGrey, primaryBlue, primaryWhite } from "../../assets/styles/colors.styles";
import { EnCodeSans } from "../../assets/styles/fonts.styles";
import {calcHeight, calcWidth} from '../../assets/dimensions';

const styles= StyleSheet.create({
    container:{
        paddingLeft:calcWidth(12),
        paddingRight:calcWidth(28),
        flexDirection:'row',
        justifyContent:'space-between',
        borderColor:borderGrey,
        borderWidth:calcWidth(1),
        alignItems:'center'
    },
    containerWithText:{
        paddingLeft:calcWidth(12),
        paddingRight:calcWidth(28),
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:primaryBlue,
        alignItems:'center'
    },
    containerDefaultStyles:{
        height:calcHeight(45),
        width:calcWidth(359),
        borderRadius:calcWidth(23)
    },
    IconTouch:{
        height:'100%',
        width:'10%',
        justifyContent:'center',
        alignItems:'flex-end',
    },
    iconeStyle:{
        height:calcHeight(14),
        width:calcWidth(14)
    },
    contentContainer:{
        height:'100%',
        width:'100%'
    },
    text:{
        ...EnCodeSans({
        size:'body',
        weight:'regular'
    }),
    color:primaryWhite
    }
})
export default styles