import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../assets/dimensions';
import { primaryBlack } from '../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icons:{
    height:calcHeight(22),
    width:calcWidth(32),
    fill:primaryBlack
}

});
export default styles;
