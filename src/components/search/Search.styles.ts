import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth, } from '../../assets/dimensions';
import {
  primaryBlack,
  shadowPrimaryBlue,
} from '../../assets/styles/colors.styles';
import { EnCodeSans } from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    color: primaryBlack,
    ...EnCodeSans({ size: 'body', weight: 'semibold' }),
  },
  inputContainer: {
    flex: 1,
    paddingLeft: calcWidth(10)
  },
});
export default styles;
