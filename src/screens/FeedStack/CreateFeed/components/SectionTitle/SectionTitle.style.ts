import {StyleSheet} from 'react-native';
import {
  columbiaBlue,
  primaryBlue,
} from '../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    justifyContent:'center',
    paddingHorizontal:calcWidth(8)
  },
  line: {
    borderBottomWidth: calcHeight(1),
    height: calcHeight(0),
    borderBottomColor:columbiaBlue,
    flexGrow: 1,
  },
  text: {
    ...EnCodeSans({
      size:'legal',
      weight:'regular'
    }),
    color: primaryBlue,
    marginHorizontal: calcWidth(24),
  },
});

export default styles;
