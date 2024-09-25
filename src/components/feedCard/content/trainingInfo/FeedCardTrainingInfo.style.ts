import {StyleSheet} from 'react-native';
import { paleCornflowerBlue, primaryBlack } from '../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  infoListItem:{
  flexDirection:'row',
  alignItems:'center'
  },
  iconStyle:{
    height:calcHeight(16),
    width:calcWidth(16),
    fill:paleCornflowerBlue
  },
  infoText:{
    ...EnCodeSans({
      size:'little',
      weight:'regular'
    }),
    color:primaryBlack,
    marginLeft:calcWidth(5)
  }
});

export default styles;