import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../../assets/dimensions';

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:calcWidth(16),
        alignItems:'center'
    },
    logoIcon:{
      marginVertical:calcHeight(18)
    },
    searchIconTouchContainer:{
        width:calcWidth(60),
        height:calcHeight(40),
        alignItems:'flex-end',
        justifyContent:'center',
        paddingRight:calcWidth(16),
    },
    searchIcon:{
        height:calcHeight(24),
        width:calcWidth(24)
    }
});

export default styles;