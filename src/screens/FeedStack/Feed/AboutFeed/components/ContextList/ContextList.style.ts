import {StyleSheet} from 'react-native';
import {calcHeight} from '../../../../../../assets/dimensions';

const style = StyleSheet.create({
  imageStyle: {
    resizeMode: 'cover',
  },
  progressBarContainer: {
    marginTop: calcHeight(16),
  },
  rowContainer: {
    marginTop: calcHeight(24),
  },
});
export default style;
