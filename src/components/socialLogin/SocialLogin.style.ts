import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../assets/dimensions';
import { primaryBlack, primaryGrey, primaryWhite } from '../../assets/styles/colors.styles';
import { EnCodeSans } from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    marginTop: calcHeight(32),
    alignItems: "center",
    backgroundColor: primaryWhite
  },
  rowContainer: {
    flexDirection: "row",
    marginTop: calcHeight(15)
  },
  title: {
    ...EnCodeSans({
      size: 'subtitle',
      weight: 'regular',
    }),
    color: primaryBlack
  },
  socialButton: {
    paddingHorizontal: calcWidth(30),
    paddingVertical: calcHeight(10),
    borderRadius: calcWidth(30),
    backgroundColor: primaryWhite,
    shadowColor: primaryBlack,
    elevation: 20,
  }
});
export default styles;
