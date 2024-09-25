import { StyleSheet } from "react-native";
import { calcHeight, calcWidth } from "../../../../../../assets/dimensions";
import { primaryBlue, primaryGrey } from "../../../../../../assets/styles/colors.styles";

export const styles = StyleSheet.create({
    addContainer: {
        flex: 1,
        marginTop: calcHeight(31),
        alignItems: "center",
        paddingHorizontal: calcWidth(16)
      },
      creatorAddName: {
        fontSize: 12,
        fontWeight: '700',
        color: primaryBlue,
      },
      creatorAddText: {
        fontSize: 12,
        fontWeight: '700',
        color: primaryGrey,
        marginBottom: calcHeight(15),
        textAlign: "center"
      },
      addText: {
        fontSize: 12,
        fontWeight: '500',
        color: primaryGrey,
        fontStyle: 'italic',
        marginBottom: calcHeight(15),
        textAlign: "center"
      },
      imageContainer: {
        width: calcHeight(80),
        height: calcHeight(80),
        borderRadius: calcHeight(100),
      },
      userAvatar: {
        width: calcHeight(80),
        height: calcHeight(80),
        borderRadius: calcHeight(100),
        resizeMode: 'center',
      },
});
export default styles;