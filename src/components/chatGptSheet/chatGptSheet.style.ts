import { Platform, StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../assets/dimensions';

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    marginTop: calcHeight(10),
  },
  scrollview: {
    width: '100%',
    height: Platform.OS == 'ios' ? calcHeight(270) : calcHeight(500),
    paddingBottom:Platform.OS == 'android' ? calcHeight(60) : calcHeight(20),
    paddingHorizontal: calcWidth(16),
  },
  icon: {
    height: calcHeight(23),
    width: calcWidth(23),
    marginRight: calcWidth(10),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerStyle: {
    paddingBottom: calcHeight(20)
  }
});

export default styles;
