import {StyleSheet} from 'react-native';
import {EnCodeSans} from '../../../../../assets/styles/fonts.styles';
import {lightPeriwinkles} from '../../../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitles: {
    marginVertical: calcHeight(24),
  },
  itemContainer: {
    marginBottom:calcHeight(16),
    paddingLeft:calcWidth(24)
  },
  text: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    color: lightPeriwinkles,
  },
});
export default styles;
