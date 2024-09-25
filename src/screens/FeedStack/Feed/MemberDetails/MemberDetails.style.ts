import {StyleSheet} from 'react-native';
import {
  lightPeriwinkles,
  primaryBlack,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  scrollContainer: {
    height: '100%',
    paddingHorizontal: calcWidth(16),
  },
  sectionTitles: {
    marginTop: calcHeight(8),
    marginBottom: calcHeight(16),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: calcHeight(16),
  },
  measurementQuestionText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    color: primaryBlack,
  },
  measurementAnswerText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    color: lightPeriwinkles,
    marginLeft: calcWidth(4),
  },
  coachQuestionRowContainer: {
    marginBottom: calcHeight(16),
  },
  coachQuestionText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    color: primaryBlack,
    marginBottom: calcHeight(8),
  },
  coachQuestionanswerText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    color: lightPeriwinkles,
    marginLeft: calcWidth(4),
  },
});
export default styles;
