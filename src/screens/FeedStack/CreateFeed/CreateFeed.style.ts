import { Platform, StyleSheet } from 'react-native';
import { primaryWhite } from '../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
},
  coverContainer: {
    marginTop: calcHeight(23)
  },
  progressStepsContainer: {
    marginTop: calcHeight(14),
    paddingHorizontal: calcWidth(16)

  },
  sectionTitles: {
    marginVertical: calcHeight(24)
  },
  contextCardContainer: {
    marginTop: calcHeight(24)
  },
  createContextCatrdButtonsContainer: {
    marginTop: calcHeight(24)
  },  
});

export default styles;
