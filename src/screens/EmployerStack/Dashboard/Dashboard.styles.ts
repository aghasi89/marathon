import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../assets/dimensions';
import {primaryWhite} from '../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite,
    paddingBottom: calcHeight(100),
  },
  headerContainer: {
    position: 'relative',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: calcHeight(23),
    position: 'absolute',
    width: '100%',
  },
  headerPart: {
    flexDirection: 'column',
    height: calcHeight(110),
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: primaryWhite,
    ...EnCodeSans({
      weight: 'medium',
      size: 'headline',
    }),
  },
  headerCountTextLeft: {
    color: primaryWhite,
    ...EnCodeSans({
      weight: 'medium',
      size: 'headline1',
    }),
  },
  headerTextLeft: {
    color: primaryWhite,
    ...EnCodeSans({
      weight: 'medium',
      size: 'little',
    }),
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icons: {
    paddingLeft: calcWidth(14),
  },
  headerCountTextRight: {
    color: primaryWhite,
    textAlign: 'right',
    ...EnCodeSans({
      weight: 'medium',
      size: 'headline1',
    }),
  },
  headerTextRight: {
    color: primaryWhite,
    textAlign: 'right',
    ...EnCodeSans({
      weight: 'medium',
      size: 'little',
    }),
  },
  progtess: {
    paddingTop: calcHeight(30),
  },
  processItem: {
    margin: calcWidth(10),
  },
  progressStyle: {
    height: calcHeight(120),
    width: calcWidth(120),
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentText: {
    ...EnCodeSans({
      size: 'headline1',
      weight: 'medium',
    }),
    color: primaryWhite,
  },
  plusButton: {
    position: 'absolute',
    right: calcWidth(17),
    bottom: calcHeight(26),
  },
});

export default styles;
