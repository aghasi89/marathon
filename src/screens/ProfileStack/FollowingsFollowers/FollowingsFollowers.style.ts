import { StyleSheet } from 'react-native';
import { primaryWhite } from '../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite
  },
  subContainer: {
    paddingHorizontal: calcWidth(24),
  },
  usersList: {
    marginTop: calcHeight(15),
    marginBottom: calcHeight(70),
  },
  loadingContainer: {
    flex: 1,
    marginTop: calcHeight(50)
  }
});
export default styles;
