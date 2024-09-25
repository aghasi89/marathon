import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
import {
  borderGrey,
  formFieldGrey,
  primaryBlue,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: calcWidth(8),
    backgroundColor: primaryWhite,
  },
  title: {
    ...EnCodeSans({size: 'body', weight: 'semibold'}),
    marginHorizontal: calcWidth(15),
  },
  segmentedHeaderContainer: {
    paddingHorizontal: calcWidth(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: calcWidth(0.8),
    borderBottomColor: 'rgba( 0 , 0 , 0 , 0.05 )',
  },
  contentContainer: {
    justifyContent: 'space-between',
  },
  contentContainerManual: {
    justifyContent: 'space-between',
    marginVertical: calcHeight(74),
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: calcHeight(18),
  },
  weekContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: calcHeight(10),
  },
  countText: {
    ...EnCodeSans({size: 'legal', weight: 'regular'}),
    color: formFieldGrey,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  circles: {
    height: calcHeight(42),
    width: calcHeight(42),
    borderRadius: calcHeight(50),
    borderWidth: calcWidth(1),
    borderStyle: 'solid',
    borderColor: borderGrey,
    justifyContent: 'center',
    alignItems: 'center',
    margin: calcHeight(6),
  },
  circlesOutline: {
    height: calcHeight(52),
    width: calcHeight(52),
    borderRadius: calcHeight(50),
    borderWidth: calcWidth(3),
    borderStyle: 'solid',
    borderColor: primaryWhite,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primaryBlue,
  },
  circlesInner: {
    height: calcHeight(42),
    width: calcHeight(42),
    borderRadius: calcHeight(50),
    borderWidth: calcWidth(1),
    borderStyle: 'solid',
    borderColor: primaryWhite,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primaryBlue,
  },
  weekCircles: {
    height: calcHeight(45),
    width: calcHeight(48),
    borderRadius: calcHeight(20),
    borderWidth: calcWidth(1),
    borderStyle: 'solid',
    borderColor: borderGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startEndContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: calcHeight(18),
  },
  start: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default styles;
