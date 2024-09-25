import { StyleSheet } from 'react-native';
import { primaryBlue, primaryWhite, red } from '../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
    paddingHorizontal: calcWidth(24),
    paddingTop: calcHeight(30)
  },
  button: {
    backgroundColor: primaryBlue,
    marginTop: calcHeight(24)
  },
  input: {
    marginBottom: 0,
    marginTop: calcHeight(24)
  },
  errorMesageText: {
    color: red,
    ...EnCodeSans({
      size: 'legal',
      weight: 'medium',
    }),
    marginBottom: calcHeight(15),
    marginTop: calcHeight(5),
    marginLeft: calcWidth(21)
  },
  closeButton: {
    alignItems: "flex-end"
  }
});
export default styles;
