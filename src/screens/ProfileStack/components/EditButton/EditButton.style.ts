import { StyleSheet } from "react-native";
import { red } from "../../../../assets/styles/colors.styles";
import { EnCodeSans } from "../../../../assets/styles/fonts.styles"
import { calcHeight, calcWidth } from "../../../../assets/dimensions";

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row'
  },
  icon: {
    height: calcHeight(18),
    width: calcWidth(18),
    marginRight: calcWidth(8),
    marginTop: calcHeight(4)
  },
});
export default styles;