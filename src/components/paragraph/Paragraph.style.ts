import {StyleSheet} from 'react-native';
import {calcHeight} from '../../assets/dimensions';
import {formFieldGrey, primaryBlack} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  title: {
    ...EnCodeSans({size: 'form-field', weight: 'medium'}),
    color: formFieldGrey,
    marginBottom: calcHeight(5),
  },
  text: {
    ...EnCodeSans({size: 'form-field', weight: 'regular'}),
    color: primaryBlack,
  },
});
export default styles;
