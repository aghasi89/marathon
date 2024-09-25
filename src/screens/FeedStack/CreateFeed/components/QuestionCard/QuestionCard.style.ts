import { StyleSheet } from 'react-native'
import { lightSteelBlue, primaryBlue } from '../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:calcWidth(16),
        paddingVertical:calcHeight(15),
        borderWidth:calcHeight(1),
        borderColor:lightSteelBlue,
        borderRadius:calcHeight(16)
    },
    text:{
        ...EnCodeSans({
            size:'subText',
            weight:'regular'
        }),
        color:primaryBlue,
        flexWrap:'wrap'
    },
    iconContainer:{
        height:calcHeight(20),
        width:calcWidth(20),
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        right:calcWidth(10),
        top:calcHeight(15)
    },
    closeIcon:{
        height:calcHeight(12),
        width:calcWidth(12),
        fill:lightSteelBlue
    }
});

export default styles