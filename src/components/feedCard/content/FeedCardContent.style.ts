import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {},
  traningInfoContainer: {
    marginHorizontal: calcWidth(16),
    marginBottom: calcHeight(15),
    marginTop: calcHeight(10),
  },
  buttonsGroupContainer: {
    marginHorizontal: calcWidth(16),
    marginBottom: calcHeight(15),
  },
});

export default styles;
