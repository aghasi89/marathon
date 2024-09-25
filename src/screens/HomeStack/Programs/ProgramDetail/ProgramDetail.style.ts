import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
import {primaryBlack} from '../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
  },
  paragraphContainer: {
    paddingHorizontal: calcWidth(20),
    marginBottom: calcHeight(20),
  },
  headerWithImageContainer: {
    height: calcHeight(350),
    width: '100%',
  },
  title: {
    ...EnCodeSans({
      weight: 'medium',
      size: 'form-field',
    }),
    color: primaryBlack,
  },
  leftComponentStyle: {
    marginLeft: -calcWidth(17),
  },
  chips: {
    height: calcHeight(70),
  },

  iconStyle: {
    paddingHorizontal: calcWidth(15),
  },

  segmentedHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginRight: calcWidth(25),
    borderBottomWidth: calcWidth(0.8),
    borderBottomColor: 'rgba( 0 , 0 , 0 , 0.05 )',
  },
  scrollViewHeaderContainer: {
    width: '100%',
    height: calcHeight(60),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: calcWidth(10),
  },
  scroloViewHeaderItem: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
export default styles;
