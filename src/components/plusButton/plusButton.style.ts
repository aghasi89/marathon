import { StyleSheet } from 'react-native';
import { calcHeight } from '../../assets/dimensions';
import { primaryWhite } from '../../assets/styles/colors.styles';
import { borderStyle } from '../../assets/styles/global.styles';

const styles = StyleSheet.create({
  container:{
    ...borderStyle({size:30,type:'default'}),
    width:calcHeight(60),
    height:calcHeight(60),
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:primaryWhite}
});
export default styles;
