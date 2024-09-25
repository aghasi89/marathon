import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
import {primaryBlack, primaryWhite} from '../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../assets/styles/fonts.styles';
const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite,
    flex: 1,
    paddingHorizontal: calcWidth(10),
  },
  plusButton:{
    position: 'absolute',
    right: calcWidth(17),
    bottom: calcHeight(26),
  },
  noDataText:{
    ...EnCodeSans({
      weight: 'bold',
      size: 'headline',
    }),
    color: primaryBlack,
  }
});
export default styles;
