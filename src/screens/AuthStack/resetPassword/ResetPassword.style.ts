import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../../assets/dimensions';
import { primaryBlack, red, primaryWhite } from '../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
    paddingHorizontal: calcWidth(24),
  },
  backButton: {
    paddingVertical: calcHeight(30),
    paddingRight: calcWidth(30)
  },
  bodyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: calcHeight(-50)
  },
  buttonStyle: {
    width: '100%',
    height: calcHeight(55),
    marginTop: calcHeight(30),
  },
  middleComponent: {
    width: '100%',
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
  signInText: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'body',
      weight: 'medium',
    }),
  },
  signInButton: {
    marginLeft: calcWidth(16)
  },
  rowContainer: {
    flexDirection: "row",
    marginTop: calcHeight(15),
    justifyContent: "center",
  },
  resetPasspordDescription: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'legal',
      weight: 'medium',
    }),
    textAlign: "center",
    marginVertical: calcHeight(30)
  }
});
export default styles;
