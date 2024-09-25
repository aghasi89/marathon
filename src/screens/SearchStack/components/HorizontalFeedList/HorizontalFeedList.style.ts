import { StyleSheet } from 'react-native';
import { EnCodeSans } from '../../../../assets/styles/fonts.styles';
import { primaryBlack } from '../../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../../assets/dimensions';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    marginHorizontal: calcWidth(16),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'regular',
    }),
    color: primaryBlack
  },
  listContainer: {
    paddingRight: calcWidth(16)
  },
  cardItemContainer: {
    marginLeft: calcWidth(16),
    marginVertical: calcHeight(16)
  }
});
export default styles;
