import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  backgroudLightGrey,
  backgroudLightRed,
  primaryBlack,
  primaryBlue,
  primaryGrey,
  primaryWhite,
  red,
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
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: calcHeight(22),
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: '100%',
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
  progressContainerSegmented: {
    flexDirection: 'row',
    height: calcHeight(15),
    backgroundColor: backgroudLightGrey,
    width: calcWidth(70),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: calcHeight(18),
  },
  progressContainerSegmentedMiddle: {
    flexDirection: 'row',
    height: calcHeight(15),
    backgroundColor: backgroudLightGrey,
    width: calcWidth(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainerSegmentedRed: {
    flexDirection: 'row',
    height: calcHeight(15),
    backgroundColor: backgroudLightRed,
    width: calcWidth(70),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: calcHeight(18),
  },
  progressContainerSegmentedRedMiddle: {
    flexDirection: 'row',
    height: calcHeight(15),
    backgroundColor: backgroudLightRed,
    width: calcWidth(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxSegmented: {
    width: '100%',
    height: calcHeight(9),
    marginVertical: calcHeight(20),
    borderColor: primaryGrey,
    borderWidth: calcWidth(1),
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: calcHeight(22),
  },
  bottomSegmented: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: calcHeight(22),
  },
  textKg: {
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
    color: primaryBlack,
  },
  bottomText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
    color: red,
  },
  blueTextKg: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'regular',
    }),
    color: primaryBlue,
  },
});
