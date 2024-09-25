import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {green, primaryBlack} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  circleStyle: {
    height: calcHeight(38),
    width: calcHeight(38),
    borderRadius: calcHeight(19),
    borderWidth: 1,
    borderColor: green,
    justifyContent: 'center',
  },
  percentText: {
    ...EnCodeSans({
      size: 'little',
      weight: 'medium',
    }),
    color: primaryBlack,
  },
  titleText: {
    ...EnCodeSans({
      size: 'subtitle',
      weight: 'medium',
    }),
    color: primaryBlack,
  },
  pieChart: {
    height: calcHeight(32),
  },
  bottomContainer: {
    marginLeft: calcWidth(15),
  },
  rowContainer: {flexDirection: 'row'},
});
