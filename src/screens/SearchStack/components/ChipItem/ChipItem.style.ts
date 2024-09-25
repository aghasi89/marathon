import { StyleSheet } from "react-native";
import { lightPeriwinkles, primaryBlack, primaryBlue, primaryWhite } from "../../../../assets/styles/colors.styles";
import { EnCodeSans } from '../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from "../../../../assets/dimensions";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: calcHeight(5)
    },
    chipContainer: {
        backgroundColor:primaryWhite,
        flexDirection: 'row',
        borderWidth: calcHeight(1),
        borderRadius: calcHeight(50),
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: calcWidth(16),
        borderColor: lightPeriwinkles,
        shadowColor: primaryBlack,
        shadowOffset: {
            width: calcHeight(0),
            height: calcWidth(2),
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 5,
    },
    text: {
        ...EnCodeSans({
            size: 'body',
            weight: 'regular',
        }),
        color: primaryBlue
    },
    iconTouchContainer: {
        paddingHorizontal: calcWidth(16),
        justifyContent: 'center',
        paddingVertical: calcHeight(12),
    },
    icon: {
        height: calcHeight(11),
        width: calcWidth(11),
        fill: lightPeriwinkles
    }

})
export default styles