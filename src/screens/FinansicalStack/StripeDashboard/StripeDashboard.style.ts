import { StyleSheet } from 'react-native';
import { calcHeight } from '../../../assets/dimensions';
import { primaryWhite } from '../../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
    paddingBottom: calcHeight(10),
  },
  webView: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  activityContainer: {
    flex: 1,
    zIndex: 5,
    position: 'absolute',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
