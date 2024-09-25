import {StyleSheet} from 'react-native';
import {
  ghostWhite,
  primaryBlack,
  wildBlueYonder,
} from '../../../../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    borderRadius: calcHeight(16),
    shadowColor: primaryBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: calcWidth(16),
    paddingVertical: calcHeight(16),
    backgroundColor: ghostWhite,
    borderTopLeftRadius: calcHeight(16),
    borderTopRightRadius: calcHeight(16),
  },
  closeIconStyle: {
    height: calcHeight(18),
    width: calcWidth(24),
    fill: wildBlueYonder,
  },
});

export default styles;
