import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';
import {
  borderGrey,
  primaryBlack,
  primaryBlue,
  primaryLightBlue,
} from '../../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: calcWidth(10),
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerWithImageContainer: {
    height: calcHeight(350),
    width: '100%',
  },
  title: {
    ...EnCodeSans({
      weight: 'regular',
      size: 'form-field',
    }),
    color: primaryBlack,
  },
  paragraphTitle: {
    ...EnCodeSans({
      weight: 'semibold',
      size: 'headline',
    }),
    color: primaryLightBlue,
    textAlign: 'left',
    width: '100%',
    marginVertical: calcHeight(30),
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: calcHeight(20),
    alignItems: 'center',
    paddingHorizontal: calcWidth(30),
  },
  line: {
    height: calcHeight(36),
    width: 1,
    backgroundColor: '#E3ECFD',
  },
  chipsgroup: {
    height: calcHeight(60),
    marginVertical: calcHeight(15),
  },
  bottomStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: calcHeight(120),
    paddingTop: calcHeight(43),
  },
  bottomText: {color: '#589CFE', marginVertical: calcHeight(5)},
  leftComponentStyle: {
    marginLeft: -calcWidth(27),
  },
  touch: {
    height: calcHeight(50),
    width: calcHeight(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    height: calcHeight(30),
    width: calcHeight(30),
    borderRadius: calcHeight(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedStyle: {
    backgroundColor: primaryBlue,
  },
  disSelectedTouch: {
    borderColor: borderGrey,
    borderWidth: 1,
  },
  titleText: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    paddingLeft: calcWidth(30),
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    paddingHorizontal: calcWidth(15),
  },
});
export default styles;
