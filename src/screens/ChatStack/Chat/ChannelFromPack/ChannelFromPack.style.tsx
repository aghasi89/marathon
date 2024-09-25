import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
import {
  primaryBlack,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: calcWidth(25),
    paddingTop: calcHeight(20),
    backgroundColor: primaryWhite,
    paddingBottom: calcHeight(85),
  },
  middleContainer: {
    paddingVertical: calcWidth(15),
  },
  flatlist: {
    justifyContent: 'space-between',
  },
  switchContainer: {
    maxWidth: calcWidth(344),
    marginBottom: calcHeight(10),
  },
  switchSelectedText: {
    color: primaryWhite,
  },
  iconStyle: {
    height: calcHeight(20),
    width: calcWidth(20),
    marginRight: calcHeight(5),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: calcWidth(15),
    alignItems: 'center',
  },
  headerText: {
    ...EnCodeSans({
      size: 'headline',
      weight: 'medium',
    }),
    color: primaryBlack,
    textAlign: 'center',
  },
  backIconContainer: {
    paddingLeft: calcHeight(10),
  },
});
export default styles;
