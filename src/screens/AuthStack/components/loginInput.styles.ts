import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../../assets/dimensions';
import { primaryBlack } from '../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';
import { borderStyle } from '../../../assets/styles/global.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: calcWidth(21),
    ...borderStyle({ size: 35, type: 'outline' }),
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInpuContainer: {
    flex: 1,
    ...EnCodeSans({
      size: 'body',
      weight: 'medium',
    }),
    color: primaryBlack
  },
  icons: {
    alignItems: 'center',
    height: calcHeight(55),
    justifyContent: 'center',
    marginRight: calcWidth(10),
  },
});
export default styles;
