import {StyleSheet} from 'react-native';
import {
  lightSteelBlue,
  primaryBlack,
  primaryWhite,
} from '../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    maxWidth: calcWidth(200),
  },
  buttonStyle: {
    backgroundColor: primaryWhite,
    borderRadius: calcWidth(10),
    paddingLeft: calcWidth(16),
    paddingRight: calcWidth(10),
    paddingVertical: calcHeight(3),
    shadowColor: primaryBlack,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    ...EnCodeSans({
      size: 'subText',
      weight: 'regular',
    }),
    color: lightSteelBlue,
    padding: calcHeight(0),
    textAlign: 'center',
  },
  buttonTextSelected: {
    ...EnCodeSans({
      size: 'subText',
      weight: 'regular',
    }),
    color: primaryBlack,
    padding: calcHeight(0),
    textAlign: 'center',
  },
  calendarIcon: {
    height: calcHeight(14),
    width: calcWidth(14),
    fill: lightSteelBlue,
    marginRight:calcWidth(16)
  },
  arrowIcon: {
    height: calcHeight(6),
    width: calcWidth(8),
    fill: lightSteelBlue,
    marginLeft:calcWidth(16)
  },
});

export default styles;
