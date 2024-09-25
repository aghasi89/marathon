import {StyleSheet} from 'react-native';
import {primaryWhite} from '../../../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite,
    flex: 1,
    paddingHorizontal: calcWidth(10),
  },
  plusButton:{
    position: 'absolute',
    right: calcWidth(17),
    bottom: calcHeight(26),
  }
});
export default styles;
