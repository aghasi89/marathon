import { StyleSheet } from 'react-native'
import { primaryBlack } from '../../assets/styles/colors.styles'
import { EnCodeSans } from '../../assets/styles/fonts.styles'
import { calcHeight, calcWidth } from '../../assets/dimensions'

const styles = StyleSheet.create({
    container:{
        height:calcHeight(60),
        width:calcWidth(400),
        alignItems:'center',
        justifyContent:'center'
      },
      title:{
        flexDirection:'row',
        width:calcWidth(362),
        justifyContent:'space-between',
        alignItems:'center'
      },
      text:{
        ...EnCodeSans({
          weight: 'semibold',
          size: 'form-field',
        }),
        color:primaryBlack
      },
})

export default styles
