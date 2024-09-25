import { StyleSheet } from 'react-native'
import { calcHeight, calcWidth } from '../../assets/dimensions'
import { borderGrey } from '../../assets/styles/colors.styles'

const styles = StyleSheet.create({
    conteiner:{
        width:calcWidth(400),
        height:calcHeight(60),
        alignItems:'center',
        justifyContent:'center',
        borderTopWidth:calcHeight(1),
        borderBottomWidth:calcHeight(1),
        borderColor:borderGrey,
      },
      contentContainer:{
        flexDirection:'row',
        width:calcWidth(276),
        justifyContent:'space-between',
        alignItems:'center',
      },
      categoryIcons:{
        height:calcHeight(35),
        width:calcWidth(35),
      },
})
export default styles