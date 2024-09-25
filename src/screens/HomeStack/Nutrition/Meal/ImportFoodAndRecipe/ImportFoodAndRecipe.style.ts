import {StyleSheet} from 'react-native';
import {calcHeight} from '../../../../../assets/dimensions';
import {primaryWhite} from '../../../../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite,
    flex: 1,
  },
  dataItem: {
    marginVertical: calcHeight(15),
  },
});
export default styles;
