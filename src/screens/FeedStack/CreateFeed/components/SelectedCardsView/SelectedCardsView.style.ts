import {StyleSheet} from 'react-native';
import { aliceBlue } from '../../../../../assets/styles/colors.styles';
import {calcWidth} from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
  },
  searchInputContainer:{
    marginHorizontal:calcWidth(16),
    backgroundColor:aliceBlue,
    borderWidth:0
  },
  searchInput:{
    paddingLeft:calcWidth(10)
  },
  scrollContainer:{
    paddingHorizontal:calcWidth(8)  
  },
  listContainer: {
    flexDirection:'row',
    flexWrap:'wrap',
    backgroundColor:'green',
  },
  cardItemContainer:{
    marginHorizontal:calcWidth(8),
    marginVertical:calcWidth(16),
  }

});
export default styles;
