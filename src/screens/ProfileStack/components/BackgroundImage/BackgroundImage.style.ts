import { StyleSheet } from 'react-native';
import { backgroundGrey, lightPeriwinkles } from '../../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../../assets/dimensions';

const styles = StyleSheet.create({
  backgroundImage: {
    height: '100%',
  },
  altImageContainer:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:backgroundGrey
  },
  altImage:{
    height:calcHeight(70),
    width:calcWidth(70),
    fill:lightPeriwinkles,
  }
});
export default styles;
