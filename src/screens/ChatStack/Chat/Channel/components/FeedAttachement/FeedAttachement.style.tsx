import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';
import {
  lightPeriwinkles,
  primaryBlack,
  workoutBlue,
} from '../../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../../assets/styles/fonts.styles';

export const styles = StyleSheet.create({
  container: {
    width: calcWidth(270),
    flexDirection: 'row',
    padding: calcHeight(8),
    backgroundColor: workoutBlue,
  },
  detailsContainer: {
    paddingLeft: calcHeight(10),
    paddingVertical: calcHeight(5),
    justifyContent: 'space-between',
  },
  thumbnail: {
    height: calcHeight(75),
    width: calcWidth(100),
    borderRadius: calcHeight(10),
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
    fill: lightPeriwinkles,
  },
  timeIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: calcWidth(5),
  },
  timeTextStyle: {
    ...EnCodeSans({
      size: 'subText',
      weight: 'regular',
    }),
    color: lightPeriwinkles,
    marginLeft: calcHeight(5),
  },
  emptyView: {
    marginHorizontal: calcWidth(10),
  },
});
