import { StyleSheet } from 'react-native';
import { calcWidth } from '../../../../../../assets/dimensions';

const style=StyleSheet.create({
    inputContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:calcWidth(20)
    },
    input:{
        borderBottomWidth:0
    },
    sendIconStyle:{
        height:calcWidth(20),
        width:calcWidth(24)
    }

})
export default style