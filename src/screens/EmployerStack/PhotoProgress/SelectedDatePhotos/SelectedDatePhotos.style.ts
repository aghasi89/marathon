import { StyleSheet } from "react-native";
import { borderGrey, iconBackgroundLightBlue, primaryBlack, primaryWhite } from "../../../../assets/styles/colors.styles";
import { EnCodeSans } from "../../../../assets/styles/fonts.styles";
import { calcHeight, calcWidth } from "../../../../assets/dimensions";

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:primaryWhite,
        justifyContent:'space-between'
    },
    headerContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center',
        paddingLeft:calcWidth(21),
        paddingRight:calcWidth(33),
        borderBottomColor:borderGrey,
        borderBottomWidth:calcHeight(1),
        width:calcWidth(400),
        height:calcHeight(60),
    },
    headerLeftIcon:{
        height:calcHeight(60),
        width:calcWidth(55),
        justifyContent:'center',
    },
    categoryIconsConteyner:{
        width:calcWidth(200),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    categoryIcons:{
        height:calcHeight(35),
        width:calcWidth(35),
      },
      contentContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
      },
      imageContainer:{
        backgroundColor:iconBackgroundLightBlue,
        height:calcHeight(380),
        width:calcWidth(400),
        alignItems:'center',
        justifyContent:'center'
      },
      image:{
        height:calcHeight(380),
        width:calcWidth(400)
      },
      photoProgressDefaultImage:{
        width:calcWidth(87),
        height:calcHeight(276),       
      },
      bottomContainer:{
        width:calcWidth(400),
        height:calcHeight(60),
        flexDirection:'row',
        paddingHorizontal:calcWidth(25),
        borderTopColor:borderGrey,
        borderTopWidth:calcHeight(1),
        borderBottomColor:borderGrey,
        borderBottomWidth:calcHeight(1)
      },
      commentIconContainer:{
        width:calcWidth(100),
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
      },
      commentIcone:{
        height:calcHeight(26),
        width:calcWidth(26)
      },
      commentsCount:{
        ...EnCodeSans({
            size:'form-field',
            weight:'regular',
        }),
        color:primaryBlack,
        marginLeft:calcWidth(10)
      },
      commentIconTouch:{
        flexDirection:'row'
      },
      dateContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
      },
      date:{
        width:calcWidth(168),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
      },
      dateText:{
        ...EnCodeSans({
            size:'form-field',
            weight:'regular',
        }),
        color:primaryBlack
      },
      dateArrow:{
      fontSize:calcHeight(35),
        color:primaryBlack
      },
      dateArrowTouchLeft:{
        height:calcHeight(55),
        width:calcWidth(55) ,
        justifyContent:'center',      
      },
      dateArrowTouchRight:{
        height:calcHeight(55),
        width:calcWidth(55)  ,
        justifyContent:'center',
        alignItems:'flex-end'      
      }
})

export default styles