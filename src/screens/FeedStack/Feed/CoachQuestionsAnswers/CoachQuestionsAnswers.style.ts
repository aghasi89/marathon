import {StyleSheet} from 'react-native';
import {
  lightPeriwinkles,
  primaryBlue,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:primaryWhite
  },
  headerContainer: {
    marginVertical: calcHeight(22),
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',    
  },
  infoContainer: {
    marginTop: calcHeight(24),
    paddingHorizontal: calcWidth(16),
  },
  text: {
    ...EnCodeSans({
      size: 'body',
      weight: 'bold',
    }),
    color: lightPeriwinkles,
  },
  buttons: {
    position: 'absolute',
    bottom: calcHeight(20),
    flexDirection: 'row',
    left: calcWidth(16),
    right: calcWidth(16),
  },
  applyButton: {
    backgroundColor: primaryBlue,
    flex: 1,
    borderRadius: 8,
    borderWidth: calcHeight(2),
    borderColor: primaryBlue,
    paddingVertical:calcHeight(10)
  },
  backButton: {
    backgroundColor: primaryWhite,
    flex: 1,
    borderRadius: 8,
    borderWidth: calcHeight(2),
    paddingVertical:calcHeight(10)
  },
  backButtonText:{
    color:lightPeriwinkles
  },
  emptyView: {
    width: calcWidth(16),
  },
  
});
export default styles;
