import {StyleSheet} from 'react-native';
import {lightSteelBlue} from '../../../../../../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  scrollContainer:{
    paddingTop:calcHeight(24),    
  },
  sectionTitles: {
    paddingHorizontal: calcWidth(16),
    marginTop: calcHeight(24),
    marginBottom: calcHeight(16),
  },
  equipmentSectionTitles: {
    paddingHorizontal: calcWidth(16),
    marginTop: calcHeight(24),
    marginBottom: calcHeight(16),
  },
  selectInputIconStyle: {
    height: calcHeight(16),
    width: calcWidth(16),
    fill: lightSteelBlue,
  },
  selectInputContainer: {
    paddingHorizontal: calcWidth(16),
  },
  musclesContainer: {
    marginBottom: calcHeight(30),
  },
});
export default styles;
