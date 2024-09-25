import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';
import {
  lightPeriwinkles,
  primaryBlack,
  primaryBlue,
  primaryWhite,
  red,
  workoutBlue,
} from '../../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../../assets/styles/fonts.styles';

export const styles = StyleSheet.create({
  container: {
    width: calcWidth(150),
    paddingVertical: calcHeight(15),
    backgroundColor: workoutBlue,
  },
  detailsContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'legal',
      weight: 'bold',
    }),
  },
  footerIcon: {
    height: calcHeight(14),
    width: calcWidth(14),
    fill: red,
  },
  timeTextStyle: {
    ...EnCodeSans({
      size: 'subText',
      weight: 'regular',
    }),
    color: lightPeriwinkles,
    marginLeft: calcHeight(5),
  },
  button: {
    paddingVertical: calcWidth(5),
    backgroundColor: primaryBlue,
    borderRadius: calcHeight(25),
    marginHorizontal: calcHeight(20),
    marginTop: calcHeight(10),
  },
  circle: {
    width: calcHeight(25),
    height: calcHeight(25),
    backgroundColor: primaryWhite,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: calcHeight(12),
    marginRight: calcHeight(5),
  },
  joinText: {
    textAlign: 'center',
    color: primaryWhite,
  },
});
