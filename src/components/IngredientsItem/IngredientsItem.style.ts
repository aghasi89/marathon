import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  borderGrey,
  formFieldGrey,
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
import {borderStyle} from '../../assets/styles/global.styles';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: calcHeight(8),
  },
  block: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'medium',
    }),
    color: primaryBlack,
    opacity: 1,
    marginLeft: calcWidth(21),
  },
});
export default styles;
