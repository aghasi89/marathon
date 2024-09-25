import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../../assets/dimensions';
import { primaryBlack, red, primaryWhite } from '../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';
import { borderStyle } from '../../../assets/styles/global.styles';

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
    marginTop: calcHeight(-20)
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
  resetPasspordDescription: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'legal',
      weight: 'medium',
    }),
    textAlign: "center",
    marginVertical: calcHeight(30)
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
