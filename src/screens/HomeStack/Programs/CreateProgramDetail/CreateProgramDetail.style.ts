import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
import {
  formFieldGrey,
  lightBlue,
  primaryBlack,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../assets/styles/fonts.styles';
import {borderStyle} from '../../../../assets/styles/global.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: calcWidth(5),
    marginBottom: calcHeight(20),
  },
  itemsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: calcHeight(60),
  },
  weekContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayContainer: {
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: calcWidth(10),
  },
  toDoItem: {
    marginHorizontal: calcWidth(6),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRowContainer: {
    width: '100%',
    height: calcHeight(60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: calcWidth(29),
  },
  close: {
    paddingLeft: calcWidth(27),
  },
  rowContainer: {
    width: '100%',
    height: calcHeight(70),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: calcWidth(30),
  },
  weekDayItem: {
    flexDirection: 'row',
    width: calcWidth(60),
    justifyContent: 'space-between',
  },
  outlineButtonStyle: {
    width: '90%',
    height: calcHeight(55),
    borderStyle: 'dashed',
    borderWidth: calcWidth(2),
    marginVertical: calcHeight(23),
  },
  outlineButtonText: {
    color: formFieldGrey,
  },
  leftIcon: {
    height: calcHeight(40),
    width: calcHeight(40),
    borderRadius: calcHeight(16),
    backgroundColor: lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'medium',
    }),
    color: primaryBlack,
  },
  timelineRest: {
    ...borderStyle({
      size: 35,
      type: 'default',
    }),
    backgroundColor: primaryWhite,
    width: '100%',
    paddingHorizontal: calcWidth(18),
    paddingVertical: calcHeight(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineEdit: {
    ...borderStyle({
      size: 35,
      type: 'default',
    }),
    backgroundColor: primaryWhite,
    width: '100%',
    paddingHorizontal: calcWidth(18),
    paddingVertical: calcHeight(20),
  },
  title: {
    ...EnCodeSans({
      weight: 'medium',
      size: 'form-field',
    }),
    color: primaryBlack,
  },
  weekDayItemTimeline: {
    width: '100%',
    marginVertical: calcHeight(6),
  },
  leftComponentStyle: {
    marginLeft: -calcWidth(17),
  },
  iconStyle: {
    paddingHorizontal: calcWidth(15),
  },
  dailyContainer: {
    flex: 1,
    backgroundColor: primaryWhite,
    height: '100%',
  },
});
export default styles;
