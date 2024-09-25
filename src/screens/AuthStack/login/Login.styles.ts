import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../../assets/dimensions';
import { primaryBlue, primaryBlack, lighBlack, red, primaryWhite } from '../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
    paddingHorizontal: calcWidth(24),
  },
  body: {
    flex: 1,
    alignItems: "center"
  },
  backButton: {
    paddingTop: calcHeight(30),
    paddingRight: calcWidth(30)
  },
  buttonStyle: {
    paddingVertical: calcHeight(12),
    marginTop: calcHeight(32),
  },
  inlineButtonText: {
    ...EnCodeSans({
      size: 'subText',
      weight: 'medium',
    }),
    color: lighBlack,
    textAlign: 'center',
    paddingBottom: calcHeight(2),
  },
  lighBlack: {
    color: primaryBlack,
    letterSpacing: calcHeight(0.16),
  },
  blueText: {
    color: primaryBlue,
    letterSpacing: calcHeight(0.2),
  },
  bottomSheet: {
    alignItems: 'center',
    paddingHorizontal: calcWidth(20),
    marginTop: calcHeight(40),
    marginBottom: calcHeight(20)
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
    marginLeft: calcWidth(21),
    marginBottom: calcHeight(15),
    marginTop: calcHeight(5),
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
    marginTop: calcHeight(15)
  },
  inlineButton: {
    alignItems: "flex-end",
    marginTop: calcHeight(16)
  },
  closeButton: {
    alignItems: "flex-end",
    paddingVertical: calcHeight(20),
  }
});
export default styles;
