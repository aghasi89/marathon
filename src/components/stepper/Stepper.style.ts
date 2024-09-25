import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../assets/dimensions';
import { aliceBlue, formFieldGrey, primaryBlue, primaryWhite } from '../../assets/styles/colors.styles';
import { EnCodeSans } from '../../assets/styles/fonts.styles';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        marginTop:calcHeight(20),

    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
        marginHorizontal: calcWidth(45)
    },
    circle: {
        width: calcHeight(35),
        height: calcHeight(35),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 1,
    },
    stepText: {
        ...EnCodeSans({
            size: 'form-field',
            weight: 'medium'
        }),
    },
    bottomContainer: {
        flexDirection: 'row',
        borderBottomLeftRadius: calcHeight(0),
        borderBottomRightRadius: calcHeight(0),
        borderTopRightRadius: calcHeight(40),
        borderTopLeftRadius: calcHeight(40),
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 4,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 2,
        height: calcHeight(80),
        paddingTop: calcHeight(30),
        justifyContent: "space-around"
    },
    button: {
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: formFieldGrey,
        ...EnCodeSans({
            size: 'form-field',
            weight: 'semibold'
        })
    }
});
export default styles;
