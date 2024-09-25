import React from 'react';
import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../assets/dimensions';
import { primaryBlack, primaryWhite } from '../../assets/styles/colors.styles';
import { EnCodeSans } from '../../assets/styles/fonts.styles';
import { borderStyle } from '../../assets/styles/global.styles';

const styles = StyleSheet.create({
    itemContainer: {
        ...borderStyle({ size: 55, type: 'default' }),
        backgroundColor: primaryWhite,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: calcWidth(21),
        marginRight: calcWidth(11),
        height: calcHeight(35),
    },
    text: {
        ...EnCodeSans({ size: 'subtitle', weight: 'medium' }),
        color: primaryBlack,
    },
    iconContainer:{
        marginRight:12
    },
    scroll:{padding:10 }
});
export default styles;