import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../assets/dimensions';
import {  primaryBlack, primaryWhite } from '../../assets/styles/colors.styles';
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
        paddingHorizontal:calcWidth(24),
        justifyContent:"space-between",
        paddingVertical:calcHeight(22)
    },
    rowContainer: {
        flexDirection: "row",
        alignItems:'center'
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
            size: 'body',
            weight: 'medium'
        }),
        color: primaryBlack
    },
    textCount: {
        ...EnCodeSans({
            size: 'headline',
            weight: 'medium'
        }),
        color: primaryBlack
    },
    icon: {
       paddingLeft:calcWidth(36)
    }
});
export default styles;
