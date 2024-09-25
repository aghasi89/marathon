import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  formFieldGrey,
  green,
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
import {borderStyle} from '../../assets/styles/global.styles';

const styles = StyleSheet.create({
  container: {
    ...borderStyle({
      size: 25,
      type: 'default',
    }),
    backgroundColor: primaryWhite,
    width: '100%',
    paddingHorizontal: calcWidth(15),
    paddingVertical: calcHeight(15),
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomContainer: {
    flexDirection: 'row',
    marginTop: calcHeight(20),
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressStyle: {
    height: calcHeight(32),
    width: calcHeight(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: calcHeight(40),
    height: calcHeight(40),
    borderRadius: calcHeight(20),
  },
  textTitle: {
    ...EnCodeSans({
      size: 'body',
      weight: 'medium',
    }),
    color: primaryBlack,
    marginLeft: calcWidth(11),
  },
  textTime: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'medium',
    }),
    color: formFieldGrey,
  },
  textRestTime: {
    ...EnCodeSans({
      size: 'body',
      weight: 'medium',
    }),
    color: primaryBlue,
  },
  textKCal: {
    ...EnCodeSans({
      size: 'body',
      weight: 'medium',
    }),
    color: green,
    marginLeft: calcWidth(18),
  },
  circle: {
    backgroundColor: primaryBlue,
    height: calcHeight(32),
    width: calcHeight(32),
    borderRadius: calcHeight(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
