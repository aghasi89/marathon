import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../../../../../assets/dimensions';
import { primaryBlue } from '../../../../../../assets/styles/colors.styles';


const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:calcWidth(12),
  },
  progressItem:{
    flexGrow:1,
    marginHorizontal:calcWidth(4),
    height:calcHeight(16),
    borderRadius:calcHeight(4)
  },
});
export default styles;
