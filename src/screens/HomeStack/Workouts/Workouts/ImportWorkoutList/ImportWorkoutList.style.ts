import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../assets/dimensions';
import {primaryWhite} from '../../../../../assets/styles/colors.styles';
const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite,
    flex: 1,
    paddingHorizontal: calcWidth(10),
  },
  listContainer: {
    width: '100%',
    justifyContent: 'space-between',
    height: '100%',
    paddingBottom: calcHeight(80),
  },
  submited: {
    width: '100%',
    marginVertical: calcHeight(10),
  },
});
export default styles;
