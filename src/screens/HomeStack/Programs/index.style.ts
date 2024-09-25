import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../assets/dimensions';
import {primaryWhite} from '../../../assets/styles/colors.styles';
const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite,
    flex: 1,
  },
  programsListConteiner: {
    backgroundColor: primaryWhite,
    flex: 1,
    paddingHorizontal: calcWidth(10),
  },
  plusButton: {
    position: 'absolute',
    right: calcWidth(17),
    bottom: calcHeight(26),
  },
  filterList: {
    marginVertical: calcHeight(15),
  },
});
export default styles;
