import { StyleSheet } from "react-native";
import { calcHeight, calcWidth } from "../../../../assets/dimensions";
import { primaryBlack } from "../../../../assets/styles/colors.styles";

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: calcWidth(16),
      paddingTop: calcHeight(16),
      width: "100%"
    },
    titleContainer: {
        flex: 1,
        alignItems: "center"
    },
    title: {
        fontSize: 22,
        fontWeight: "600",
        color: primaryBlack
    },
  });
  export default styles;