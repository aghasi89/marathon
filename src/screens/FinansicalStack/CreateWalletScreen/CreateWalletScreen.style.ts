import { StyleSheet } from 'react-native';
import { primaryBlack, primaryWhite } from '../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../assets/dimensions';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
    paddingHorizontal: calcWidth(16)
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: calcHeight(20),
    alignItems: "center"
  },
  closeButton: {
    paddingLeft: calcWidth(20),
  },
  title: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'form-field',
      weight: 'bold',
    }),
  },
  progressStepsContainer: {
    marginVertical: calcHeight(16)
  },
});
export default styles;
