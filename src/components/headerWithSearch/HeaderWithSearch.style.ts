import {  StyleSheet} from 'react-native';
import { primaryBlack, primaryWhite, workoutBlue } from '../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../assets/dimensions';

const styles = StyleSheet.create({
    container: {
        width:'100%',
        flexDirection: 'row',
        backgroundColor: primaryWhite,
        paddingRight:calcWidth(43),
        paddingTop:calcHeight(16),      
      },
      backButton: {
        paddingHorizontal: calcWidth(16),  
        justifyContent:'center',
        alignItems:'flex-end',
      },
      contentContainer:{
        width:'100%',
        paddingRight:calcWidth(16),
      },
      inputContainer:{
        flexDirection:'row',
        backgroundColor:workoutBlue,
        paddingLeft:calcWidth(12),
        paddingVertical:calcHeight(10),
        borderRadius:calcHeight(10),
        maxHeight:calcHeight(50),
        justifyContent:'space-between',
        alignItems:'center'
      },
      input:{
        flex:1,
        padding:0,
        paddingLeft:calcWidth(8)
      },
      filterTouchContainer:{
        width:calcWidth(40),
        alignItems:'flex-end',
        height:'100%',
        justifyContent:'center',
        paddingRight:calcWidth(12),
      },
      iconsStyle:{
        height:calcHeight(20),
        width:calcWidth(20),
        fill:primaryBlack
      },
      emptyView:{
        paddingRight:calcWidth(12),
      }
});
export default styles