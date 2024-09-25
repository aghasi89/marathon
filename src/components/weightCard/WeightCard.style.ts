import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  backgroudLightGrey,
  backgroudLightRed,
  primaryBlack,
  primaryBlue,
  primaryWhite,
  red,
} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
import {borderStyle} from '../../assets/styles/global.styles';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: primaryWhite,
    paddingVertical: calcHeight(35),
    ...borderStyle({
      size: 35,
      type: 'default',
    }),
  },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...EnCodeSans({
      size: 'headline1',
      weight: 'semibold',
    }),
    color: primaryBlack,
    marginLeft: calcWidth(17),
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: calcHeight(18),
  },
  textKg: {
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
    color: primaryBlack,
  },
  text: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'regular',
    }),
    color: primaryBlack,
  },
});
