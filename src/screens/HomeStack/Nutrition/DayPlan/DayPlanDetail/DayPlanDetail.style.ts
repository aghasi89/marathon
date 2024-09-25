import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../assets/dimensions';
import {primaryBlack} from '../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: calcWidth(20),
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
  dropContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: calcHeight(27),
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: calcHeight(17),
  },
  chipsGroup: {
    height: calcHeight(60),
  },
  icon: {
    marginRight: calcWidth(10),
  },
  dayPlanList: {
    flexDirection: 'row',
    marginTop: calcHeight(40),
  },
  dayPlanItem: {
    marginHorizontal: calcWidth(9),
  },
  leftComponentStyle: {
    marginLeft: -calcWidth(17),
  },
});
export default styles;
