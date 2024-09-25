import {StyleSheet} from 'react-native';
import { aliceBlueBackground, lightSteelBlue, red } from '../../../../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
   padding:calcHeight(2),
   borderWidth:calcHeight(1),
   borderRadius:calcHeight(16)
  },
  borderColor:{
    borderColor:lightSteelBlue,
  },
  borderColorInvalid:{
    borderColor:red,
  },
  inputContainer:{
    flex:1
  },
  input:{
    flexGrow:1,
    paddingHorizontal:calcWidth(16)
  },
  button:{
    borderTopRightRadius:calcHeight(16),
    borderBottomRightRadius:calcHeight(16),
    paddingVertical:calcHeight(9),
    width:calcWidth(100),
    backgroundColor:aliceBlueBackground,
    justifyContent:'center',
    alignItems:'center',
  },
  selectedListContainer:{
    marginTop:calcHeight(16),    
  },
  selectedItemContainer:{
    marginRight:calcWidth(20),
  }
});

export default styles;
