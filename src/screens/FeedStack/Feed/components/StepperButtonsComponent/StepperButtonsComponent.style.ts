import {StyleSheet} from 'react-native';
import { lightPeriwinkles, primaryBlue, primaryWhite } from '../../../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';
import { EnCodeSans } from '../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  buttons: {
    flexDirection: "row",
  },
  applyButton: {
    backgroundColor: primaryBlue,
    flexGrow: 1,
    borderRadius: calcHeight(8),
    borderWidth:calcHeight(1),
    borderColor:primaryBlue,
    alignItems:'center',
    paddingVertical:calcHeight(10)
  },
  backButton: {
    backgroundColor: primaryWhite,
    flexGrow: 1,
    borderRadius: calcHeight(8),
    borderWidth:calcHeight(1),
    borderColor:lightPeriwinkles,
    alignItems:'center',
    paddingVertical:calcHeight(10)
  },
  buttonTitle:{
    ...EnCodeSans({
        size:'legal',
        weight:'semibold'
    })
  },
  backButtonText:{
    color:lightPeriwinkles
  },
  applyButtonText:{
    color:primaryWhite
  },
  emptyView: {
    width: calcWidth(16)
  }
});
export default styles;
