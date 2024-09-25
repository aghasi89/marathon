import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {primaryBlack, primaryWhite} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
import {borderStyle} from '../../assets/styles/global.styles';

const styles = StyleSheet.create({
  container: {
    ...borderStyle({
      size: 25,
      type: 'default',
    }),
    backgroundColor: primaryWhite,
    paddingVertical: calcHeight(8),
    paddingHorizontal: calcWidth(22),
  },
  image: {
    height: calcHeight(48),
    width: calcHeight(48),
    borderRadius: calcHeight(24),
  },
  text: {
    ...EnCodeSans({size: 'little', weight: 'medium'}),
    color: primaryBlack,
    marginTop: calcHeight(10),
    maxWidth: calcWidth(48),
    textAlign: 'center',
    opacity: 1,
  },
});
export default styles;
