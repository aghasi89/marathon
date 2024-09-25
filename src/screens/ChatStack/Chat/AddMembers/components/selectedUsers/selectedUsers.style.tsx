import {StyleSheet} from 'react-native';
import { chatBarBack, primaryWhite } from '../../../../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    backgroundColor: primaryWhite,
    marginTop: calcHeight(6)
  },
  categories: {
    alignSelf: 'flex-start',
    marginHorizontal: calcWidth(17),
    padding: 2,
  },
});
export default styles;
