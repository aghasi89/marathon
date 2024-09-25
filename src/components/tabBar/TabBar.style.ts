import {StyleSheet} from 'react-native';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    height: calcHeight(60),
    width: '100%',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:calcWidth(24)
  },
  itemTouchConteiner:{
    height:calcHeight(60),
    alignItems:'center',
    justifyContent:'center'
  },
  text: {
    ...EnCodeSans({
      weight: 'medium',
      size: 'body',
    }),
  },
});
export default styles;
