import {StyleSheet} from 'react-native';
import {primaryBlack} from '../../../../../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';

const style = StyleSheet.create({
  actionSheetIcon: {
    height: calcHeight(21),
    width: calcWidth(21),
    fill: primaryBlack,
  },
  actionSheetCancleIcon: {
    height: calcHeight(15),
    width: calcWidth(15),
    fill: primaryBlack,
  },
});
export default style;
