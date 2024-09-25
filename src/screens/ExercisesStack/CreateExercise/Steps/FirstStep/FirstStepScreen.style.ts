import { StyleSheet } from 'react-native';
import { transparentBlack } from '../../../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: calcWidth(16)
  },
  activityIndicatorContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:transparentBlack
  },
  coverContainer: {
    marginTop: calcHeight(23),
  },
  progressBarContainer:{
    marginTop:calcHeight(16)
  },
  sectionTitles: {
    marginVertical: calcHeight(24),
  },
  contextCardContainer: {
    marginTop: calcHeight(24),
    marginBottom: calcHeight(80)
  }
});
export default styles;
