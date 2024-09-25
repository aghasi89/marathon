import { StyleSheet } from "react-native";
import { lightPeriwinkles, primaryBlue } from "../../assets/styles/colors.styles";
import { calcHeight, calcWidth } from "../../assets/dimensions";

const styles = StyleSheet.create({
    sectionTitles: {
        marginTop: calcHeight(24),
        marginBottom: calcHeight(13)
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: calcHeight(1),
        borderRadius: calcHeight(20),
        borderStyle: 'dashed',
        overflow: 'hidden',
        borderColor: lightPeriwinkles,
        width: "100%",
        marginVertical: calcHeight(24),
        height: calcHeight(200),
        position: "relative",
        zIndex: 0
    },
    removeButton: {
        position: "absolute",
        top: 10,
        right: 15,
        zIndex: 1,
    },
    button: {
        borderWidth: 1,
        borderColor: primaryBlue,
        borderRadius: calcHeight(12),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: calcWidth(34),
        marginVertical: calcHeight(12),
        justifyContent: 'center',
        maxWidth: '65%',
        // minWidth: '65%'
    },
    buttonIcon: {
        height: calcHeight(16),
        width: calcWidth(16),
        marginRight: calcWidth(7),
        fill: primaryBlue,
    },
    buttonText: {
        color: primaryBlue,
    },
    chooseText: {
        color: lightPeriwinkles,
        fontSize: 12,
        fontStyle: "normal",
        fontWeight: "400"
    },
    imageStyle: {
        height:  calcHeight(200),
        width: "100%",
        resizeMode: 'cover'
    },
    certificateInput: {
        borderRadius: calcHeight(15)
    }
});
export default styles;