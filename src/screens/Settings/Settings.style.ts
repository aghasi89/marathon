import {StyleSheet} from 'react-native';
import {
  primaryBlack,
  primaryGrey,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {EnCodeSans} from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  contentContainer: {
    paddingHorizontal: calcWidth(24),
    flex: 1,
    justifyContent: 'space-between',
  },
  lable: {
    marginLeft: calcWidth(5),
    color: primaryBlack,
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
  },
  value: {
    color: primaryGrey,
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
  },
  delContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: calcHeight(50)
  },
  deleteText: {
    fontWeight: '600',
    fontSize: 16,
    color: primaryBlack,
    marginLeft: 6
  },
});
export default styles;
