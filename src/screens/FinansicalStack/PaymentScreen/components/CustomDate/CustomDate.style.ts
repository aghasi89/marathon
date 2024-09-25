import { StyleSheet } from 'react-native';
import { primaryGrey, } from '../../../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';
import { EnCodeSans } from '../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  filterText: {
    color: primaryGrey,
    ...EnCodeSans({
      size: 'subText',
      weight: 'regular',
    }),
    marginRight: calcWidth(10),
    marginLeft: calcWidth(5)
  },
  buttonContainer: {
    flexDirection: "row",
    paddingVertical: calcHeight(10),
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: calcWidth(13),
    borderColor: primaryGrey,
    borderRadius: calcWidth(10),
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  }
});
export default styles;
