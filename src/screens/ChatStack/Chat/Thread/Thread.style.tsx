import {StyleSheet} from 'react-native';
import {
  primaryBlack,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  header: {
    paddingVertical: calcWidth(10),
    paddingHorizontal: calcHeight(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'headline',
      weight: 'semibold',
    }),
  },
});
export default styles;
