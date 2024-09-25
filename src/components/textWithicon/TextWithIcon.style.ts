import { StyleSheet } from 'react-native';
import { calcWidth } from '../../assets/dimensions';
import { formFieldGrey, } from '../../assets/styles/colors.styles';
import { EnCodeSans } from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  text: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold'
    }),
    color: formFieldGrey,
    marginLeft: calcWidth(21)
  }
});
export default styles;
