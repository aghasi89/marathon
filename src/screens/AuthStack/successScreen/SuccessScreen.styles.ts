import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../../assets/dimensions';
import { primaryBlack, primaryWhite } from '../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
    paddingHorizontal: calcWidth(24),
  },
  backButton: {
    paddingTop: calcHeight(30),
    paddingRight: calcWidth(30)
  },
  bodyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: calcHeight(-25)
  },
  buttonStyle: {
    width: '100%',
    height: calcHeight(55),
    marginTop: calcHeight(40),
  },
  middleComponent: {
    width: '100%',
  },
  resetPasspordDescription: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'legal',
      weight: 'medium',
    }),
    textAlign: "center",
    marginVertical: calcHeight(30)
  },
  email: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'body',
      weight: 'medium',
    }),
    textAlign: "center",
    marginTop: calcHeight(50)
  }
});
export default styles;
