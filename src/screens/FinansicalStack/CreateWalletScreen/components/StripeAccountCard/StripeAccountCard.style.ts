import { StyleSheet } from "react-native";
import { aliceBlueBackground, lightPeriwinkles } from "../../../../../assets/styles/colors.styles";
import { calcHeight, calcWidth } from "../../../../../assets/dimensions";

const styles = StyleSheet.create({
    container: {
        marginVertical: calcHeight(8),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      contentContainer: {
        height: '100%',
        borderWidth: calcWidth(1),
        borderColor: lightPeriwinkles,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: calcWidth(16),
        paddingVertical: calcWidth(14),
        borderRadius: calcHeight(10),
        backgroundColor: aliceBlueBackground,
      },
      bankInfoContainer: {
        flex: 1,
        paddingLeft: calcWidth(16),
      },
      bankInfoRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      deleteIconTouch: {
        flexDirection: 'row',
        paddingHorizontal: calcWidth(16),
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
})
export default styles