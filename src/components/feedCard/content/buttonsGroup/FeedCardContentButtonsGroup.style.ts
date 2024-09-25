import { StyleSheet } from 'react-native';
import {
  primaryBlue,
  primaryWhite,
  red,
} from '../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  defaultButton: {
    backgroundColor: primaryBlue,
    flex: 1,
    paddingVertical: calcHeight(10)
  },
  buttonMargin: {
    marginRight: calcWidth(16),
  },
  defaultButtonText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    color: primaryWhite,
  },
  outlineButton: {
    borderColor: red,
    flex: 1,
    marginRight: calcWidth(16),
    paddingVertical: calcHeight(10)
  },
  outlineButtonText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    color: red,
  },
  smallButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: primaryBlue,

  },
  iconStyle: {
    height: calcHeight(22),
    width: calcWidth(22),
    fill: primaryBlue,
    marginHorizontal: calcWidth(25)
  },
});

export default styles;
