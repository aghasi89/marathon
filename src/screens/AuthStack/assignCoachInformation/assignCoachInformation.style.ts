import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../../assets/dimensions';
import { primaryBlue, primaryBlack, lighBlack, red, primaryWhite } from '../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';
import { borderStyle } from '../../../assets/styles/global.styles';

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
  buttonStyle: {
    paddingVertical: calcHeight(12),
    marginTop: calcHeight(10),
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
    marginTop: calcHeight(45)
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
    marginTop: calcHeight(15)
  },
  bodyContainer: {
    flex: 1,
    alignItems: "center"
  },
  containerStyle: {
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    ...borderStyle({ size: 35, type: 'outline' }),
    width: '100%'
  },
  textContainerStyle: {
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopRightRadius: 35,
    borderBottomRightRadius: 35,
    borderWidth: 0,
  },
  textInputStyle: {
    padding: 0
  },
  codeTextStyle: {
    paddingLeft: calcWidth(24),
    color: primaryBlack
  }
});
export default styles;
