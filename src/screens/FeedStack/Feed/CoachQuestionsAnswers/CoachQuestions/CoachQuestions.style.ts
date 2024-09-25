import {StyleSheet} from 'react-native';
import { primaryBlack } from '../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitles: {
    marginVertical: calcHeight(24),
  },
  itemContainer: {
    paddingHorizontal: calcWidth(16),
    marginBottom:calcHeight(24)
  },
  questionText: {
    ...EnCodeSans({
        size:'body',
        weight:'semibold'
    }),
    marginBottom:calcHeight(16),
    color:primaryBlack
  },
  inputContainer:{
    borderRadius:calcHeight(8),
    maxHeight:calcHeight(100)
  },
  listLastElement:{
    marginBottom:calcHeight(80)
  }
});
export default styles;
