import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
import {
  borderGrey,
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite,
    flex: 1,
  },
  item: {
    marginVertical: calcHeight(15),
  },
  contentContainer: {
    paddingHorizontal: calcWidth(10),
    paddingTop: calcHeight(30),
  },
  workoutItem: {
    width: '100%',
    marginVertical: calcHeight(11),
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
  bottomStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: calcHeight(120),
    paddingTop: calcHeight(43),
  },
  bottomText: {
    color: primaryBlue,
    marginVertical: calcHeight(5),
  },
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
    borderWidth: calcWidth(1),
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
  sliderContainer: {
    width: '100%',
    paddingVertical: calcHeight(24),
  },
  timeContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: calcWidth(10),
    height: calcHeight(50),
  },
  text: {
    ...EnCodeSans({
      weight: 'regular',
      size: 'body',
    }),
    color: primaryBlack,
  },
});

export default styles;
