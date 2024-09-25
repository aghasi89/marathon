import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';
import {
  primaryBlue,
  primaryWhite,
} from '../../../../../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  header: {
    backgroundColor: primaryWhite,
    paddingVertical: calcHeight(5),
    paddingHorizontal: calcWidth(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: primaryBlue,
    fontWeight: 'bold',
  },
});
export default styles;
