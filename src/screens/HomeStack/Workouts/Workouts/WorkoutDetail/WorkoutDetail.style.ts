import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../assets/dimensions';
import {
  primaryBlack,
  primaryBlue,
  primaryLightBlue,
} from '../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: calcWidth(10),
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
  bottomText: {color: primaryBlue, marginVertical: calcHeight(5)},
  leftComponentStyle: {
    marginLeft: -calcWidth(17),
  },
  workoutItem: {
    width: '100%',
    marginVertical: calcHeight(11),
  },
  block:{
    width: calcWidth(124),
    height: calcHeight(154),
    backgroundColor: primaryBlue,
  }
});
export default styles;
