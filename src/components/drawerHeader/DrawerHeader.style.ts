import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../assets/dimensions';
import { EnCodeSans } from '../../assets/styles/fonts.styles';
import { borderGrey, primaryBlack, primaryGrey, primaryWhite } from '../../assets/styles/colors.styles';

const style = StyleSheet.create({
  title: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'bold',
    }),
    color: primaryBlack
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: primaryWhite,
    paddingHorizontal: calcWidth(16),
    borderBottomColor: borderGrey,
    borderBottomWidth: calcHeight(1),
  },
  arrowIcon: {
    paddingVertical: calcHeight(16),
    paddingRight: calcHeight(25)
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  menuIcon: {
    paddingVertical: calcHeight(16),
    paddingLeft: calcHeight(16),
  },
  logoIcon: {
    // marginVertical: calcHeight(18)
  }
});

export default style;
