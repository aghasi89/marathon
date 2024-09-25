import {StyleSheet} from 'react-native';
import { lightPeriwinkles, primaryBlack, primaryBlue } from '../../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../../assets/styles/fonts.styles';
import { calcHeight } from '../../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  itemContainer:{
    alignItems:'center'
  },
  itemTitle:{
    ...EnCodeSans({
      size:'body',
      weight:'regular'
    }),
    color:lightPeriwinkles
  },

  currentExsecise:{
    color:primaryBlack,
    fontSize:40,
    fontWeight:'600'
  },
  text:{
    ...EnCodeSans({
      size:'form-field',
      weight:'semibold'
    }),
    color:primaryBlack,
    marginTop:calcHeight(6)
  }
});
export default styles;
