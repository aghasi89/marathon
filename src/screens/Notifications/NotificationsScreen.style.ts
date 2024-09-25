import { StyleSheet } from 'react-native';
import { primaryWhite } from '../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primaryWhite
  },
});
export default styles;
