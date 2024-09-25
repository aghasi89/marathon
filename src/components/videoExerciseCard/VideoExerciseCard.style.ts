import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../assets/dimensions';
import { formFieldGrey, primaryBlack, primaryBlue, primaryGrey, primaryWhite } from '../../assets/styles/colors.styles';
import { EnCodeSans } from '../../assets/styles/fonts.styles';
import { borderStyle } from '../../assets/styles/global.styles';

const styles = StyleSheet.create({
    container: {
        ...borderStyle({
            size: 25,
            type: "default"
        }),
        backgroundColor: primaryWhite,
        // flexDirection: "row",
        width: "100%",
        // justifyContent: "space-between",
    },
    rowContainer: {
        flexDirection: "row",
        paddingTop: calcHeight(10)
    },
    row: {
        flexDirection: "row",
        alignItems:"center"

    },

    topRowContainer: {
        flexDirection: "row",
        paddingLeft: calcWidth(23),
        paddingRight: calcWidth(13),
        paddingVertical: calcHeight(13),
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 0.8,
        borderBottomColor: 'rgba( 0 , 0 , 0 , 0.05 )',
    },

    image: {
        height: "100%",
        width: calcWidth(85),
        borderBottomLeftRadius: calcHeight(25),
    },
    textContainer: {
        paddingVertical: calcHeight(21),
        paddingLeft: calcWidth(21),
        width: "70%"
    },
    textTitle: {
        ...EnCodeSans({
            size: 'form-field',
            weight: 'medium'
        }),
        color: primaryBlack
    },
    textTime: {
        ...EnCodeSans({
            size: 'legal',
            weight: 'medium'
        }),
        color: formFieldGrey
    },

    close: {
        paddingLeft: calcWidth(27)
    },
    timeContainer: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: "space-between"
    }
});
export default styles;
