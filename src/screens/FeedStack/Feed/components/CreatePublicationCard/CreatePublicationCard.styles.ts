import { StyleSheet } from 'react-native'
import { primaryWhite,lightSteelBlue,primaryBlack  } from '../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
    container:{
        backgroundColor:primaryWhite,
        paddingVertical:calcHeight(16),
        borderRadius: calcHeight(15),
        shadowColor: primaryBlack,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 5,
        paddingBottom:calcHeight(7)
    },
    titleText:{
        ...EnCodeSans({
            size:'form-field',
            weight:'semibold'
        }),
        color:primaryBlack,
        marginHorizontal:calcWidth(16)
    },
    input:{
        ...EnCodeSans({
            size:'legal',
            weight:'semibold'
        }), 
        color:primaryBlack,
        marginVertical:calcHeight(26),
        marginHorizontal:calcHeight(26),
        borderWidth:calcHeight(0),
        maxHeight:calcHeight(37),
    },
    buttonsContainer:{
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap'
    },
    button:{
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:calcWidth(16),
        paddingVertical:calcHeight(8),
        backgroundColor:lightSteelBlue,
        marginHorizontal:calcWidth(8),
        marginVertical:calcHeight(7),
    },
    buttonText:{
        ...EnCodeSans({
            size:'body',
            weight:'regular'
        }),
        color:primaryWhite,
        marginLeft:calcWidth(9)
    },
    icons:{
        height:calcHeight(22),
        width:calcWidth(32),
        fill:primaryWhite
    }

});
export default styles
