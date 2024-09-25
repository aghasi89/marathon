import {StyleSheet} from 'react-native';
import {
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  itemContainer: {
    shadowColor: primaryBlack,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: primaryWhite,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: calcWidth(21),
    marginHorizontal: calcWidth(12),
    borderRadius: calcHeight(55),
  },
  text: {
    ...EnCodeSans({size: 'subtitle', weight: 'medium'}),
    color: primaryBlack,
    marginVertical: calcHeight(8),
  },
  iconContainer: {
    marginRight: calcWidth(12),
  },
  iconStyle: {
    height: calcHeight(20),
    width: calcWidth(20),
    fill: primaryBlue,
  },
});
export default style;
