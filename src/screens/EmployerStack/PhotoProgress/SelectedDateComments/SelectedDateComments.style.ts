import { StyleSheet } from 'react-native'
import { borderGrey, primaryBlack, primaryBlue, primaryWhite } from '../../../../assets/styles/colors.styles'
import { EnCodeSans } from '../../../../assets/styles/fonts.styles'
import { calcHeight, calcWidth } from '../../../../assets/dimensions'

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:primaryWhite,
        justifyContent:'space-between'
    },
    headerContainer:{
        flexDirection:"row",
        alignItems:'center',
        paddingLeft:calcWidth(21),
        borderBottomColor:borderGrey,
        borderBottomWidth:calcHeight(1),
        width:calcWidth(400),
        height:calcHeight(60),
    },
    headerLeftIcon:{
        height:calcHeight(60),
        width:calcWidth(30),
        justifyContent:'center',
    },
    headerDateText:{
        ...EnCodeSans({
            size:'form-field',
            weight:'regular',
        }),
        color:primaryBlack,
    },
    commentsContainer:{
        flex:1,
        paddingTop:calcHeight(20),
        paddingBottom:calcHeight(40)
    },
    rowCntainer:{
        marginVertical:calcHeight(10),
        width:calcWidth(400),
        justifyContent: 'center',
        alignItems:'flex-end',
    },
    rowCntainer1:{
        marginVertical:calcHeight(10),
        width:calcWidth(400),
        justifyContent: 'center',
        alignItems:'flex-start',
        paddingLeft:calcWidth(6),
    },
    commentContainer:{     
        shadowColor: primaryBlack,
        shadowOffset: {
          width: calcWidth(4),
          height: calcHeight(4),
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 6,
      backgroundColor:primaryBlue,
      alignItems:'center',
      justifyContent:'center',
      maxWidth:calcWidth(320),
      borderTopLeftRadius:calcWidth(15),
      borderBottomLeftRadius:calcWidth(15)
    },
    commentContainer1:{     
        shadowColor: primaryBlack,
        shadowOffset: {
          width: calcWidth(4),
          height: calcHeight(4),
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 6,
          backgroundColor:primaryWhite,
          justifyContent:'center',
          maxWidth:calcWidth(320),
          borderTopRightRadius:calcWidth(15),
          borderBottomRightRadius:calcWidth(15)
    },
    commentText:{
        ...EnCodeSans({
            size:'body',
            weight:'regular'
        }),
        color:primaryWhite,
        marginVertical:calcHeight(10),
        marginHorizontal:calcWidth(10)
    },
    commentText1:{
        ...EnCodeSans({
            size:'body',
            weight:'regular'
        }),
        color:primaryBlack,
        marginVertical:calcHeight(10),
        marginHorizontal:calcWidth(10),
    },
    bottomContainer:{
        width:calcWidth(400),
        height:calcWidth(60),
        borderTopRightRadius:calcHeight(30),
        borderTopLeftRadius:calcHeight(30),
        backgroundColor:primaryWhite,
        shadowColor: primaryBlack,
        shadowOffset: {
            width: calcWidth(0),
            height: calcHeight(12),
        },
        shadowOpacity: 0.58,
        shadowRadius: 16,
        elevation: 24,
    },
    inputContainer:{
        flexDirection:'row',
        width:calcWidth(400),
        height:calcWidth(60),
    },
    input:{
        flex:1,
        height:calcHeight(60),
        paddingLeft:calcWidth(27)
    },
    inputSendIconTouch:{
        height:calcHeight(60),
        width:calcWidth(60),
        justifyContent:'center',
        alignItems:'flex-end',
        paddingRight:calcWidth(20),
    },
    sendIconStyle:{
        height:calcHeight(23),
        width:calcWidth(23),
    },
})

export default styles