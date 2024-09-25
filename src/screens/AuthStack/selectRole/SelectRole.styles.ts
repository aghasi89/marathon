import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../../assets/dimensions';
import { primaryBlack, primaryBlue, primaryWhite } from '../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
    paddingHorizontal: calcWidth(24),
  },
  backButton: {
    paddingTop: calcHeight(30),
    paddingHorizontal: calcWidth(24),
  },
  bodyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: calcHeight(-25)
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  middleComponent: {
    width: '100%',
  },
  selectRoleDescription: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'legal',
      weight: 'medium',
    }),
    textAlign: "center",
    marginVertical: calcHeight(30)
  },
  button: {
    paddingVertical: calcHeight(25),
    paddingHorizontal: calcWidth(25),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primaryWhite,
    shadowColor: primaryBlack,
    elevation: 16,
    borderRadius: calcWidth(10),
    flex: 1
  },
  text: {
    color: primaryBlue,
    ...EnCodeSans({
      size: 'form-field',
      weight: 'semibold',
    }),
    textAlign: "center",
    marginTop: calcHeight(7)
  }
});
export default styles;
