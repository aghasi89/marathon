import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../../../assets/dimensions';
import {borderGrey, primaryWhite } from '../../../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:primaryWhite
  },
  headerContainer:{
    flexDirection:'row',
    backgroundColor:primaryWhite,
    alignItems:'center',
    borderBottomWidth:calcHeight(1),
    borderBottomColor:borderGrey
  },
  arrowButton:{
  width: calcWidth(50),
  height: calcWidth(50),
  justifyContent: 'center',
  alignItems: 'center',
},
contentContainer:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
    marginTop:calcHeight(11)
},
});

export default styles;
