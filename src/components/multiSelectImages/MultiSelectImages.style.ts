import { StyleSheet } from 'react-native';
import {primaryGrey} from '../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../assets/dimensions';

const styles = StyleSheet.create({
  containerSelected:{
    flexDirection: "row",
    flexWrap: "wrap",
  },
  elementConteiner:{
    height:calcHeight(115),
    width:calcWidth(115),
    marginHorizontal:calcWidth(2),
    marginVertical:calcHeight(2),
  },
  headerButtonsConteiner:{
    position:'absolute',
    zIndex:2,
    justifyContent:'space-between',
    width:'100%',
    height:calcHeight(30),
    flexDirection:'row'
  },
  closeButtonConteiner:{
    height:calcHeight(25),
    width:calcWidth(25),
    backgroundColor:primaryGrey,
    right:0,
    top:0,    
    borderBottomLeftRadius:calcHeight(12),
    alignItems:'center',
    justifyContent:'center',
  },
  playButtonConteiner:{
    height:calcHeight(30),
    width:calcWidth(30),
    left:0,
    top:0,
    zIndex:2,
    alignItems:'center',
    justifyContent:'center',
  },
  image:{
    height:'100%',
    width:'100%'
  },
  closeIcone:{
    zIndex:2,
  },
  playIcone:{ 
    zIndex:2,
    height:calcHeight(22),
    width:calcWidth(22)
  }
});
export default styles;
