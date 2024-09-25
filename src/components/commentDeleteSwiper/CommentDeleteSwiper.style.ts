import { Platform, StyleSheet } from "react-native";
import { calcHeight } from "../../assets/dimensions";
import { red } from "../../assets/styles/colors.styles";

const styles = StyleSheet.create({
  backRightBtn: {
    bottom: 0,
    position: 'absolute',
    top: 0,
    paddingTop: calcHeight(20),
  },
  backRightBtnRight: {
    right: 0,
    backgroundColor: red,
    alignItems: 'center',
    minHeight: Platform.OS == 'ios' ? calcHeight(60) : calcHeight(70),
  },
});
export default styles; 