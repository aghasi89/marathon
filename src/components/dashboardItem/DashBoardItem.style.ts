import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  formFieldGrey,
  primaryBlack,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite,
    flexDirection: 'row',
    width: '100%',
    paddingLeft: calcWidth(20),
    paddingVertical: calcHeight(23),
    borderBottomWidth: 1,
    borderBottomColor: '#f3f7ff',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#f3f7ff',
    height: calcHeight(44),
    width: calcHeight(44),
    borderRadius: calcHeight(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: calcWidth(23),
  },
  title: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'semibold',
    }),
    color: primaryBlack,
  },
  description: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'regular',
    }),
    color: formFieldGrey,
  },
});
export default styles;
