import { StyleSheet } from 'react-native'
import { iconBackgroudLightBlue, primaryBlack } from '../../assets/styles/colors.styles'
import { EnCodeSans } from '../../assets/styles/fonts.styles'
import { calcHeight, calcWidth } from '../../assets/dimensions'

const styles=StyleSheet.create({
    container: {
        height: calcHeight(70),
        width: calcWidth(400),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: calcWidth(17),
      },
      nameAndIconContainer: {
        width: calcWidth(150),
        flexDirection: 'row',
        alignItems: 'center',
      },
      iconContainer: {
        height: calcHeight(40),
        width: calcWidth(40),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: iconBackgroudLightBlue,
        borderRadius: calcHeight(20),
        marginRight: calcWidth(15),
        marginLeft: calcWidth(7),
      },
      nameText: {
        ...EnCodeSans({
          size: 'form-field',
          weight: 'regular',
        }),
        color: primaryBlack,
      },
})
export default styles