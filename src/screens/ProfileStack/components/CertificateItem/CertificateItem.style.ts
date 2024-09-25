import { Platform, StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    borderRadius: calcWidth(16),
    backgroundColor: "#F0F6FE",
    paddingBottom: calcHeight(10),
    height: calcHeight(192),
    marginLeft: calcWidth(16),
    marginBottom: calcHeight(20),
  },
  imageStyle: {
    height: calcHeight(111),
    width: "100%",
    borderTopLeftRadius: calcWidth(16),
    borderTopRightRadius: calcWidth(16)
  },
  description: {
    width: "100%",
    marginTop: calcHeight(8),
    marginLeft: calcWidth(12)
  }
});
export default styles;