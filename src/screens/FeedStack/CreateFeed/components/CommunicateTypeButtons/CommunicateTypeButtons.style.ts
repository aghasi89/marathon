import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../assets/dimensions';
import {
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: calcWidth(130),
    paddingVertical: calcHeight(24),
    alignItems: 'center',
    marginHorizontal: calcWidth(14),
    borderRadius: calcHeight(16),
    shadowColor: primaryBlack,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  buttonBg: {
    backgroundColor: primaryWhite,
  },
  selectedButtonBg: {
    backgroundColor: primaryBlue,
  },
  iconStyle: {
    height: calcHeight(28),
    width: calcWidth(28),
  },
  buttonText: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'semibold',
    }),
  },
  textColor: {
    color: primaryBlue,
  },
  selectedTextColor: {
    color: primaryWhite,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "flex-start",
  },
  infoText: {
    width: calcWidth(130),
    alignItems: 'center',
    textAlign: "center",
    marginHorizontal: calcWidth(14),
    fontSize: 14,
    fontWeight: "400",
    color: primaryBlack
  }
});

export default styles;
