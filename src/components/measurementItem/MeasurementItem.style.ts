import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  borderGrey,
  primaryBlack,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite,
    minWidth: calcWidth(95),
    minHeight: calcHeight(78),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: calcWidth(7),
    borderRadius: calcWidth(29),
    borderWidth: calcWidth(1),
    borderColor: borderGrey,
  },
  titleText: {
    ...EnCodeSans({size: 'body', weight: 'semibold'}),
    color: primaryBlack,
  },
  titleTextWhite: {
    ...EnCodeSans({size: 'body', weight: 'semibold'}),
    color: primaryWhite,
  },
  titleContainer: {
    alignItems: 'center',
  },
  iconContainer: {
    height: calcHeight(40),
    width: calcHeight(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
