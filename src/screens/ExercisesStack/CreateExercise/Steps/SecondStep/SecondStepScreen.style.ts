import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
  sectionTitles: {
    paddingHorizontal: calcWidth(16),
    marginBottom: calcHeight(16),
    marginTop: calcHeight(10)
  },
  padding: {
    paddingHorizontal: calcWidth(16)
  },
  secondSection: {
    marginTop: calcHeight(30)
  }
});
export default styles;
