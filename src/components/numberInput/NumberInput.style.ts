import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../assets/dimensions';
import { borderGrey, primaryGrey } from '../../assets/styles/colors.styles';
import { EnCodeSans } from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  textInpuContainer: {
    paddingVertical: calcHeight(8),
    borderRadius: calcHeight(25),
    borderColor: borderGrey,
    opacity: 1,
    borderWidth: 1,
    color: primaryGrey, ...EnCodeSans({
      size: 'form-field',
      weight: 'medium'
    }),
    paddingHorizontal: calcWidth(19),
    textAlign:"center"
  }
});
export default styles;
