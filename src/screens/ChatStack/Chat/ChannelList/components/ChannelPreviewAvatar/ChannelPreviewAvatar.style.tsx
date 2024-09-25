import {StyleSheet} from 'react-native';
import {calcHeight} from '../../../../../../assets/dimensions';

const styles = StyleSheet.create({
  image: {
    width: calcHeight(52),
    height: calcHeight(52),
    borderRadius: calcHeight(100),
  },
  imageContainer: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
export default styles;
