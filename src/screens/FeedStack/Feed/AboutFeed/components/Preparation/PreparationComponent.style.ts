import {StyleSheet} from 'react-native';
import {EnCodeSans} from '../../../../../../assets/styles/fonts.styles';
import {
  primaryBlack,
  primaryBlue,
} from '../../../../../../assets/styles/colors.styles';
import {calcHeight} from '../../../../../../assets/dimensions';

const style = StyleSheet.create({
  title: {
    ...EnCodeSans({
      size: 'headline',
      weight: 'semibold',
    }),
    color: primaryBlue,
    marginBottom: calcHeight(8),
  },
  itemContainer: {
    marginVertical: calcHeight(8),
  },
  lastItemContainer: {
    marginTop: calcHeight(8),
  },
  itemTitle: {
    ...EnCodeSans({
      size: 'headline',
      weight: 'regular',
    }),
    color: primaryBlue,
    marginBottom: calcHeight(5),
  },
  itemDescription: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'regular',
    }),
    color: primaryBlack,
  },
});
export default style;
