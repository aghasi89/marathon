import { StyleSheet } from "react-native";
import { calcHeight, calcWidth } from "../../../../assets/dimensions";

const styles = StyleSheet.create({
    container: {
        width: "50%",
        paddingHorizontal: calcWidth(30),
        marginVertical: calcHeight(20),
    },
    iconContainer: {
        flex: 1,
        alignItems: "center"
    },
    infoContainer: {
        alignItems: "center"
    },
    title: {
        textAlign: "center"
    }
});

export default styles;