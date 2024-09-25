import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../assets/dimensions';
import { formFieldGrey, primaryBlack, primaryBlue, primaryWhite } from '../../assets/styles/colors.styles';
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
        justifyContent: "space-between",
    },
    rowContainer: {
        flexDirection: "row"
    },
    image: {
        height: "100%",
        width: calcWidth(85),
        borderTopLeftRadius: calcHeight(25),
        borderBottomLeftRadius: calcHeight(25)
    },
    textContainer: {
        paddingVertical: calcHeight(21),
        paddingLeft: calcWidth(21)
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
    icon: {
        paddingRight: calcWidth(15),
        paddingTop: calcHeight(12)
    }
});
export default styles;
