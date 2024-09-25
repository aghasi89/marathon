import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';
import { lightSteelBlue } from '../../../../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  selectInputIconStyle: {
    height: calcHeight(16),
    width: calcWidth(16),
    fill: lightSteelBlue
  },
  selectInputContainer: {
    marginBottom: calcHeight(16),
  },
  horizontal: {
    paddingHorizontal: calcWidth(16)
  },
  musclesContainer: {
    marginBottom: calcHeight(30),
    flex:1,
    
  },
  sectionTitles: {
    paddingHorizontal: calcWidth(16),
    marginBottom: calcHeight(16),
  },
  equipmentContainer: {
  }
});
export default styles;
