import {StyleSheet} from 'react-native';
import {lightPeriwinkles, primaryBlack} from '../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  label: {
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
    color: primaryBlack,
  },
  checkBox:{
    height:calcHeight(20),
    width:calcWidth(20),
    borderWidth:calcWidth(1),
    borderColor:lightPeriwinkles,
    marginRight:calcWidth(10),
    borderRadius:calcHeight(10),
    alignItems:'center',
    justifyContent:'center'
  }
});
export default styles;
