import {StyleSheet} from 'react-native';
import {primaryWhite} from '../../../../../../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  contentContainer: {
    paddingHorizontal: calcWidth(20),
    paddingBottom: calcHeight(15),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: calcHeight(50),
    alignItems: 'center',
  },
});
export default styles;
