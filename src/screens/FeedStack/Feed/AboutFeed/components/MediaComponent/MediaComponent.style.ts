import { StyleSheet } from 'react-native';
import { lightPeriwinkles, primaryBlue, primaryWhite } from '../../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../../../../assets/dimensions';

const style=StyleSheet.create({
  imageStyle: {
    resizeMode:'cover'
  },
  iconContainer:{
    position:'absolute',
    top:calcHeight(16),
    right:calcWidth(16),
    backgroundColor:primaryWhite,
    height:calcHeight(40),
    width:calcWidth(40),
    zIndex:1,
    borderRadius:calcWidth(20),
    opacity:0.7,
    alignItems:'center',
    justifyContent:'center'
  },
  liveIconContainer:{
    position:'absolute',
    top:calcHeight(16),
    right:calcWidth(16),
    backgroundColor:primaryWhite,
    zIndex:1,
    borderRadius:calcWidth(40),
    opacity:0.7,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    paddingHorizontal:calcWidth(6),
    paddingVertical:calcHeight(11)
  },
  iconStyle:{
    height:calcHeight(20),
    width:calcWidth(20),
  },
  liveDurationText:{
    ...EnCodeSans({
      size:'subtitle',
      weight:'medium'
    }),
    color:primaryBlue,
    marginLeft:calcWidth(4)
  },
  dotsContainer:{
    bottom:0,
    position:'absolute',
    width:'100%',
    justifyContent:'center',
    alignItems:'flex-end',
    paddingBottom:calcHeight(16),
    flexDirection:'row'
  },
  dotItem:{
    marginHorizontal:calcWidth(2),
    height: calcHeight(10),
    width: calcWidth(10),
    borderRadius: calcHeight(5),
    backgroundColor:lightPeriwinkles
  },
  dotItemSelected:{
    marginHorizontal:calcWidth(2),
    height: calcHeight(11),
    width: calcWidth(11),
    borderRadius: calcHeight(6),
    backgroundColor:primaryBlue
  }
})
export default style