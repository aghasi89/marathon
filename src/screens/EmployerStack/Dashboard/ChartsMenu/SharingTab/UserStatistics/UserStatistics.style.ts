import { StyleSheet } from 'react-native'
import { calcHeight, calcWidth } from '../../../../../../assets/dimensions'
import { primaryWhite } from '../../../../../../assets/styles/colors.styles'

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:primaryWhite,
    },
    headerRightIconTouch:{
        width:calcWidth(50),
        alignItems:'flex-end',
    },
    userImageAltIcon:{
        height:calcHeight(40),
        width:calcWidth(40),
    }
})
export default styles