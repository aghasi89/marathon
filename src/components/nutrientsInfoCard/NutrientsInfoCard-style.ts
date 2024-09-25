import {StyleSheet} from 'react-native';
import {formFieldGrey, primaryBlack} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    height: calcHeight(100),
    width: calcWidth(400),
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    width: calcWidth(362),
    justifyContent: 'space-between',
    height: calcHeight(60),
    alignItems: 'center',
  },
  text: {
    ...EnCodeSans({
      weight: 'semibold',
      size: 'form-field',
    }),
    color: primaryBlack,
  },
  body: {
    width: calcWidth(362),
    height: calcHeight(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelAndTextContainer: {
    width: calcWidth(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: calcHeight(13),
  },
  lable: {
    ...EnCodeSans({
      weight: 'semibold',
      size: 'little',
    }),
    color: formFieldGrey,
  },
});

export default styles;
