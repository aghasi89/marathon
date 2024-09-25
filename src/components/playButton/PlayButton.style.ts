import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../assets/dimensions';
import {  primaryWhite } from '../../assets/styles/colors.styles';
import { borderStyle } from '../../assets/styles/global.styles';

const styles = StyleSheet.create({
  container:{
    ...borderStyle({size:30,type:'default'}),
    width:calcHeight(60),
    height:calcHeight(60),
    borderRadius:calcHeight(30),
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:primaryWhite,
    
  },
  circleContainer:{
    height:calcHeight(52),
    width:calcHeight(52),
    borderRadius:calcHeight(27),
    borderWidth:calcWidth(1),
    borderColor:'rgba(88,156,254,0.22)',
    justifyContent:'center',
    alignItems:'center',
   // opacity:0.22
  }
});
export default styles;
