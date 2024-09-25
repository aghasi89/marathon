import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../assets/dimensions';
import {
  formFieldGrey,
  primaryBlack,
  primaryWhite,
} from '../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: calcWidth(25),
    paddingVertical: calcHeight(16),
    elevation: 5,
    borderTopRightRadius: calcWidth(40),
    borderTopLeftRadius: calcWidth(40),
    backgroundColor: primaryWhite,
  },
  countText: {
    ...EnCodeSans({size: 'form-field', weight: 'regular'}),
    color: primaryBlack,
  },
  circles: {
    height: calcHeight(50),
    width: calcHeight(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: formFieldGrey,
    ...EnCodeSans({
      size: 'headline',
      weight: 'bold',
    }),
  },
});
export default styles;
