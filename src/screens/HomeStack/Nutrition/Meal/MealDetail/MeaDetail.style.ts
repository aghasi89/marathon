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
  leftComponentStyle: {
    marginLeft: -calcWidth(17),
  },
  icon: {
    paddingHorizontal: calcWidth(15),
  },
  scrollViewContainer: {
    flexDirection: 'row',
    marginVertical: calcHeight(40),
  },
  chipsGroup: {
    height: calcHeight(60),
  },
});
export default styles;
