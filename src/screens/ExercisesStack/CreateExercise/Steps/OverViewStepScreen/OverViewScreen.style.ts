import { StyleSheet } from 'react-native';
import { lightPeriwinkle, primaryBlack, primaryBlue, primaryWhite, robinEggBlue } from '../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite
  },
  progressBarContainer:{
    marginTop:calcHeight(16)
  },
  titleContainer: {
    paddingHorizontal: calcWidth(16),
    marginTop: calcHeight(16)
  },
  titleText: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'bold'
    }),
    color: primaryBlack
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
  fierIconStyle: {
    height: calcHeight(20),
    width: calcWidth(16),
    fill: primaryBlue
  },
  selectButtonsContainer: {
    paddingVertical: calcHeight(24),
    paddingHorizontal: calcWidth(16),
    marginBottom: calcHeight(60)
  },
  selectButton: {
    marginTop: calcHeight(16)
  }
});

export default styles