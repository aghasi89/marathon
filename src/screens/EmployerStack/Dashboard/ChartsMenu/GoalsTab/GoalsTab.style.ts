import {StyleSheet} from 'react-native';
import { borderGrey, primaryBlack } from '../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';

const styles=StyleSheet.create({
    goalsContainer:{
        flex:1,
        alignItems:'center',
    },
    chartsGeneralContainer:{
        width:calcWidth(380),
        height:calcHeight(124),
        borderWidth:calcWidth(1),
        borderColor:borderGrey,
        borderRadius:calcWidth(30),
        marginTop:calcHeight(5),
        marginBottom:calcHeight(17),
        alignItems:'center',
        justifyContent:'center',
    },
    chartsContentContainer:{
        height:calcHeight(97),
        width:calcWidth(345),
        justifyContent:'space-between',        
    },
    titleText:{
        ...EnCodeSans({
            size:'body',
            weight:'semibold',
        }),
        color:primaryBlack,
    },
    progressContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    iconsStyle:{
        height:calcHeight(25),
        width:calcWidth(25)
    },
    cardsList:{
        paddingTop:calcHeight(12),
        flex:1,
    },
    cardsListItem:{
        width:calcWidth(400),
        alignItems:'center'
    },
    CardContainer:{
        marginBottom:calcHeight(10),
        marginTop:calcHeight(2)
    },
    plusButten:{
        position:'absolute',
        bottom:calcHeight(14),
        right:calcWidth(16)
    },
})

export default styles