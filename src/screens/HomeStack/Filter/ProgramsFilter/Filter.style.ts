import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
import {
  formFieldGrey,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../assets/styles/fonts.styles';
const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite,
    flex: 1,
  },
  leftComponentStyle: {
    width: '30%',
    marginLeft: -calcWidth(75),
  },
  leftComponentText: {
    ...EnCodeSans({
      weight: 'medium',
      size: 'body',
    }),
    color: formFieldGrey,
  },
  multiSelectContainer: {
    marginTop: calcHeight(46),
  },
  buttonGroupContainer: {
    position: 'absolute',
    bottom: 0,
  },
});
export default styles;
