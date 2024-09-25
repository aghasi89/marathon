import {StyleSheet} from 'react-native';
import {
  primaryBlack,
  primaryBlue,
  primaryWhite,
  robinEggBlue,
} from '../../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: primaryWhite,
  },
  titleContainer: {
    paddingHorizontal: calcWidth(16),
    marginTop: calcHeight(16),
  },
  progressBarContainer:{
    marginTop:calcHeight(16)
  },
  titleText: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'bold',
    }),
    color: primaryBlack,
  },
  buttonContainer: {
    paddingVertical: calcHeight(0),
    marginTop: calcHeight(24),
    marginHorizontal: calcWidth(16),
  },
  startButtonText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'medium',
    }),
    marginVertical: calcHeight(14),
  },
  descriptionContainer: {
    paddingHorizontal: calcWidth(16),
  },
  chipsContainer: {
    paddingVertical: calcHeight(24),
  },
  chipItem: {
    borderWidth: calcWidth(1),
    borderColor: robinEggBlue,
  },
  fierIconStyle: {
    height: calcHeight(20),
    width: calcWidth(16),
    fill: primaryBlue,
  },
  selectButtonsContainer: {
    paddingVertical: calcHeight(24),
    paddingHorizontal: calcWidth(16),
  },
  selectButton: {
    marginTop: calcHeight(16),
  },
  exercisesListContainer: {
    marginTop: calcHeight(24),
  },
  exerciseItemContainer: {
    marginVertical: calcHeight(8),
  },
  exercisesTitle: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'bold',
    }),
    color: primaryBlue,
    marginBottom: calcHeight(8),
  },
});

export default styles;
