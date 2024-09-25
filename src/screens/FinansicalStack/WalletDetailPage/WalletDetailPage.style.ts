import { StyleSheet } from 'react-native';
import { primaryBlack, primaryGrey, primaryWhite } from '../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../assets/dimensions';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: calcHeight(15)
  },
  bodyContainer: {
    paddingHorizontal: calcWidth(24)
  },
  lable: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
  },
  value: {
    color: primaryGrey,
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
  }
});
export default styles;
