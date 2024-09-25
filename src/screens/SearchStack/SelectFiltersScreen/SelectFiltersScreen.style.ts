import { StyleSheet } from "react-native";
import { EnCodeSans } from '../../../assets/styles/fonts.styles';
import { primaryWhite } from "../../../assets/styles/colors.styles";
import { calcHeight, calcWidth } from "../../../assets/dimensions";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primaryWhite
    },
    listContainer: {
        paddingVertical: calcHeight(24),
        paddingHorizontal:calcWidth(16)
    },
    itemContainer: {
        marginBottom: calcHeight(16),
    },
    text: {
        ...EnCodeSans({
            size: 'body',
            weight: 'semibold',
        }),
    }
})
export default styles