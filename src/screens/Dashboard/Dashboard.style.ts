import { StyleSheet } from 'react-native';
import { calcHeight } from '../../assets/dimensions';
import { primaryBlue } from '../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end"
  },
  button: {
    backgroundColor: primaryBlue,
    height: calcHeight(50),
    alignItems: "center",
    justifyContent: "center"
  }
});
export default styles;
