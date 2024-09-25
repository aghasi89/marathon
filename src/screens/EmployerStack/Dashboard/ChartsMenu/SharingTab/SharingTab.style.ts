import { StyleSheet } from "react-native";
import { borderGrey, primaryBlack, primaryBlue, primaryWhite } from "../../../../../assets/styles/colors.styles";
import { EnCodeSans } from "../../../../../assets/styles/fonts.styles";
import { calcHeight, calcWidth } from "../../../../../assets/dimensions";

const styles=StyleSheet.create({
    sharingTabContainer:{
        flex:1,
        backgroundColor:primaryWhite,
        alignItems:'center'
    },
    categoriesMenuContainer:{
        height:calcHeight(49),
        width:calcWidth(400),
        alignItems:'center',
        justifyContent:'center',
    },
    categoriesContainer:{
        height:calcHeight(49),
        width:calcWidth(265),
        flexDirection:'row',
        justifyContent:'space-between',
    },
    categoryTouchConteiner:{
        height:calcHeight(49),
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        ...EnCodeSans({
            size:'body',
            weight:'medium'
        }),
        color:primaryBlack
    },
   textActive:{
        ...EnCodeSans({
            size:'body',
            weight:'medium'
        }),
        color:primaryBlue
    },
    contentConteiner:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        
    },
    usersListContainer:{
        width:calcWidth(400),
        marginTop:calcHeight(12),
    },
    userCardContainer:{
        marginVertical:calcHeight(12),
        marginHorizontal:calcWidth(10), 
    },
    invitationTitleContainer:{
        width:calcWidth(400),
        justifyContent:'center',
        height:calcHeight(48),
        marginTop:calcHeight(12),
        borderTopWidth:calcHeight(1),
        borderColor:borderGrey,
        paddingTop:calcHeight(12)
    },
    invitationText:{
        ...EnCodeSans({
            size:'form-field',
            weight:'regular',
        }),
        color:primaryBlack,
        marginLeft:calcWidth(45)
    },
    plussButton:{
        position:'absolute',
        right:calcWidth(16),
        bottom:calcHeight(17)
    },
    toasterContainer:{
        alignItems:'center',
    },
    periodSelectContainer:{
        width:calcWidth(235),
        height:calcHeight(47),
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:calcHeight(23)
    },
    buttonStyle:{
        width:calcWidth(360),
        marginBottom:calcHeight(11),
        height:calcHeight(45),
        justifyContent:'flex-start',
        paddingLeft:calcWidth(20)
    },
    iconsStyle:{
        height:calcHeight(22),
        width:calcWidth(22)
    },
    sharingToasterContainer:{
        alignItems:'center',
    }
})
export default styles