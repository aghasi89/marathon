import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  circleBackground,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
import {borderStyle} from '../../assets/styles/global.styles';

const styles = StyleSheet.create({
  container: {
    ...borderStyle({
      size: 35,
      type: 'default',
    }),
    backgroundColor: primaryWhite,
    width: '100%',
    paddingHorizontal: calcWidth(18),
    paddingVertical: calcHeight(20),
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
  circleContainer: {
    height: calcHeight(45),
    width: calcHeight(45),
    borderRadius: calcHeight(22),
    backgroundColor: circleBackground,
    borderWidth: calcWidth(3),
    borderColor: primaryWhite,
    marginLeft: -calcWidth(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    ...borderStyle({size: 65, type: 'outline'}),
    paddingHorizontal: calcWidth(27),
    paddingVertical: calcHeight(18),
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: calcHeight(35),
    marginLeft: calcWidth(15),
  },
  textTitile: {
    ...EnCodeSans({
      size: 'headline',
      weight: 'semibold',
    }),
    marginLeft: calcWidth(15),
  },
  text: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
  },
});
export default styles;
