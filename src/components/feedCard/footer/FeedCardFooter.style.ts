import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../assets/dimensions';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: calcWidth(16),
    alignItems:'center',
  },
  leftIconsGroupContainer:{
    flex:1,
    flexDirection:'row',
    marginTop:calcHeight(10),
    marginBottom:calcHeight(15),
  },
  iconAndCountTouchContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginRight:calcWidth(20),
  },
  icons:{
    height:calcHeight(24),
    width:calcWidth(24),
  },
  countText:{
    ...EnCodeSans({
      size:'body',
      weight:'medium'
  }),
  color:'#45535C',
  marginLeft:calcWidth(8)
  },
});

export default styles;
