import { StyleSheet } from 'react-native';
import { disable, primaryBlack } from '../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';
import { borderStyle } from '../../../assets/styles/global.styles';
import { calcHeight, calcWidth } from '../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    ...borderStyle({ size: 25, type: 'outline' }),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: calcHeight(5),
    flexDirection: 'row',
    backgroundColor: disable
  },
  text: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'medium'
    }),
    letterSpacing: 0.27,
    color: primaryBlack,
  },
  rightIcon: {
    marginLeft: calcWidth(8)
  }
});
export default styles;