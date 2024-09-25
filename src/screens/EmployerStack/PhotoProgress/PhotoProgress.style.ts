import { StyleSheet } from 'react-native'
import {iconBackgroundLightBlue, primaryWhite } from '../../../assets/styles/colors.styles'
import { calcHeight, calcWidth } from '../../../assets/dimensions'

const styles =StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primaryWhite,
      },
      leftComponentStyle: {
        paddingRight: calcWidth(35),
      },
      leftCompomemtContainer:{
        flexDirection:'row',
        alignItems:'center',
        flex:1,
        width:calcWidth(90)
      },
      iconStyle: {
        marginRight: calcWidth(23),
      },
      contentContainer:{
      },
      titleContainer:{
        width:calcWidth(400),
        height:calcHeight(60),
        alignItems:'center',
        justifyContent:'center'
      },
      titleTextAndIconContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:calcWidth(360),
      },
      photoContainer:{
        width:calcWidth(400),
        height:calcHeight(380),
        backgroundColor:iconBackgroundLightBlue,
        justifyContent:'center',
        alignItems:'center'
      },
      image:{
        width:calcWidth(400),
        height:calcHeight(380),
        alignItems:'center',
        justifyContent:'center', 
      },
      photoProgressDefaultimage:{
        width:calcWidth(87),
        height:calcHeight(276),       
      },
      toasterScreen:{
        flex: 1, 
        justifyContent: 'space-around'
      },
      toasterButton: {
        height: calcHeight(50),
        width: calcWidth(270)
      },
      commentsContainer:{
        minHeight:calcHeight(80),
        marginTop:calcHeight(20),
        alignItems:'center',
        justifyContent:'center'
      },
      commentsButtonContainer:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:calcHeight(20)
      },
      commentsButton:{
        width:calcWidth(380),
        height:calcHeight(60),
      },
      commentsButtonIcon:{
        height:calcHeight(27),
        width:calcWidth(27),
      },
      comment:{
        width:calcWidth(380),
        marginTop:calcHeight(10),
      }
})
export default styles