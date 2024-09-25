import { StyleSheet } from 'react-native';
import { lightPeriwinkles, primaryBlack, primaryBlue, primaryWhite } from '../../../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';
import { EnCodeSans } from '../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite
  },
  element: {
    borderColor: lightPeriwinkles,
    borderWidth: 1,
    paddingVertical: calcHeight(12),
    paddingHorizontal: calcWidth(26),
    borderRadius: calcWidth(47),
    marginTop: calcHeight(16),
  },
  text: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
  },
  applyButton: {
    backgroundColor: primaryBlue,
    paddingVertical: calcHeight(8),
    marginTop: calcHeight(16),
  },
  button: {
    alignItems: "flex-end"
  }
});
export default styles;
