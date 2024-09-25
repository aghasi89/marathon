import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../../assets/dimensions';
import { primaryBlack, primaryBlue, primaryWhite, robinEggBlue } from '../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite
  },
  threeDots: {
    paddingLeft: calcWidth(16),
  },
  descriptionContainer: {
    paddingHorizontal: calcWidth(16),
  },
  chipsContainer: {
    paddingVertical: calcHeight(24)
  },
  chipItem: {
    borderWidth: calcWidth(1),
    borderColor: robinEggBlue
  },
  bodyPartsTitle: {
    color: primaryBlue,
    ...EnCodeSans({
      size: 'form-field',
      weight: 'bold',
    })
  },
  bodyPartsContainer: {
    marginTop: calcHeight(20),
    marginBottom: calcHeight(-40),
    paddingLeft: calcWidth(16)
  },
  scrollContainer: {
    flex: 1,
  },
  cardItemContainer: {
    marginVertical: calcWidth(16),
  },
  actionSheetIcon: {
    height: calcHeight(12),
    width: calcWidth(12),
    fill: primaryBlack,
  },
  equipmentTitle: {
    marginTop: calcHeight(24),
    marginLeft: calcWidth(16)
  }
});
export default styles;
