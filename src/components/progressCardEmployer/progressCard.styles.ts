import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  backgroudLightGrey,
  borderGrey,
  circleBackground,
  lightGrayBackround,
  primaryBlack,
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
    paddingBottom: calcHeight(15),
    ...borderStyle({
      size: 35,
      type: 'default',
    }),
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
    borderRadius: calcWidth(16),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightGrayBackround,
  },
  title: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'semibold',
    }),
    color: primaryBlack,
    marginLeft: calcWidth(17),
  },
  mediumContainer: {
    flexDirection: 'row',
    marginTop: calcHeight(20),
    marginBottom: calcHeight(7),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fileContainer: {
    flexDirection: 'row',
    marginTop: calcHeight(20),
    marginBottom: calcHeight(7),
    alignItems: 'center',
  },
  timeText: {
    ...EnCodeSans({
      size: 'subtitle',
      weight: 'regular',
    }),
    color: primaryBlack,
    marginLeft: calcWidth(6),
  },
  box: {
    width: '100%',
    height: calcHeight(6),
    marginVertical: calcHeight(20),
    borderColor: primaryGrey,
    borderWidth: calcWidth(1),
    borderRadius: calcHeight(7),
  },
  progressContainer: {
    height: calcHeight(15),
    backgroundColor: backgroudLightGrey,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: calcHeight(18),
  },
  textContainer: {
    paddingVertical: calcHeight(8),
    borderRadius: calcHeight(25),
    borderColor: borderGrey,
    opacity: 1,
    borderWidth: calcWidth(1),
    paddingHorizontal: calcWidth(19),
    flexDirection: 'row',
  },
  count: {
    paddingHorizontal: calcWidth(10),
    ...EnCodeSans({
      size: 'form-field',
      weight: 'regular',
    }),
  },
  plus: {
    marginHorizontal: calcWidth(15),
    ...EnCodeSans({
      size: 'headline1',
      weight: 'semibold',
    }),
  },
  plusContainer: {
    paddingVertical: calcHeight(5),
    borderRadius: calcHeight(25),
    borderColor: borderGrey,
    opacity: 1,
    borderWidth: calcWidth(1),
    paddingHorizontal: calcWidth(14),
    flexDirection: 'row',
  },
  itemContainer: {
    flexDirection: 'row',
    marginHorizontal: calcWidth(8),
  },
  waterContainer: {
    flexDirection: 'row',
    marginBottom: calcHeight(7),
    alignItems: 'center',
  },
  cup: {
    height: calcHeight(30),
    width: calcHeight(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContainer: {
    height: calcHeight(38),
    width: calcHeight(38),
    borderRadius: calcHeight(22),
    backgroundColor: circleBackground,
    borderWidth: calcWidth(3),
    borderColor: primaryWhite,
    marginLeft: -calcWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  marathonContainer: {
    flexDirection: 'row',
    marginTop: calcHeight(20),
    marginBottom: calcHeight(7),
    alignItems: 'center',
    paddingLeft: calcWidth(10),
  },
  marathonText: {
    marginLeft: calcWidth(15),
  },
  bottomContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  progressWithText: {
    width: '50%',
  },
});
