import {StyleSheet} from 'react-native';
import { lightPeriwinkles, lightTransparentBlack, primaryBlue, primaryWhite, transparentBlack } from '../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../assets/dimensions';

const styles = StyleSheet.create({
  videoSize: {
    width:"100%"
  },
  absolutContainer:{
    width:'100%',
    height:'100%',
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    zIndex:5,
  },
  coverContainerBackground:{
    backgroundColor:transparentBlack,
  },
  playContainerBackground:{
    backgroundColor:lightTransparentBlack,
  },
  containerInProgress:{
    borderColor:lightPeriwinkles,
    borderWidth:calcWidth(1)
  },
  progressContainer:{
    alignItems:'center',
    justifyContent:'center'
  },
    progressText:{
      ...EnCodeSans({
        size:'body',
        weight:'medium'
      }),
      color:primaryBlue
    },
    logo:{
     marginBottom:calcHeight(35 )
    },
    playIconContainer:{
      height:calcHeight(50),
      width:calcWidth(50),
      justifyContent:'center',
      alignItems:'center',
      borderRadius:calcHeight(25),
      backgroundColor:primaryBlue,
      paddingLeft:calcWidth(3)
    },
    playIcon:{
      height: calcHeight(20),
      width: calcWidth(20),
      fill:primaryWhite
    }
});

export default styles;
