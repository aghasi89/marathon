import {StyleSheet} from 'react-native';
import {primaryBlack} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
import {borderStyle} from '../../assets/styles/global.styles';

const styles = StyleSheet.create({
  container: {
    ...borderStyle({
      size: 25,
      type: 'outline',
    }),
    height: 'auto',
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 19,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    width: '86%',
    paddingVertical: 0,
    ...EnCodeSans({
      size: 'form-field',
      weight: 'regular',
    }),
    color: primaryBlack,
  },
});
export default styles;
