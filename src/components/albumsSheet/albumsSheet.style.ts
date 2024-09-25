import {Platform, StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';

const styles = StyleSheet.create({
  scrollview: {
    width: '100%',
    height: '80%',
    paddingBottom: Platform.OS == 'android' ? calcHeight(60) : calcHeight(20),
    paddingHorizontal: calcWidth(16),
  },
  containerStyle: {
    // paddingBottom: calcHeight(10),
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default styles;
