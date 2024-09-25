import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
const styles = StyleSheet.create({
  container: {
    height: calcHeight(60),
    width: '100%',
    flexDirection: 'row',
    marginTop: calcHeight(26),
  },
  text: {
    marginLeft: calcWidth(24),
    ...EnCodeSans({
      weight: 'medium',
      size: 'body',
    }),
  },
});
export default styles;
