import { StyleSheet } from 'react-native';
import { lightPeriwinkles, primaryBlack, primaryBlue, primaryWhite } from '../../../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';
import { EnCodeSans } from '../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite
  },
  description: {
    textAlign: "center"
  },
  element: {
    borderColor: lightPeriwinkles,
    borderWidth: 1,
    paddingVertical: calcHeight(12),
    paddingHorizontal: calcWidth(26),
    borderRadius: calcWidth(47),
    marginTop: calcHeight(16),
    flexDirection: "row",
    alignItems: "center"
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
  backButton: {
    backgroundColor: primaryWhite,
    paddingVertical: calcHeight(8),
    marginTop: calcHeight(16),
    width: calcWidth(100),
    marginRight: calcWidth(20)
  },
  button: {
    justifyContent: "flex-end",
    flexDirection: "row"
  },
  image: {
    height: calcHeight(24),
    width: calcHeight(24),
    marginRight: calcWidth(12)
  }
});
export default styles;
