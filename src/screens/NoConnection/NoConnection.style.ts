import { StyleSheet } from 'react-native';
import { EnCodeSans } from '../../assets/styles/fonts.styles';
import { primaryBlue } from '../../assets/styles/colors.styles';
import { calcHeight } from '../../assets/dimensions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        ...EnCodeSans({ size: "headline1", weight: "bold" }),
        color: primaryBlue,
    },
    gifStyle:{
        height:calcHeight(200),
        width:calcHeight(200)
    }

});
export default styles;
