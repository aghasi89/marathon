import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../../../assets/dimensions';
import {
  chatSearchBorder,
  primaryBlack,
  primaryWhite,
  shadowPrimaryBlue,
} from '../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  searchInputContainer: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: chatSearchBorder,
    minHeight: calcHeight(48),
    marginHorizontal: calcWidth(16),
    marginTop: calcHeight(8)
  },
  searchInput: {
    paddingLeft: calcWidth(8),
  },
  usersList: {
    paddingHorizontal: calcWidth(16),
    marginTop: calcHeight(15),
    marginBottom: calcHeight(70)
  },
});
export default styles;
