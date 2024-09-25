import { StyleSheet } from 'react-native'
import { calcHeight, calcWidth } from '../../../assets/dimensions'
import { backgroudLightGreen, formFieldGrey, lightGray, primaryBlack, primaryWhite } from '../../../assets/styles/colors.styles'
import { EnCodeSans } from '../../../assets/styles/fonts.styles'
import { borderStyle } from '../../../assets/styles/global.styles'

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primaryWhite,
      },
      contentContainer: {
        paddingBottom: calcHeight(260),
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
      totalContainer: {
        height: calcHeight(60),
        backgroundColor: backgroudLightGreen,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: calcWidth(23),
      },
      totalTitleText: {
        ...EnCodeSans({
          weight: 'semibold',
          size: 'headline',
        }),
        color: primaryBlack,
      },
      totalText: {
        ...EnCodeSans({
          weight: 'semibold',
          size: 'form-field',
        }),
        color: primaryBlack,
      },
      totalTimeAndKcalContainer: {
        flexDirection: 'row',
        width: calcWidth(225),
        justifyContent: 'space-between',
      },
      foodsContainer:{
        paddingLeft:calcWidth(20)
      },
      AvailableActivityConteiner:{
        alignItems:'center'
      },
      ActvityTimeContainer:{
        paddingLeft:calcWidth(28),
        height:calcHeight(55),
        width:calcWidth(400),
        justifyContent:'center'
      },
      ActvityTimeText:{
          ...EnCodeSans({
            weight: 'semibold',
            size: 'body',
          }),
          color: formFieldGrey,
      },
      workoutCardContainer:{
        marginBottom:calcHeight(10),
        shadowColor: lightGray,
        ...borderStyle({size:25,type:'default'}),
        backgroundColor: primaryWhite,
        width: calcWidth(390),
        paddingHorizontal: calcWidth(15),
        paddingVertical: calcHeight(15),
      },
})
export default styles