import { StyleSheet } from 'react-native'
import {iconBackgroundLightBlue, primaryBlack} from '../../assets/styles/colors.styles'
import { EnCodeSans } from '../../assets/styles/fonts.styles'
import { calcHeight, calcWidth } from '../../assets/dimensions'

const styles =StyleSheet.create({
      titleGeneralContainer:{
        width:calcWidth(400),
        height:calcHeight(60),
        alignItems:'center',
        justifyContent:'center'
      },
      titleContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:calcWidth(360),
      },
      titleText:{
        ...EnCodeSans({
          weight: 'medium',
          size: 'form-field',
        }),
        color:primaryBlack,
      },
      titleIconsContainer:{
        flexDirection:'row',
        width:calcWidth(106),
        justifyContent:'flex-end',
        alignItems:'center'
      },
      commentIconAndCount:{
        flexDirection:'row',
        width:calcWidth(55),
        justifyContent:'space-between',
        marginRight:calcWidth(20)
      },
      titleIconStyle: {
        height:calcHeight(27),
        width:calcWidth(27),
      },
      imagesGeneralContainer:{
        flexDirection:'row',
        width:calcWidth(400),
        height:calcHeight(145),
        justifyContent:'space-between'
      },
      imageContainer:{
        height:calcHeight(145),
        width:calcWidth(129),
        backgroundColor:iconBackgroundLightBlue,
        alignItems:'center',
        justifyContent:'center'
      },
      image:{
        height:calcHeight(145),
        width:calcWidth(129),
        alignItems:'center',
        justifyContent:'center',
      },
      photoProgressDefaultimage:{
        width:calcWidth(87),
        height:calcHeight(276),       
      },
      photoContainer:{
        width:calcWidth(400),
        height:calcHeight(380),
        backgroundColor:iconBackgroundLightBlue,
        justifyContent:'center',
        alignItems:'center',
      },
      photo:{
        width:calcWidth(400),
        height:calcHeight(380),
        alignItems:'center',
        justifyContent:'center',
      }
})
export default styles