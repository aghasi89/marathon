import { StyleSheet } from 'react-native'
import { lightPeriwinkles} from '../../assets/styles/colors.styles'
import { EnCodeSans } from '../../assets/styles/fonts.styles'
import { calcHeight, calcWidth } from '../../assets/dimensions'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: calcHeight(61),
  },
  scrollContainer: {
    marginHorizontal: calcWidth(10),
  },
  button: {
    marginHorizontal: calcWidth(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: lightPeriwinkles,
    borderRadius: calcWidth(20),
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: calcWidth(9),
  },
  buttonText: {
    ...EnCodeSans({
      weight: 'semibold',
      size: 'body',
    }),
      marginVertical: calcHeight(8)
  },
  buttonTextColor: {
    color: lightPeriwinkles,
  },
})

export default styles