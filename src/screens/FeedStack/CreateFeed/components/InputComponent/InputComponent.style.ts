import { StyleSheet } from 'react-native';
import {
  columbiaBlue,
  lightSteelBlue,
  primaryBlack,
  red,
} from '../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: calcHeight(1),
    borderRadius: calcHeight(16),
    paddingHorizontal: calcWidth(10),
    minHeight: calcHeight(40),
  },
  borderColor: {
    borderColor: columbiaBlue,
  },
  borderColorInvalid: {
    borderColor: red,
  },
  labelContainer: {
    alignItems: 'center',
  },
  label: {
    marginBottom: calcHeight(4),
    ...EnCodeSans({
      size: 'subText',
      weight: 'bold',
    }),
    color: primaryBlack,
  },
  input: {
    flexGrow:1,
    height:'100%',
  },
  closeIconContainer: {
    minHeight:calcHeight(40) ,
    width: calcWidth(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    height: calcHeight(12),
    width: calcWidth(12),
    fill: lightSteelBlue,
  },
});
export default styles;
