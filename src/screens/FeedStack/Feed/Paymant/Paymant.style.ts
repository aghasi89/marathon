import { Platform, StyleSheet } from 'react-native';
import { primaryWhite } from '../../../../assets/styles/colors.styles';
import { calcHeight } from '../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
    backgroundColor: primaryWhite
  },
  loader: {
    flex: 1,
    backgroundColor: 'rgba(225,225,225,0.5)'
  },
  header: {
    marginTop: Platform.OS == 'android' ? 0 : calcHeight(25)
  }
});

export default styles