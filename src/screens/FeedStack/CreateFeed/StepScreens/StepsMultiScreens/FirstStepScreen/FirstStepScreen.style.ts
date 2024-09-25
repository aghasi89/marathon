import { StyleSheet } from 'react-native';
import { lightSteelBlue, transparentBlack } from '../../../../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: transparentBlack
  },
  progressBarContainer: {
    marginTop: calcHeight(16)
  },
  scrollContainer: {
    paddingHorizontal: calcWidth(16),
    flexGrow: 1,
  },
  coverContainer: {
    marginTop: calcHeight(23),
  },
  sectionTitles: {
    marginVertical: calcHeight(24),
  },
  contextCardContainer: {
    marginTop: calcHeight(24),
  },
  createContextCatrdButtonsContainer: {
    marginTop: calcHeight(24),
  },
  selectInputIconStyle: {
    height: calcHeight(16),
    width: calcWidth(16),
    fill: lightSteelBlue,
  },
  selectInputContainer: {
    marginBottom: calcHeight(16),
  },
  descriptionInput: {
    minHeight: calcHeight(90),
    maxHeight: calcHeight(180),
    alignItems: 'flex-start',
  },
  contentCards: {
    marginTop: calcHeight(35)
  }
});
export default styles;
