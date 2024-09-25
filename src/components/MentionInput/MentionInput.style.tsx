import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
import {
  primaryBlack,
  primaryGrey,
  primaryWhite,
} from '../../assets/styles/colors.styles';

const style = StyleSheet.create({
  title: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    color: primaryBlack,
    marginLeft: calcWidth(8),
  },
  container: {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    borderColor: primaryGrey,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    minHeight: calcHeight(40),
    maxHeight: calcHeight(120),
  },
  mentioned: {
    width: calcWidth(100),
    height: calcHeight(30),
    position: 'absolute',
    left: calcHeight(20),
    bottom: calcHeight(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default style;
