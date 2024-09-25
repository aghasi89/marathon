import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../assets/dimensions';
import {
  formFieldGrey,
  primaryBlue,
  primaryWhite,
} from '../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    height: calcHeight(60),
    width: '100%',
    flexDirection: 'row',
  },
  touch: {
    height: calcHeight(60),
    backgroundColor: primaryWhite,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: calcWidth(23),
  },
  labelStyle: {
    ...EnCodeSans({size: 'form-field', weight: 'semibold'}),
    color: formFieldGrey,
    paddingVertical: 15,
  },
  activeLabelStyle: {
    ...EnCodeSans({size: 'form-field', weight: 'semibold'}),
    borderBottomWidth: calcWidth(3),
    borderBottomColor: primaryBlue,
    color: primaryBlue,
    paddingVertical: calcHeight(15),
  },
});
export default styles;
