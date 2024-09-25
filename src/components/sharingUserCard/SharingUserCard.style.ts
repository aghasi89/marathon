import {StyleSheet} from 'react-native';
import {
  primaryWhite,
  primaryBlack,
  backgroundligthBlue,
} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
import {borderStyle} from '../../assets/styles/global.styles';
import { calcHeight, calcWidth } from '../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    ...borderStyle({
      size: 30, 
      type: 'default'
    }),
    height:calcHeight(90),
    width: calcWidth(380),
    backgroundColor: primaryWhite,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
  },
  contentContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  iconContainer:{
    width:calcWidth(40),
    height:calcHeight(40),
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:backgroundligthBlue,
    borderRadius:calcWidth(20),
    marginHorizontal:calcWidth(20)
  },
  image:{
    width:calcWidth(40),
    height:calcHeight(40),
    borderRadius:calcWidth(20),
  },
  titleText:{
    ...EnCodeSans({
        size:'form-field',
        weight:'bold'
    }),
    color:primaryBlack
  },
  bottomTextContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingTop:calcHeight(15)
  },
  periodText:{
    ...EnCodeSans({
        size:'legal',
        weight:'medium'
    }),
    color:primaryBlack,
  
  },
  iconTouchContainer:{
    height:calcHeight(90),
    width:calcWidth(50),
    alignItems:'flex-end',
    justifyContent:'center',
    paddingRight:calcWidth(26)
  }
});
export default styles;
