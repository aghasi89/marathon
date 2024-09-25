import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../../../assets/dimensions';
import { primaryBlack } from '../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: calcWidth(24),
    paddingVertical: calcHeight(15),
    width: "100%"
  },
  title: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    })
  },
  // backButton: {
  //   paddingRight: calcWidth(20),
  // }
});
export default styles;
