import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  backgroudLightGrey,
  lightGrayBackround,
  primaryBlack,
  primaryBlue,
  primaryGrey,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
import {borderStyle} from '../../assets/styles/global.styles';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: primaryWhite,
    paddingHorizontal: calcWidth(22),
    paddingTop: calcHeight(9),
    paddingBottom: calcHeight(25),
    ...borderStyle({
      size: 35,
      type: 'default',
    }),
  },
  progressStyle: {
    height: calcHeight(52),
    width: calcWidth(52),
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    height: calcHeight(40),
    width: calcHeight(40),
    borderRadius: calcWidth(11),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightGrayBackround,
  },
  title: {
    ...EnCodeSans({
      size: 'headline1',
      weight: 'semibold',
    }),
    color: primaryBlack,
    marginLeft: calcWidth(17),
  },
  mediumContainer: {
    flexDirection: 'row',
    marginVertical: calcHeight(22),
  },
  text: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'regular',
    }),
    color: primaryBlack,
  },
  timeText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
    color: primaryBlue,
    marginLeft: calcWidth(14),
  },
  box: {
    width: calcWidth(300),
    height: calcHeight(6),
    marginVertical: calcHeight(20),
    borderColor: primaryGrey,
    borderWidth: calcWidth(1),
    borderRadius: 7.0,
  },
  progressContainer: {
    height: calcHeight(15),
    backgroundColor: backgroudLightGrey,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: calcHeight(18),
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: calcHeight(22),
  },
  textKg: {
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
    color: primaryBlack,
  },
  blueTextKg: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'regular',
    }),
    color: primaryBlue,
  },
});
