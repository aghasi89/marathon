import { StyleSheet } from 'react-native';
import { primaryBlue, primaryWhite } from '../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow:1,
    backgroundColor: primaryWhite
  },
  progressStepsContainer: {
    marginVertical: calcHeight(16)
  },
  body: {
    paddingHorizontal: calcWidth(16)
  },
  buttons: {
    position: "absolute",
    bottom: calcHeight(20),
    flexDirection: "row",
    left: calcWidth(16),
    right: calcWidth(16)
  },
  applyButton: {
    backgroundColor: primaryBlue,
    flex: 1,
    borderRadius: 8
  },
  backButton: {
    backgroundColor: primaryWhite,
    flex: 1,
    borderRadius: 8
  },
  emptyView: {
    width: calcWidth(16)
  }, 
  scroll:{
    flexGrow:1
  }
});
export default styles;
