import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';
import {primaryWhite} from '../../../../../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite,
    flex: 1,
  },
  item: {
    marginHorizontal: calcWidth(10),
    marginBottom: calcHeight(14),
  },
});
export default styles;
