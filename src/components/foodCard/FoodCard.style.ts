import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../assets/dimensions';
import { formFieldGrey, green, primaryBlack, primaryWhite } from '../../assets/styles/colors.styles';
import { EnCodeSans } from '../../assets/styles/fonts.styles';
import { borderStyle } from '../../assets/styles/global.styles';

const styles = StyleSheet.create({
    container: {
        ...borderStyle({
            size: 25,
            type: "default"
        }),
        backgroundColor: primaryWhite,
        flexDirection: "row",
        width: "100%",
        paddingLeft: calcWidth(28),
        justifyContent: "space-between",
        paddingTop: calcHeight(19),
        paddingBottom: calcHeight(11),
        paddingRight: calcWidth(14),
        marginBottom: calcHeight(11)
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: 'center',
        marginTop: calcHeight(20)
    },
    image: {
        height: calcHeight(80),
        width: calcWidth(80),
        alignItems: 'flex-end'
    },
    textTitle: {
        ...EnCodeSans({
            size: 'body',
            weight: 'medium'
        }),
        color: primaryBlack
    },
    textWeight: {
        ...EnCodeSans({
            size: 'body',
            weight: 'medium'
        }),
        color: formFieldGrey
    },
    textKCal: {
        ...EnCodeSans({
            size: 'body',
            weight: 'medium'
        }),
        color: green,
        paddingLeft: calcWidth(31)
    },
    check:{
        position:"absolute",
        right:0
    }
});
export default styles;
