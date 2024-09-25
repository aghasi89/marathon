import {StyleSheet} from 'react-native';
import {
  inputBorder,
  primaryBlue,
} from '../../../../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: calcHeight(24),
    width: calcWidth(24),
    fill: primaryBlue,
  },
  iconContainer: {
    borderWidth: calcHeight(1),
    height: calcHeight(48),
    width: calcWidth(48),
    borderRadius: calcHeight(24),
    borderColor: inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: calcWidth(12),
  },
});

export default styles;
