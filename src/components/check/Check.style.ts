import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  circleBackground,
  circleBorder,
  primaryBlue,
  primaryWhite,
} from '../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite,
    borderTopLeftRadius: calcHeight(10),
    borderTopRightRadius: calcHeight(26),
    borderBottomLeftRadius: calcHeight(24),
    borderBottomRightRadius: calcHeight(10),
    alignItems: 'center',
    justifyContent: 'center',
    width: calcHeight(48),
    height: calcHeight(48),
  },
  circleContainer: {
    height: calcHeight(30),
    width: calcHeight(30),
    borderWidth: calcWidth(1),
    borderColor: circleBorder,
    backgroundColor: circleBackground,
    opacity: 1,
    borderRadius: calcHeight(15),
  },
  selected: {
    height: calcHeight(30),
    width: calcHeight(30),
    backgroundColor: primaryBlue,
    borderRadius: calcHeight(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  doing: {
    height: calcHeight(30),
    width: calcHeight(30),
    borderRadius: calcHeight(30),
    borderColor: primaryBlue,
    borderWidth: calcWidth(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
