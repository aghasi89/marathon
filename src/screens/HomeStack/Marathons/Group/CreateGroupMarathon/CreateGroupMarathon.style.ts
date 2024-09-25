import {StyleSheet} from 'react-native';
import {formFieldGrey,primaryWhite} from '../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../assets/styles/fonts.styles';
import {calcWidth} from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  save: {
    ...EnCodeSans({
      weight: 'semibold',
      size: 'form-field',
    }),
    color: formFieldGrey,
    marginRight: calcWidth(15),
  },
});
export default styles;