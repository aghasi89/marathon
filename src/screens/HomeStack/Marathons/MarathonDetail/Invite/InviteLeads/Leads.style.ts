import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';
import {primaryWhite} from '../../../../../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite,
    flex: 1,
    marginTop: calcHeight(30),
  },
  item: {
    marginHorizontal: calcWidth(10),
    marginVertical: calcHeight(7),
  },
});
export default styles;
